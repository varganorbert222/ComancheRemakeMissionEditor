import { IMapCanvasData } from '../components/map-canvas/interfaces/IMapCanvasData.interface';
import { ITerrainDataState } from './ITerrainDataState.interface';

export interface IAppDataState {
  terrainData: ITerrainDataState;
  mapCanvasData: IMapCanvasData;
}
