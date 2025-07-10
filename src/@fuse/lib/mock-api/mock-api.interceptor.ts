import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { FUSE_MOCK_API_DEFAULT_DELAY } from '@fuse/lib/mock-api/mock-api.constants';
import { FuseMockApiService } from '@fuse/lib/mock-api/mock-api.service';
import { catchError, delay, EMPTY, Observable, of, switchMap, throwError } from 'rxjs';
import {FuseConfirmationService} from "../../services/confirmation";
import {UntypedFormGroup} from "@angular/forms";
import { AuthService } from '../../../app/core/auth/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

export const mockApiInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const defaultDelay = inject(FUSE_MOCK_API_DEFAULT_DELAY);
    const fuseMockApiService = inject(FuseMockApiService);
    const _fuseServiceConfirmation = inject(FuseConfirmationService);
    const authService = inject(AuthService);
    const messageService = inject(MessageService);
    const _router = inject(Router);
    let infoForm: UntypedFormGroup;

    // Try to get the request handler
    const { handler, urlParams } = fuseMockApiService.findHandler(request.method.toUpperCase(), request.url);

    // Pass through if the request handler does not exist
    if (!handler) {
        return next(request).pipe(
            catchError((error: HttpErrorResponse) => {

                if (error.status === 0) {
                    messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Une erreur est survenue. Veuillez vérifier votre connexion internet.',
                        life: 5000
                    });

                    return EMPTY;
                }

                if (error.status == 403 || error.status == 100) {
                    messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: "Erreur d'accès. Veuillez vous reconnecter."
                    });


                    setTimeout(() => {
                        _router.navigate(['/sign-out']);
                    }, 2_500);

                    return EMPTY;
                }


                return throwError(error);
            })
        );
    }

    // Set the intercepted request on the handler
    handler.request = request;

    // Set the url params on the handler
    handler.urlParams = urlParams;

    // Subscribe to the response function observable
    return handler.response.pipe(
        delay(handler.delay ?? defaultDelay ?? 0),
        switchMap((response) => {
            // If there is no response data, throw an error response
            if (!response) {
                response = new HttpErrorResponse({
                    error: 'NOT FOUND',
                    status: 404,
                    statusText: 'NOT FOUND',
                });

                return throwError(response);
            }

            // Parse the response data
            let data = {
                status: response[0],
                data: response[1],
                message: response[1].message
            };

            // Handle success response (status 200-299)
            if (data.status >= 200 && data.status < 300) {
                response = new HttpResponse({
                    body: data.data,
                    status: data.status,
                    statusText: 'OK',
                });

                return of(response);
            }

            if (data.status == 100) {
                messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Session expirée. Veuillez vous reconnecter.',
                    life: 2_500
                });


                setTimeout(() => {
                    _router.navigate(['/sign-out']);
                }, 2_500);

                return EMPTY;
            }


            // Handle other errors (e.g., 400 Bad Request)
            if (data.status === 400 || data.status == 100) {
                response = new HttpErrorResponse({
                    status: data.status,
                    error: data.message,
                    statusText: 'ERROR',
                });
            }

            return throwError(response);
        }),
        catchError((error: HttpErrorResponse) => {

            if  (error.status == 100) {
                authService.signOut();

            }
            // Handle no connection (status 0)
            // console.log(error)
            // const helper = inject(Helper);
            // const _fuseServiceConfirmation = inject(FuseConfirmationService);
            // let infoForm: UntypedFormGroup;
            //
            //
            // if (error[0] == 401) {
            //     infoForm = helper.infoDialog(error[1].error)
            //     _fuseServiceConfirmation.open(infoForm.value);
            // }
            //
            //
            // if (error?.status === 0) {
            //     infoForm = helper.infoDialog("Erreur réseau. Veuillez vérifier votre connexion internet.")
            //     _fuseServiceConfirmation.open(infoForm.value);
            // }
            // Handle 403 Forbidden
            //  if (error.status === 403) {
            //     snackbarService.openSnackBar('Accès refusé. Vous n\'avez pas les autorisations nécessaires.', 'Fermer', 5000);
            // }
            // Pass other errors
            return throwError(error);
        })
    );
};
