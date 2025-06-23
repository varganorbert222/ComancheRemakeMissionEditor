import MissionObject from './mission-object.interface';

export default interface Mission {
  mapName: string;
  time: { hour: number; minute: number };
  missionName: string;
  windDirection: string;
  objects: MissionObject[];
}
