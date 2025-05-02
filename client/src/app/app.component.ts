import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MapCanvasComponent } from './components/map-canvas/map-canvas.component';
import { IMapCanvasData } from './components/map-canvas/interfaces/IMapCanvasData.interface';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ToolbarComponent,
    SidebarComponent,
    MapCanvasComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'Mission Editor';
  mapCanvasData: IMapCanvasData = {};
}
