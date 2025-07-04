import { createReducer, on } from '@ngrx/store';
import { StatusEnum } from '../../interfaces/status.enum';
import { PreferencesActions } from './preferences.actions';
import { PreferencesState } from '../../interfaces/preferences-state.interface';
import { PreferenceIds } from '../../enums/preference-ids.enum';

export class PreferencesReducer {
  static readonly initialState: PreferencesState = {
    preferences: {
      [PreferenceIds.ShowAircrafts]: true,
      [PreferenceIds.ShowAllObjects]: true,
      [PreferenceIds.ShowCoordsInMeters]: true,
      [PreferenceIds.ShowDistanceBar]: true,
      [PreferenceIds.ShowEntireWorld]: true,
      [PreferenceIds.ShowGoals]: true,
      [PreferenceIds.ShowLandVehicles]: true,
      [PreferenceIds.ShowStatic]: true,
      [PreferenceIds.ShowTrueDirection]: true,
      [PreferenceIds.ShowWaypoints]: true,
      [PreferenceIds.ShowZoomSpot]: true,
      theme: 'light',
    },
    status: {
      status: StatusEnum.Pending,
      errorMessage: '',
    },
  };

  static readonly preferencesReducer = createReducer(
    PreferencesReducer.initialState,

    on(PreferencesActions.loadPreferences, (state) => ({
      ...state,
      status: { ...state.status, status: StatusEnum.Loading, errorMessage: '' },
    })),

    on(PreferencesActions.loadPreferencesSuccess, (state, { data }) => ({
      ...state,
      data: data,
      status: { ...state.status, status: StatusEnum.Success, errorMessage: '' },
    })),

    on(PreferencesActions.loadPreferencesFailure, (state, { error }) => ({
      ...state,
      status: {
        ...state.status,
        status: StatusEnum.Error,
        errorMessage: error,
      },
    }))
  );
}
