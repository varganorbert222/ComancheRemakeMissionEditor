import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MapCanvasComponent } from './components/map-canvas/map-canvas.component';
import { IMapCanvasData } from './components/map-canvas/interfaces/IMapCanvasData.interface';
import { Observable } from 'rxjs';
import { ITerrainData } from './services/terrain-data/interfaces/ITerrainData.interface';
import { Store } from '@ngrx/store';
import { loadAppDataAction } from './store/terrain-data/terrain-data.actions';
import { IAppDataState } from './interfaces/IAppDataState.interface';
import { selectAppData } from './store/terrain-data/terrain-data.selectors';
import { TerrainDataService } from './services/terrain-data/terrain-data.service';

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
export class AppComponent implements OnInit {
  title = 'Mission Editor';
  appData$: Observable<IAppDataState>;
  mapCanvasData: IMapCanvasData = {};

  constructor(
    private store: Store<{ appData: IAppDataState }>,
    private terrainDataService: TerrainDataService
  ) {
    this.appData$ = this.store.select(selectAppData);
  }

  ngOnInit() {
    this.loadAppData();
  }

  loadAppData() {
    this.terrainDataService.getAll().subscribe((data) => this.store.dispatch());
  }
}
