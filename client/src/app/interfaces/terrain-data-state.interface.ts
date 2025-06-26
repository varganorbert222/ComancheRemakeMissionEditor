import { TerrainData } from '../services/terrain-data/interfaces/terrain-data.interface';
import { Status } from './status.interface';

export interface TerrainDataState {
  data: TerrainData[];
  status: Status;
}
