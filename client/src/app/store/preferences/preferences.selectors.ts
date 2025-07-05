import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PreferencesState } from '../../interfaces/preferences-state.interface';
import { Preferences } from '../../interfaces/preferences.interface';
import { ThemeMode } from '../../enums/theme-mode.enum';

export class PreferencesSelectors {
  static readonly selectPreferencesState =
    createFeatureSelector<PreferencesState>('preferences');

  static readonly selectPreferences = createSelector(
    this.selectPreferencesState,
    (state: PreferencesState) => state.preferences
  );

  static readonly selectTheme = createSelector(
    this.selectPreferences,
    (state: Preferences) => state.theme as ThemeMode
  );
}
