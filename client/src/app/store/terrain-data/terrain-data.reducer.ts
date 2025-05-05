import { createReducer, on } from '@ngrx/store';
import { StatusEnum } from '../../interfaces/status.enum';
import {
  loadTerrainData,
  loadTerrainDataFailure,
  loadTerrainDataSuccess,
} from './terrain-data.actions';
import { TerrainDataState } from '../../interfaces/terrain-data-state.interface';

export const initialState: TerrainDataState = {
  data: [],
  status: {
    status: StatusEnum.PENDING,
    errorMessage: '',
  },
};

export const terrainDataReducer = createReducer(
  initialState,
  on(loadTerrainData, (state) => ({
    ...state,
    status: { ...state.status, status: StatusEnum.LOADING, errorMessage: '' },
  })),
  on(loadTerrainDataSuccess, (state, { data }) => ({
    ...state,
    data: data,
    status: { ...state.status, status: StatusEnum.SUCCESS, errorMessage: '' },
  })),
  on(loadTerrainDataFailure, (state, { error }) => ({
    ...state,
    status: { ...state.status, status: StatusEnum.ERROR, errorMessage: error },
  }))
);
