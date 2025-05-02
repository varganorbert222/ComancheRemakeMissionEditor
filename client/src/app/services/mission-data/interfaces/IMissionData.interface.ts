import { IObjectsData } from './IObjectsData.interface';
import { IPlayerData } from './IPlayerData.interface';
import { ITerrainData } from '../../terrain-data/interfaces/ITerrainData.interface';
import { IWaypoint } from './IWaypoint.interface';
import { IWeatherData } from './IWeatherData.interface';

export interface IMissionData {
  missionName: string; // Name of the mission
  missionDescription?: string; // Description of the mission
  waypoints?: IWaypoint[]; // Array of waypoints associated with the mission
  terrainData: ITerrainData; // Terrain data for the mission
  weatherData: IWeatherData; // Weather data for the mission
  playerData?: IPlayerData; // Player data for the mission
  objectsData?: IObjectsData[]; // Objects data for the mission
}
