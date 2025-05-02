import { TerrainType } from '../../mission-data/enums/TerrainType.enum';

export interface ITerrainData {
  terrainType: TerrainType;
  colorMapUrl: string;
  heightMapUrl: string;
  terrainWidth: number;
  terrainHeight: number;
}
