import { TerrainType } from '../../mission-data/enums/terrain-type.enum';

export default interface TerrainData {
  terrainType: TerrainType;
  name: string;
  colorMapUrl: string;
  heightMapUrl: string;
  terrainWidth: number;
  terrainHeight: number;
}
