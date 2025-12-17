import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  console.log(' Interceptor hit:', req.url);

  return next(req).pipe(
    catchError(err => {
       console.log('Interceptor error:', err.status);
      if (err.status === 401 && router.url !== '/signin') {
        console.log('Redirecting to signin');
        router.navigate(['/signin']);
      }
      return throwError(() => err);
    })
  );
};
