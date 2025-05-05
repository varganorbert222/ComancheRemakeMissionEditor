import { createAction, props } from '@ngrx/store';
import { TerrainData } from '../../services/terrain-data/interfaces/terrain-data.interface';

export const loadTerrainData = createAction(
  '[App Component] Load Terrain Data'
);
export const loadTerrainDataSuccess = createAction(
  '[App Component] Load Terrain Data Success',
  props<{ data: TerrainData[] }>()
);
export const loadTerrainDataFailure = createAction(
  '[App Component] Load Terrain Data Failure',
  props<{ error: string }>()
);
