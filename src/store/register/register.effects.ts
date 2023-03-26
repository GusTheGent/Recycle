import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserRegister } from 'src/app/models/UserRegister';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as RegisterActions from './register.actions';

@Injectable()
export class RegisterEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterActions.register),
      switchMap((payload: { userRegister: UserRegister }) =>
        this.authService.register(payload.userRegister).pipe(
          map(() => RegisterActions.registerSuccess()),
          catchError((error) => of(RegisterActions.registerFailure({ error })))
        )
      )
    )
  );
}
