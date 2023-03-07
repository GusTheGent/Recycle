import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as LoadingActions from './loading.actions';
import { LoadingState } from './LoadingState';

const initialState: LoadingState = {
  showLoader: false,
};

// //BASE SELECTOR
// const getLoaderFeatureState = createFeatureSelector<LoadingState>('loading');
// // SELECTORS
// export const getShowLoader = createSelector(
//   getLoaderFeatureState,
//   (state) => state.showLoader
// );

const reducer = createReducer(
  initialState,
  on(LoadingActions.toggleLoader, (state: LoadingState) => {
    return {
      ...state,
      showLoader: !state.showLoader,
    };
  })
);

export function loadingReducer(state: LoadingState, action: any) {
  return reducer(state, action);
}
