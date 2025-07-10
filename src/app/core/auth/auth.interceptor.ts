    import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { SnackbarService } from 'app/modules/admin/shared/snackbar/snackbar.service';
import { jwtDecode } from 'jwt-decode';
import { catchError, finalize, Observable, takeUntil, throwError, timer } from 'rxjs';
    import {FuseConfirmationService} from "../../../@fuse/services/confirmation";
    import {Helper} from "../../mock-api/banque/helpers/helper";
    import {UntypedFormGroup} from "@angular/forms";
// import jwt_decode from 'jwt-decode';


/**
 * Intercept
 *
 * @param req
 * @param next
 */
export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> =>
{
    const authService = inject(AuthService);
    const helper = inject(Helper);
    const _fuseServiceConfirmation = inject(FuseConfirmationService);
    let inforForm: UntypedFormGroup;

    // Clone the request object
    let newReq = req.clone();

    // Request
    //
    // If the access token didn't expire, add the Authorization header.
    // We won't add the Authorization header if the access token expired.
    // This will force the server to return a "401 Unauthorized" response
    // for the protected API routes which our response interceptor will
    // catch and delete the access token from the local storage while logging
    // the user out from the app.
    if ( authService.accessToken && !AuthUtils.isTokenExpired(authService.accessToken) )
    {
        newReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authService.accessToken),
            //headers: req.headers.set('Authorization', 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiI2MjYwMjQ1MDYiLCJpYXQiOjE3MTU2MDIyOTIsImV4cCI6MTcxNTYzODI5Mn0.JyRX7IABwbYmmNuBn7Fa-w9RYgEbYCbhpzsSLgb8cOqoA3WbFBAlsTum6FTZSCOcuser'),
        });
    }

    // Response
    return next(newReq).pipe(
        catchError((error) =>
        {
            // Catch "401 Unauthorized" responses
            if ( error instanceof HttpErrorResponse && error.status === 401 )
            {
                inforForm = helper.infoDialog(error.error.message);
                _fuseServiceConfirmation.open(inforForm.value).afterClosed().subscribe({
                    next: result => {
                        // Sign out
                        authService.signOut();

                        // Reload the app
                        location.reload();
                    }
                })

            }

            return throwError(error);
        }),
    );
};
