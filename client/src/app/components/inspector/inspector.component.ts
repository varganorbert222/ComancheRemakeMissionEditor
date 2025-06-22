import { Component } from '@angular/core';
import { CmButtonComponent } from '../cm-button/cm-button.component';
import { MiniMapComponent } from '../mini-map/mini-map.component';

@Component({
  selector: 'app-inspector',
  imports: [CmButtonComponent, MiniMapComponent],
  templateUrl: './inspector.component.html',
  styleUrl: './inspector.component.scss',
})
export class InspectorComponent {}
