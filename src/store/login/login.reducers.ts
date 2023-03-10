import { createReducer, on } from '@ngrx/store';
import { LoginState } from './LoginState';
import { AppInitialState } from '../AppInitialState';
import * as LoginActions from './login.actions';
import { User } from 'src/app/models/User';

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(
  initialState,
  on(LoginActions.recoverPassword, (state: LoginState) => {
    return {
      ...state,
      isRecoveringEmailPassword: true,
    };
  }),
  on(LoginActions.recoverPasswordSuccess, (state: LoginState) => {
    return {
      ...state,
      isRecoveringEmailPassword: false,
      hasRecoveredEmailPassword: true,
    };
  }),
  on(LoginActions.recoverPasswordFailure, (state: LoginState, action) => {
    return {
      ...state,
      isRecoveringEmailPassword: false,
      hasRecoveredEmailPassword: false,
      error: action.error,
    };
  }),
  on(LoginActions.login, (state: LoginState) => {
    return {
      ...state,
      error: null,
      isLoggedIn: false,
      isLoggingIn: true,
    };
  }),
  on(LoginActions.loginSuccess, (state: LoginState, action) => {
    return {
      ...state,
      error: null,
      isLoggingIn: false,
      isLoggedIn: true,
      user: action.user,
    };
  }),
  on(LoginActions.loginFailure, (state: LoginState, action) => {
    return {
      ...state,
      isLoggingIn: false,
      isLoggedIn: false,
      error: action.error,
    };
  })
);

export function loginReducer(state: LoginState, action: any) {
  return reducer(state, action);
}
