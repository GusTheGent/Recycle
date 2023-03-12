import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as LoginActions from './login.actions';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  recoverPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.recoverPassword),
      switchMap((payload: { email: string }) =>
        this.authService.recoverEmailPassword(payload.email).pipe(
          map(() => LoginActions.recoverPasswordSuccess()),
          catchError((error) =>
            of(LoginActions.recoverPasswordFailure({ error }))
          )
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      switchMap((payload: { email: string; password: string }) =>
        this.authService.login(payload.email, payload.password).pipe(
          map((user) => LoginActions.loginSuccess({ user })),
          catchError((error) => of(LoginActions.loginFailure({ error })))
        )
      )
    )
  );
}
