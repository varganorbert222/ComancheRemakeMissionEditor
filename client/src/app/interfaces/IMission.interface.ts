import { IMissionObject } from "./IMissionObject.interface";

export interface IMission {
  mapName: string;
  time: { hour: number; minute: number };
  missionName: string;
  windDirection: string;
  objects: IMissionObject[];
}