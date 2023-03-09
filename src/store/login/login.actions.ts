import { createAction, props } from '@ngrx/store';

export const recoverPassword = createAction('[Recover Password]');
export const recoverPasswordSuccess = createAction(
  '[Recover Password] success'
);
export const recoverPasswordFailure = createAction(
  '[Recover Password] failure',
  props<{ error: any }>()
);
