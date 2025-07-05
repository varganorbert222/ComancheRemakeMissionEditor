import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  HostListener,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapCanvasComponent } from './components/map-canvas/map-canvas.component';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
import { SideMenuData } from './components/side-menu/interfaces/side-menu-data.interface';
import { PreferencesSelectors } from './store/preferences/preferences.selectors';
import { SideMenuSectionsData } from './components/side-menu/data/menu-data.data';
import { Preferences } from './interfaces/preferences.interface';
import { MenuItem } from './components/interfaces/menu-item.interface';
import { PreferencesActions } from './store/preferences/preferences.actions';
import { ToolbarData } from './components/toolbar/interfaces/toolbar-data.interface';
import { ToolbarMenuData } from './components/toolbar/data/toolbar-data.data';
import { MenuItemIds } from './enums/menu-item-ids.enum';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    ToolbarComponent,
    SideMenuComponent,
    MapCanvasComponent,
    FooterComponent,
    InspectorComponent,
    MiniMapComponent,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChildren(MapCanvasComponent)
  mapCanvases?: QueryList<MapCanvasComponent>;

  ThemeMode = ThemeMode;

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
  private renderMode: RenderMode = RenderMode.Empty;

  toolbarData: ToolbarData = {
    items: ToolbarMenuData,
    values: {
      [MenuItemIds.ToggleDepthMap]: this.renderMode === RenderMode.Heightmap,
    },
  };

  themeMode$: Observable<ThemeMode>;

  sideMenuData$: Observable<SideMenuData | undefined>;

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
    private readonly renderer: Renderer2,
    private translate: TranslateService
  ) {
    this.initLanguage();

    this.sideMenuData$ = this.store
      .select(PreferencesSelectors.selectPreferences)
      .pipe(
        map((preferences: Preferences) => {
          return {
            sections: SideMenuSectionsData,
            values: preferences,
          };
        })
      );

    this.terrainData$ = this.store.select(
      TerrainDataSelectors.selectTerrainData('C1M1')
    );

    this.terrainData$
      .pipe(
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

    this.themeMode$ = this.store.select(PreferencesSelectors.selectTheme).pipe(
      map((mode) => {
        this.setThemeMode(mode);
        return mode;
      })
    );
  }

  ngOnInit() {
    this.translate.get('editor-title').subscribe((text) => {
      this.setDocTitle(text);
    });
    this.loadAppData();
  }

  ngAfterViewInit() {
    this.setRenderMode(false);
  }

  loadAppData() {
    this.store.dispatch(TerrainDataActions.loadTerrainData());
    this.store.dispatch(PreferencesActions.loadPreferences());
  }

  private initLanguage() {
    const osLang = navigator.language.substring(0, 2) || 'en';

    this.translate.addLangs(['en', 'hu']);
    this.translate.setDefaultLang(osLang);
    this.translate.use(osLang);
  }

  private setBodyClass(className: string) {
    this.renderer.addClass(document.body, className);
  }

  private removeBodyClass(className: string) {
    this.renderer.removeClass(document.body, className);
  }

  private setDocTitle(title: string) {
    document.getElementsByTagName('title')[0].textContent = title;
  }

  private setRenderMode(isDepthMap: boolean) {
    this.renderMode = {
      ['false']: RenderMode.Colormap,
      ['true']: RenderMode.Heightmap,
    }[`${isDepthMap}`];
    this.mapCanvases?.forEach((canvas) =>
      canvas.selectRenderMode(this.renderMode)
    );
  }

  private setThemeMode(mode: ThemeMode) {
    if (mode === ThemeMode.Dark) {
      this.setBodyClass('dark-mode');
      return;
    }
    this.removeBodyClass('dark-mode');
  }

  onThemeModeChanged(mode: ThemeMode) {
    this.setThemeMode(mode);
    this.store.dispatch(
      PreferencesActions.setTheme({
        theme: mode,
      })
    );
  }

  onMenuItemButtonClick(params: { item: MenuItem }) {
    console.log(params);
  }

  onMenuItemToggleChange(params: { checked: boolean; item: MenuItem }) {
    this.store.dispatch(
      PreferencesActions.setPreference({
        id: params.item.preferenceId!,
        value: params.checked,
      })
    );
  }

  onToolbarButtonClick(params: { item: MenuItem }) {
    console.log(params);
  }

  onToolbarToggleChange(params: { checked: boolean; item: MenuItem }) {
    this.setRenderMode(params.checked);
  }

  @HostListener('window:contextmenu', ['$event'])
  onContextmenu(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
