import { Preferences } from './preferences.interface';
import { Status } from './status.interface';

export interface PreferencesState {
  preferences: Preferences;
  status: Status;
}
