import { createSelector } from '@ngrx/store';
import { IAppDataState } from '../../interfaces/IAppDataState.interface';
import { ITerrainDataState } from '../../interfaces/ITerrainDataState.interface';

export const selectTerrainData = (state: IAppDataState) => state.terrainData;

export const selectAllTerrainData = createSelector(
  selectTerrainData,
  (state: ITerrainDataState) => state.data
);
