import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/User';

//Recover creds actions
export const recoverPassword = createAction(
  '[Recover Password]',
  props<{ email: string }>()
);
export const recoverPasswordSuccess = createAction(
  '[Recover Password] success'
);
export const recoverPasswordFailure = createAction(
  '[Recover Password] failure',
  props<{ error: any }>()
);

//Login actions
export const login = createAction(
  '[Login]',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Login] success',
  props<{ user: User }>()
);
export const loginFailure = createAction(
  '[Login] failure',
  props<{ error: any }>()
);
