import { RenderMode } from '../map-canvas/enums/render-mode.enum';

export default interface MapCanvasData {
  colorMapUrl: string;
  heightMapUrl: string;
  width: number;
  height: number;
  renderMode: RenderMode;
}
