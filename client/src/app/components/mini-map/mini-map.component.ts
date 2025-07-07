import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MapCanvasComponent } from '../map-canvas/map-canvas.component';
import { MapCanvasData } from '../interfaces/map-canvas-data.interface';
import { ZoomEvent } from '../pan-zoom-canvas/interfaces/zoom-event.interface';

@Component({
  selector: 'app-mini-map',
  imports: [MapCanvasComponent],
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.scss',
})
export class MiniMapComponent {
  @Input() mapCanvasData?: MapCanvasData | null | undefined;
  @Output() onZoomChange = new EventEmitter<ZoomEvent>();

  onZoomChangeHandler(event: ZoomEvent) {
    this.onZoomChange.emit(event);
  }
}
