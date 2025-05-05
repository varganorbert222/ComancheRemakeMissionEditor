import { createSelector } from '@ngrx/store';
import { AppDataState } from '../../interfaces/app-data-state.interface';
import { TerrainDataState } from '../../interfaces/terrain-data-state.interface';

export const selectTerrainData = (state: AppDataState) => state.terrainData;

export const selectAllTerrainData = createSelector(
  selectTerrainData,
  (state: TerrainDataState) => state.data
);
