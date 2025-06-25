import { createFeatureSelector, createSelector } from '@ngrx/store';
import TerrainDataState from '../../interfaces/terrain-data-state.interface';
import TerrainData from '../../services/terrain-data/interfaces/terrain-data.interface';

export default class TerrainDataSelectors {
  static readonly selectTerrainDataState =
    createFeatureSelector<TerrainDataState>('terrainData');

  static readonly selectAllTerrainData = createSelector(
    this.selectTerrainDataState,
    (state: TerrainDataState) => state.data
  );

  static readonly selectTerrainData = (name: string) =>
    createSelector(this.selectAllTerrainData, (state: TerrainData[]) =>
      state.find((x) => x.name === name)
    );
}
