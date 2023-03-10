import { User } from 'src/app/models/User';

export interface LoginState {
  isRecoveringEmailPassword: boolean;
  hasRecoveredEmailPassword: boolean;
  isLoggingIn: boolean;
  isLoggedIn: boolean;
  error: any;
  user: User | null;
}
