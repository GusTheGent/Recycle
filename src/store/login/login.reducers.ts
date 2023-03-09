import { createReducer, on } from '@ngrx/store';
import { LoginState } from './LoginState';
import { AppInitialState } from '../AppInitialState';
import * as LoginActions from './login.actions';

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(
  initialState,
  on(LoginActions.recoverPassword, (state: LoginState) => {
    return {
      ...state,
      isRecoveringPassword: true,
    };
  }),
  on(LoginActions.recoverPasswordSuccess, (state: LoginState) => {
    return {
      ...state,
      isRecoveringPassword: false,
      hasRecoveredPassword: true,
    };
  }),
  on(LoginActions.recoverPasswordFailure, (state: LoginState, action) => {
    return {
      ...state,
      isRecoveringPassword: false,
      hasRecoveredPassword: false,
      error: action.error,
    };
  })
);

export function loginReducer(state: LoginState, action: any) {
  return reducer(state, action);
}
