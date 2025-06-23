import { createReducer, on } from '@ngrx/store';
import TerrainDataActions from './terrain-data.actions';
import TerrainDataState from '../../interfaces/terrain-data-state.interface';
import { StatusEnum } from '../../interfaces/status.enum';

export default class TerrainDataReducer {
  private static readonly initialState: TerrainDataState = {
    data: [],
    status: {
      status: StatusEnum.PENDING,
      errorMessage: '',
    },
  };

  static readonly terrainDataReducer = createReducer(
    TerrainDataReducer.initialState,

    on(TerrainDataActions.loadTerrainData, (state) => ({
      ...state,
      status: { ...state.status, status: StatusEnum.LOADING, errorMessage: '' },
    })),

    on(TerrainDataActions.loadTerrainDataSuccess, (state, { data }) => ({
      ...state,
      data: data,
      status: { ...state.status, status: StatusEnum.SUCCESS, errorMessage: '' },
    })),

    on(TerrainDataActions.loadTerrainDataFailure, (state, { error }) => ({
      ...state,
      status: {
        ...state.status,
        status: StatusEnum.ERROR,
        errorMessage: error,
      },
    }))
  );
}
