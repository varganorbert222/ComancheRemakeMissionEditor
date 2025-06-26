import { createAction, props } from '@ngrx/store';
import { TerrainData } from '../../services/terrain-data/interfaces/terrain-data.interface';

export class TerrainDataActions {
  private static readonly actionsName: string = '[TerrainDataActions]';

  static readonly loadTerrainData = createAction(
    `${TerrainDataActions.actionsName} Load Terrain Data`
  );

  static readonly loadTerrainDataSuccess = createAction(
    `${TerrainDataActions.actionsName} Load Terrain Data Success`,
    props<{ data: TerrainData[] }>()
  );

  static readonly loadTerrainDataFailure = createAction(
    `${TerrainDataActions.actionsName} Load Terrain Data Failure`,
    props<{ error: string }>()
  );
}
