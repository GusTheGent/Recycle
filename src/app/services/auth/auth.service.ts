import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  recoverEmailPassword(email: string): Observable<void> {
    return new Observable<void>((observer) => {
      setTimeout(() => {
        if (email == 'error@email.com') {
          observer.error({
            message: 'Email not found, make sure you are registered',
          });
        }
        observer.next();
        observer.complete();
      }, 3000);
    });
  }

  login(email: string, password: string): Observable<User> {
    return new Observable<User>((observer) => {
      setTimeout(() => {
        if (email == 'error@email.com') {
          observer.error({
            message: 'Email Not Found, please try again later',
          });
        } else {
          const user = new User();
          user.email = email;
          user.id = 'userId';
          observer.next(user);
        }
        observer.complete();
      }, 3000);
    });
  }
}
