import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PreferencesState } from '../../interfaces/preferences-state.interface';

export class PreferencesSelectors {
  static readonly selectPreferencesState =
    createFeatureSelector<PreferencesState>('preferences');

  static readonly selectPreferences = createSelector(
    this.selectPreferencesState,
    (state: PreferencesState) => state.preferences
  );
}
