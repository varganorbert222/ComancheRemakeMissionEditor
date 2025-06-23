import MapCanvasData from '../components/interfaces/map-canvas-data.interface';
import TerrainDataState from './terrain-data-state.interface';

export default interface AppDataState {
  terrainData: TerrainDataState;
  mapCanvasData: MapCanvasData;
}
