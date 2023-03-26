import { User } from 'src/app/models/User';

export interface RegisterState {
  isRegistering: boolean;
  isRegistered: boolean;
  error: any;
  user: User | null;
}
