// resolver-catcher.guard.ts
import { inject } from '@angular/core';
import { CanActivateChildFn, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EMPTY, from, isObservable } from 'rxjs';
import {Helper} from "./helper";
import {UntypedFormGroup} from "@angular/forms";
import {FuseConfirmationService} from "../../../../@fuse/services/confirmation";

export const resolverCatcher: CanActivateChildFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const snackBar = inject(MatSnackBar);
    const helper = inject(Helper);
    const _fuseServiceConfirmation = inject(FuseConfirmationService);
    let infoForm: UntypedFormGroup;

    // On récupère tous les resolvers de la route
    const resolvers = route.routeConfig?.resolve || {};

    // On wrap chaque resolver avec notre gestion d'erreur
    Object.entries(resolvers).forEach(([key, resolver]) => {
        const originalResolver = resolver;
        resolvers[key] = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
            const result = originalResolver(route, state);
            const observable = isObservable(result) ? result : from(Promise.resolve(result));

            return observable.pipe(
                catchError(error => {
                    let errorMessage: string;

                    if (error.error instanceof ProgressEvent) {
                        errorMessage = 'Problème de connexion au serveur. Veuillez vous reconnecter.';
                        infoForm = helper.infoDialog(errorMessage)
                        _fuseServiceConfirmation.open(infoForm.value);
                    } else if (error.status != 401) {
                        errorMessage = error?.error || 'Erreur lors du chargement des données';
                        infoForm = helper.infoDialog(errorMessage)
                        _fuseServiceConfirmation.open(infoForm.value);
                    }

                    return EMPTY;
                })
            );
        };
    });

    return true;
};
