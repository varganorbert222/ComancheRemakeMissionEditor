import { PreferenceIds } from '../enums/preference-ids.enum';

export interface Preferences extends Record<PreferenceIds, boolean> {
  theme: 'light' | 'dark';
}
