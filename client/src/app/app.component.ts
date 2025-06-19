import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapCanvasComponent } from './components/map-canvas/map-canvas.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TerrainDataService } from './services/terrain-data/terrain-data.service';
import { loadTerrainDataSuccess } from './store/terrain-data/terrain-data.actions';
import { TerrainData } from './services/terrain-data/interfaces/terrain-data.interface';
import { selectAllTerrainData } from './store/terrain-data/terrain-data.selectors';
import { AppDataState } from './interfaces/app-data-state.interface';
import { MapCanvasData } from './components/map-canvas/interfaces/map-canvas-data.interface';
import { RenderMode } from './components/map-canvas/enums/render-mode.enum';

@Component({
  selector: 'app-root',
  imports: [ToolbarComponent, SideMenuComponent, MapCanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title = 'Mission Editor';

  terrainData$: Observable<TerrainData[]>;

  mapCanvasData: MapCanvasData = {
    renderMode: RenderMode.COLORMAP,
    colorMapUrl: '',
    heightMapUrl: '',
    height: 0,
    width: 0,
  };

  constructor(
    private store: Store<AppDataState>,
    private terrainDataService: TerrainDataService
  ) {
    this.terrainData$ = this.store.select(selectAllTerrainData);
  }

  ngOnInit() {
    // this.loadAppData();
  }

  loadAppData() {
    this.terrainDataService
      .getAll()
      .subscribe((data) =>
        this.store.dispatch(loadTerrainDataSuccess({ data }))
      );
  }
}
