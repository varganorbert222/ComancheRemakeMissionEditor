import { TerrainData } from '../services/terrain-data/interfaces/terrain-data.interface';
import { Status } from './Status.interface';

export interface TerrainDataState {
  data: TerrainData[];
  status: Status;
}
