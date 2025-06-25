import { Component, Input } from '@angular/core';
import CmButtonComponent from '../cm-button/cm-button.component';
import MiniMapComponent from '../mini-map/mini-map.component';
import MapCanvasData from '../interfaces/map-canvas-data.interface';

@Component({
  selector: 'app-inspector',
  imports: [CmButtonComponent, MiniMapComponent],
  templateUrl: './inspector.component.html',
  styleUrl: './inspector.component.scss',
})
export default class InspectorComponent {
  @Input() mapCanvasData?: MapCanvasData | null | undefined;
}
