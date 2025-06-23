import { Component } from '@angular/core';
import MapCanvasComponent from '../map-canvas/map-canvas.component';

@Component({
  selector: 'app-mini-map',
  imports: [MapCanvasComponent],
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.scss',
})
export default class MiniMapComponent {
  constructor() {}
}
