import { createReducer, on } from '@ngrx/store';
import { RegisterState } from './RegisterState';
import { AppInitialState } from '../AppInitialState';
import * as RegisterActions from './register.actions';

const initialState: RegisterState = AppInitialState.register;

const reducer = createReducer(
  initialState,
  on(RegisterActions.register, (state: RegisterState) => {
    return {
      ...state,
      isRegistered: false,
      isRegistering: true,
      error: null,
    };
  }),
  on(RegisterActions.registerSuccess, (state: RegisterState) => {
    return {
      ...state,
      isRegistered: true,
      isRegistering: false,
      error: null,
    };
  }),
  on(RegisterActions.registerFailure, (state: RegisterState, action) => {
    return {
      ...state,
      isRegistered: false,
      isRegistering: false,
      error: action.error,
    };
  })
);

export function registerReducer(state: RegisterState, action: any) {
  return reducer(state, action);
}
