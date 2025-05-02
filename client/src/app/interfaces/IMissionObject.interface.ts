export interface IMissionObject {
  id: string;
  type: string;
  position: { x: number; y: number; z: number };
  rotation: number;
}