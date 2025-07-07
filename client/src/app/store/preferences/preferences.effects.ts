import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { PreferencesActions } from './preferences.actions';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { Preferences } from '../../interfaces/preferences.interface';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { PreferencesSelectors } from './preferences.selectors';

@Injectable()
export class PreferencesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly localStorageService: LocalStorageService,
    private readonly store: Store<{ preferences: Preferences }>
  ) {}

  loadPreferences$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PreferencesActions.loadPreferences),
      withLatestFrom(this.store.select(PreferencesSelectors.selectPreferences)),
      switchMap(([_, preferences]) => {
        const storedPreferences =
          this.localStorageService.getItem<Preferences>('preferences');

        if (storedPreferences) {
          return of(
            PreferencesActions.loadPreferencesSuccess({
              data: storedPreferences,
            })
          );
        }

        return of(
          PreferencesActions.savePreferences(),
          PreferencesActions.loadPreferencesSuccess({
            data: preferences,
          })
        );
      })
    );
  });

  savePreferences$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        PreferencesActions.setTheme,
        PreferencesActions.setPreference,
        PreferencesActions.savePreferences
      ),
      withLatestFrom(this.store.select(PreferencesSelectors.selectPreferences)),
      switchMap(([_, preferences]) => {
        const isSuccess: boolean =
          this.localStorageService.setItem<Preferences>(
            'preferences',
            preferences
          );
        return of(isSuccess).pipe(
          map((isSuccess) => {
            if (isSuccess) {
              return PreferencesActions.savePreferencesSuccess();
            }

            return PreferencesActions.savePreferencesFailure({
              error: 'Nem sikerült a beállításokat menteni.',
            });
          })
        );
      })
    );
  });
}
