import { createAction, props } from '@ngrx/store';
import { Preferences } from '../../interfaces/preferences.interface';

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
    `${PreferencesActions.actionsName} Save Preferences`,
    props<{ data: Preferences }>()
  );

  static readonly savePreferencesSuccess = createAction(
    `${PreferencesActions.actionsName} Save Preferences Success`
  );

  static readonly savePreferencesFailure = createAction(
    `${PreferencesActions.actionsName} Save Preferences Failure`,
    props<{ error: string }>()
  );
}
