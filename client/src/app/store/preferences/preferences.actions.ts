import { createAction, props } from '@ngrx/store';
import { Preferences } from '../../interfaces/preferences.interface';
import { PreferenceIds } from '../../enums/preference-ids.enum';
import { ThemeMode } from '../../enums/theme-mode.enum';

export class PreferencesActions {
  private static readonly actionsName: string = '[PreferencesActions]';

  static readonly loadPreferences = createAction(
    `${PreferencesActions.actionsName} Load Preferences`
  );

  static readonly loadPreferencesSuccess = createAction(
    `${PreferencesActions.actionsName} Load Preferences Success`,
    props<{ data: Preferences }>()
  );

  static readonly loadPreferencesFailure = createAction(
    `${PreferencesActions.actionsName} Load Preferences Failure`,
    props<{ error: string }>()
  );

  static readonly savePreferences = createAction(
    `${PreferencesActions.actionsName} Save Preferences`
  );

  static readonly savePreferencesSuccess = createAction(
    `${PreferencesActions.actionsName} Save Preferences Success`
  );

  static readonly savePreferencesFailure = createAction(
    `${PreferencesActions.actionsName} Save Preferences Failure`,
    props<{ error: string }>()
  );

  static readonly setPreference = createAction(
    `${PreferencesActions.actionsName} Set Preference`,
    props<{ id: PreferenceIds; value: boolean }>()
  );

  static readonly setTheme = createAction(
    `${PreferencesActions.actionsName} Set Theme`,
    props<{ theme: ThemeMode }>()
  );
}
