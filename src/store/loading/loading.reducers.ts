import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../AppInitialState';
import * as LoadingActions from './loading.actions';
import { LoadingState } from './LoadingState';

const initialState: LoadingState = AppInitialState.loading;

const reducer = createReducer(
  initialState,
  on(LoadingActions.show, (state: LoadingState) => {
    return {
      showLoader: true,
    };
  }),
  on(LoadingActions.hide, (state: LoadingState) => {
    return {
      showLoader: false,
    };
  })
);

export function loadingReducer(state: LoadingState, action: any) {
  return reducer(state, action);
}
