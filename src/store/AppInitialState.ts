import { AppState } from './AppState';

export const AppInitialState: AppState = {
  loading: {
    showLoader: false,
  },
  login: {
    hasRecoveredPassword: false,
    isRecoveringPassword: false,
    isLoggedIn: false,
    isLoggingIn: false,
    error: null,
  },
};
