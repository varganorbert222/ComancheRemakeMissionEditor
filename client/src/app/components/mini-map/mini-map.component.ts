import { Component, Input } from '@angular/core';
import MapCanvasComponent from '../map-canvas/map-canvas.component';
import MapCanvasData from '../interfaces/map-canvas-data.interface';

@Component({
  selector: 'app-mini-map',
  imports: [MapCanvasComponent],
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.scss',
})
export default class MiniMapComponent {
  @Input() mapCanvasData?: MapCanvasData | null | undefined;

  constructor() {}
}
