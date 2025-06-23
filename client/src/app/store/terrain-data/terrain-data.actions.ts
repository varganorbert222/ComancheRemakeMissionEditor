import { createAction, props } from '@ngrx/store';
import TerrainData from '../../services/terrain-data/interfaces/terrain-data.interface';

export default class TerrainDataActions {
  static readonly loadTerrainData = createAction(
    '[App Component] Load Terrain Data'
  );

  static readonly loadTerrainDataSuccess = createAction(
    '[App Component] Load Terrain Data Success',
    props<{ data: TerrainData[] }>()
  );

  static readonly loadTerrainDataFailure = createAction(
    '[App Component] Load Terrain Data Failure',
    props<{ error: string }>()
  );
}
