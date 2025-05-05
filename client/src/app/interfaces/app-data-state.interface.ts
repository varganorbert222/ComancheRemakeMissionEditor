import { MapCanvasData } from '../components/map-canvas/interfaces/map-canvas-data.interface';
import { TerrainDataState } from './terrain-data-state.interface';

export interface AppDataState {
  terrainData: TerrainDataState;
  mapCanvasData: MapCanvasData;
}
