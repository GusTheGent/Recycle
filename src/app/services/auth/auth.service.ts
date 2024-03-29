import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';
import { UserRegister } from 'src/app/models/UserRegister';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  //Fake register
  register(userRegister: UserRegister): Observable<void> {
    return new Observable<void>((observer) => {
      if (userRegister.email == 'error@email.com') {
        observer.error({ message: 'Already Registered' });
      } else {
        observer.next();
      }
      observer.complete();
    });
  }

  recoverEmailPassword(email: string): Observable<void> {
    return new Observable<void>((observer) => {
      this.auth
        .sendPasswordResetEmail(email)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  login(email: string, password: string): Observable<User> {
    return new Observable<User>((observer) => {
      this.auth
        .setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
        .then(() => {
          this.auth
            .signInWithEmailAndPassword(email, password)
            .then((fireUser: firebase.default.auth.UserCredential) => {
              observer.next({
                id: fireUser.user?.uid as string,
                email: fireUser.user?.email as string,
              });
              observer.complete();
            })
            .catch((error) => {
              observer.error(error);
              observer.complete();
            });
        });
    });
  }
}
