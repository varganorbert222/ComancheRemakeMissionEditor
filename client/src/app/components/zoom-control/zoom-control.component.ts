import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { DecimalPipe } from '@angular/common';
import { MapCanvasComponent } from '../map-canvas/map-canvas.component';
import { LocIds } from '../../enums/loc-ids.enum';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-zoom-control',
  imports: [ButtonComponent, DecimalPipe, TranslateModule, MatButtonModule],
  templateUrl: './zoom-control.component.html',
  styleUrl: './zoom-control.component.scss',
})
export class ZoomControlComponent {
  @Input() mapCanvas?: MapCanvasComponent;

  LocIds = LocIds;
  zoom: number = 1;

  updateZoom() {
    this.zoom = this.mapCanvas?.getZoom() ?? 1;
  }

  onButtonClickedHandler(event: 'zoom-in' | 'zoom-out' | 'zoom-reset') {
    const delta = { 'zoom-in': -1, 'zoom-out': 1, 'zoom-reset': 0 }[event];
    this.mapCanvas?.zoomStep(delta);
    this.updateZoom();
  }
}
