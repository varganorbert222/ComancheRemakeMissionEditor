import ObjectsData from './objects-data.interface';
import PlayerData from './player-data.interface';
import TerrainData from '../../terrain-data/interfaces/terrain-data.interface';
import Waypoint from './waypoint.interface';
import WeatherData from './weather-data.interface';

export default interface MissionData {
  missionName: string; // Name of the mission
  missionDescription?: string; // Description of the mission
  waypoints?: Waypoint[]; // Array of waypoints associated with the mission
  terrainData: TerrainData; // Terrain data for the mission
  weatherData: WeatherData; // Weather data for the mission
  playerData?: PlayerData; // Player data for the mission
  objectsData?: ObjectsData[]; // Objects data for the mission
}
