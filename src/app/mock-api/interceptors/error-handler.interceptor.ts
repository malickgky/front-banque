// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from "@angular/core";
// import { SnackbarService } from 'app/modules/admin/shared/snackbar/snackbar.service';

// export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
//   const snackbarService = inject(SnackbarService);

//   next(req).subscribe({
//     error: err => {
//       if (err.status == 0) {
//         snackbarService.openSnackBar("Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.", "Fermer", 5000);
//       }
//       if (err.status == 403) {
//         snackbarService.openSnackBar("Accès refusé. Vous n'avez pas les autorisations nécessaires pour accéder à cette ressource..", "Fermer", 5000);
//       }
//     }
//   });
//   return next(req);
// };
