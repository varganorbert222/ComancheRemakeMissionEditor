import { Component, Input } from '@angular/core';
import { MapCanvasComponent } from '../map-canvas/map-canvas.component';
import { MapCanvasData } from '../interfaces/map-canvas-data.interface';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-mini-map',
  imports: [MapCanvasComponent, ButtonComponent],
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.scss',
})
export class MiniMapComponent {
  @Input() mapCanvasData?: MapCanvasData | null | undefined;
}
