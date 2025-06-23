import { createSelector } from '@ngrx/store';
import AppDataState from '../../interfaces/app-data-state.interface';
import TerrainDataState from '../../interfaces/terrain-data-state.interface';
import TerrainData from '../../services/terrain-data/interfaces/terrain-data.interface';

export default class TerrainDataSelectors {
  static readonly terrainDataState = (state: AppDataState) => state.terrainData;

  static readonly selectAllTerrainData = createSelector(
    this.terrainDataState,
    (state: TerrainDataState) => state.data
  );

  static readonly selectTerrainData = (name: string) =>
    createSelector(this.selectAllTerrainData, (state: TerrainData[]) =>
      state.find((x) => x.name === name)
    );
}
