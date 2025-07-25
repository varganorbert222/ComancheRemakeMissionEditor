import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideZoneChangeDetection,
  provideAppInitializer,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TerrainDataReducer } from './store/terrain-data/terrain-data.reducer';
import { TerrainDataEffects } from './store/terrain-data/terrain-data.effects';
import { PreferencesEffects } from './store/preferences/preferences.effects';
import { PreferencesReducer } from './store/preferences/preferences.reducer';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, './i18n/', '.json');

const appStateProviders = [
  provideState('terrainData', TerrainDataReducer.terrainDataReducer),
  provideState('preferences', PreferencesReducer.preferencesReducer),
];

export function appTranslateInitializer(translate: TranslateService) {
  const osLang: string = window.navigator.language.substring(0, 2);
  translate.setDefaultLang(osLang);
  return translate.use(osLang);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideHttpClient(),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
    provideAppInitializer(() =>
      appTranslateInitializer(inject(TranslateService))
    ),
    provideEffects([TerrainDataEffects, PreferencesEffects]),
    ...appStateProviders,
  ],
};
