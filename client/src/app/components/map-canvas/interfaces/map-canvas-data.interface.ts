import { RenderMode } from '../enums/render-mode.enum';

export interface MapCanvasData {
  colorMapUrl: string; // URL of the color map image
  heightMapUrl: string; // Name of the map
  width: number; // Width of the map canvas
  height: number; // Height of the map canvas
  renderMode: RenderMode;
}
