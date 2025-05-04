import { RenderMode } from '../enums/RenderMode.enum';

export interface IMapCanvasData {
  colorMapUrl: string; // URL of the color map image
  heightMapUrl: string; // Name of the map
  width: number; // Width of the map canvas
  height: number; // Height of the map canvas
  renderMode: RenderMode;
}
