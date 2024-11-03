import { HttpInterceptorFn } from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req);
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: {
         Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
  }
  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        console.error("Unauthorized! Token might be invalid or expired.");
      } else if (error.status === 404) {
        console.error("Resource not found!");
      } else if (error.status === 422) {
        console.error("Validation error occurred.");
      } else if (error.status === 500) {
        console.error("Internal server error occurred.");
      } else {
        console.error("An unexpected error occurred:", error);
      }
      return throwError(() => error);
    })
  );
};
