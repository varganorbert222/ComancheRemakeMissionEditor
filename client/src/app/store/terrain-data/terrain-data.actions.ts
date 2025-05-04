import { createAction, props } from '@ngrx/store';
import { ITerrainData } from '../../services/terrain-data/interfaces/ITerrainData.interface';

export const loadTerrainData = createAction(
  '[App Component] Load Terrain Data'
);
export const loadTerrainDataSuccess = createAction(
  '[App Component] Load Terrain Data Success',
  props<{ data: ITerrainData[] }>()
);
export const loadTerrainDataFailure = createAction(
  '[App Component] Load Terrain Data Failure',
  props<{ error: string }>()
);
