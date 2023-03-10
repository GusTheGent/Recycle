import { User } from 'src/app/models/User';
import { AppState } from './AppState';

export const AppInitialState: AppState = {
  loading: {
    showLoader: false,
  },
  login: {
    hasRecoveredEmailPassword: false,
    isRecoveringEmailPassword: false,
    isLoggedIn: false,
    isLoggingIn: false,
    error: null,
    user: null,
  },
};
