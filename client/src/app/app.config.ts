import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import TerrainDataReducer from './store/terrain-data/terrain-data.reducer';
import TerrainDataEffects from './store/terrain-data/terrain-data.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState('terrainData', TerrainDataReducer.terrainDataReducer),
    provideEffects(TerrainDataEffects),
    provideHttpClient(),
  ],
};
