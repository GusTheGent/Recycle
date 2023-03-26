import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/User';
import { UserRegister } from 'src/app/models/UserRegister';

export const register = createAction(
  '[Register]',
  props<{ userRegister: UserRegister }>()
);

export const registerSuccess = createAction('[Register] Success');

export const registerFailure = createAction(
  '[Register] Failure',
  props<{ error: any }>()
);
