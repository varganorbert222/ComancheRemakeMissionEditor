import { ITerrainData } from '../services/terrain-data/interfaces/ITerrainData.interface';
import { IStatus } from './IStatus.interface';

export interface ITerrainDataState {
  data: ITerrainData[];
  status: IStatus;
}
