import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapCanvasComponent } from './components/map-canvas/map-canvas.component';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TerrainDataActions } from './store/terrain-data/terrain-data.actions';
import { TerrainData } from './services/terrain-data/interfaces/terrain-data.interface';
import { TerrainDataSelectors } from './store/terrain-data/terrain-data.selectors';
import { MapCanvasData } from './components/interfaces/map-canvas-data.interface';
import { RenderMode } from './components/map-canvas/enums/render-mode.enum';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeMode } from './enums/theme-mode.enum';
import { InspectorComponent } from './components/inspector/inspector.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    ToolbarComponent,
    SideMenuComponent,
    MapCanvasComponent,
    FooterComponent,
    InspectorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title = 'Mission Editor';

  private canvasCalcSizeFunc = (): { width: number; height: number } => {
    const sidebarWidth = document
      .getElementsByClassName('sidebar')[0]
      .getBoundingClientRect().width;
    const inspectorWidth = document
      .getElementsByClassName('inspector')[0]
      .getBoundingClientRect().width;
    const toolbarHeight = document
      .getElementsByTagName('header')[0]
      .getBoundingClientRect().height;
    const footerHeight = document
      .getElementsByTagName('app-footer')[0]
      .getBoundingClientRect().height;

    const width = window.innerWidth - sidebarWidth - inspectorWidth;
    const height = window.innerHeight - toolbarHeight - footerHeight;

    return {
      width: width,
      height: height,
    };
  };

  terrainData$: Observable<TerrainData | undefined>;

  mapCanvasData$ = new BehaviorSubject<MapCanvasData>({
    calcSizeFunc: this.canvasCalcSizeFunc,
  });

  minimapCanvasData$ = new BehaviorSubject<MapCanvasData>({
    canvasWidth: 200,
    canvasHeight: 200,
  });

  constructor(
    private readonly store: Store<{ terrainData: TerrainData }>,
    private readonly renderer: Renderer2
  ) {
    this.terrainData$ = this.store.select(
      TerrainDataSelectors.selectTerrainData('C1M1')
    );

    this.terrainData$
      .pipe(
        distinctUntilChanged(),
        map((terrainData) => {
          return {
            renderMode: RenderMode.Colormap,
            colorMapUrl: terrainData?.colorMapUrl,
            heightMapUrl: terrainData?.heightMapUrl,
            height: terrainData?.terrainHeight,
            width: terrainData?.terrainWidth,
            calcSizeFunc: this.canvasCalcSizeFunc,
          };
        })
      )
      .subscribe((canvasData) => {
        this.mapCanvasData$.next(canvasData);
      });

    this.terrainData$
      .pipe(
        distinctUntilChanged(),
        map((terrainData) => {
          return {
            renderMode: RenderMode.Colormap,
            colorMapUrl: terrainData?.colorMapUrl,
            heightMapUrl: terrainData?.heightMapUrl,
            height: terrainData?.terrainHeight,
            width: terrainData?.terrainWidth,
            canvasWidth: 200,
            canvasHeight: 200,
          };
        })
      )
      .subscribe((canvasData) => {
        this.minimapCanvasData$.next(canvasData);
      });
  }

  ngOnInit() {
    this.loadAppData();
  }

  loadAppData() {
    this.store.dispatch(TerrainDataActions.loadTerrainData());
  }

  private setBodyClass(className: string) {
    this.renderer.addClass(document.body, className);
  }

  private removeBodyClass(className: string) {
    this.renderer.removeClass(document.body, className);
  }

  onThemeModeChanged(mode: ThemeMode) {
    if (mode === ThemeMode.Dark) {
      this.setBodyClass('dark-mode');
    } else {
      this.removeBodyClass('dark-mode');
    }
  }

  @HostListener('window:contextmenu', ['$event'])
  onContextmenu(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
