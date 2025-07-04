import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { PreferencesActions } from './preferences.actions';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { Preferences } from '../../interfaces/preferences.interface';
import { of } from 'rxjs';

@Injectable()
export class PreferencesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly localStorageService: LocalStorageService
  ) {}

  loadPreferences$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PreferencesActions.loadPreferences),
      switchMap(() => {
        const preferences =
          this.localStorageService.getItem<Preferences>('preferences');
        return of(preferences).pipe(
          map((preferences) => {
            if (preferences) {
              return PreferencesActions.loadPreferencesSuccess({
                data: preferences as Preferences,
              });
            }

            return PreferencesActions.loadPreferencesFailure({
              error: 'A beállítások betöltése sikertelen.',
            });
          })
        );
      })
    );
  });

  savePreferences$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PreferencesActions.savePreferences),
      switchMap((preferences) => {
        const isSuccess: boolean =
          this.localStorageService.setItem<Preferences>(
            'preferences',
            preferences.data
          );
        return of(isSuccess).pipe(
          map((isSuccess) => {
            if (isSuccess) {
              return PreferencesActions.savePreferencesSuccess();
            }

            return PreferencesActions.savePreferencesFailure({
              error: 'A beállítások mentése sikertelen.',
            });
          })
        );
      })
    );
  });
}
