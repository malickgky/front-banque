import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { catchError, throwError } from 'rxjs';

export const userInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('accessToken');

  let newReq = req.clone();


  if (accessToken && !AuthUtils.isTokenExpired(accessToken)) {
    newReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
    });

  }
  return next(newReq).pipe(
    catchError((error) => {
      // Catch "401 Unauthorized" responses
      if (error instanceof HttpErrorResponse && error.status === 401) {

        // Reload the app
        location.reload();
      }

      return throwError(error);
    }),
  );
};
