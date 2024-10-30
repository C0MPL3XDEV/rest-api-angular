import { HttpInterceptorFn } from '@angular/common/http';

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
  return next(req);
};
