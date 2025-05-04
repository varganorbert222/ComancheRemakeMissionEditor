import { createReducer, on } from '@ngrx/store';
import { Status } from '../../components/map-canvas/enums/Status.enum';
import {
  loadTerrainData,
  loadTerrainDataFailure,
  loadTerrainDataSuccess,
} from './terrain-data.actions';
import { ITerrainDataState } from '../../interfaces/ITerrainDataState.interface';

export const initialState: ITerrainDataState = {
  data: [],
  status: {
    status: Status.PENDING,
    errorMessage: '',
  },
};

export const terrainDataReducer = createReducer(
  initialState,
  on(loadTerrainData, (state) => ({
    ...state,
    status: { ...state.status, status: Status.LOADING, errorMessage: '' },
  })),
  on(loadTerrainDataSuccess, (state, { data }) => ({
    ...state,
    data: data,
    status: { ...state.status, status: Status.SUCCESS, errorMessage: '' },
  })),
  on(loadTerrainDataFailure, (state, { error }) => ({
    ...state,
    status: { ...state.status, status: Status.ERROR, errorMessage: error },
  }))
);
