import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { userDetails } from '../../models/userDetails';
import { user } from '../../models/user';
import { BehaviorSubject, catchError, throwError,of } from 'rxjs';
import { UserRole } from '../../enums/user-role.enum';
import { UserResponse } from '../../models/UserResponse';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private me$=new BehaviorSubject<UserResponse | null>(null);
    private errorSubject = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubject.asObservable();

  constructor(private readonly http:HttpClient){
    this.loadMe();
  }

  
  private loadMe(){
    this.http.get<UserResponse>('http://localhost:8765/auth-service/api/auth/me'
      ,{withCredentials:true}
    ).pipe(catchError(_ => of(null)))
    .subscribe(user=>this.me$.next(user));
  }
  get currentUser() { return this.me$.asObservable(); }

  
  
  signup(user: userDetails) {

  const payload = {
    ...user,
    roles: user.roles.map(role =>
      UserRole[role].replace('ROLE_', '').toLowerCase()
    )
  };

  return this.http.post(
    'http://localhost:8765/auth-service/api/auth/signup',
    payload ,{withCredentials:true}
  ).pipe(
    catchError((error) => this.handleError(error))
  );
}


  signin(user: user) {
  return this.http.post<UserResponse>(
    'http://localhost:8765/auth-service/api/auth/signin',
    user,
    { withCredentials: true }
  ).pipe(
    tap((res: UserResponse) => {
      this.me$.next(res);  
    }),
    catchError((error) => this.handleError(error))

  );
}
  signout() {
  return this.http.post(
    'http://localhost:8765/auth-service/api/auth/signout',
    {},
    { withCredentials: true }
  ).pipe(
    tap(() => {
      this.me$.next(null);
    }),
   catchError((error) => this.handleError(error))

  );
}
  
  private handleError(error:HttpErrorResponse){
    let message='Something went wrong';
    if(error.error instanceof ErrorEvent){
      //cient side error
      message=error.error.message;
    }else{
      //backend error
      message=error.error?.message || 'Error ${error.status}';
    }
    this.errorSubject.next(message.trim());
    console.error('Auth error:',message);
    return throwError(() => message);
  }
}
