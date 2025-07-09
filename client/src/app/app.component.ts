import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
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
import { Preferences } from './interfaces/preferences.interface';
import { MenuItem } from './components/interfaces/menu-item.interface';
import { PreferencesActions } from './store/preferences/preferences.actions';
import { ToolbarData } from './components/toolbar/interfaces/toolbar-data.interface';
import { MenuItemIds } from './enums/menu-item-ids.enum';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NewMissionModalComponent } from './components/new-mission-modal/new-mission-modal.component';
import { ZoomControlComponent } from './components/zoom-control/zoom-control.component';
import { ZoomEvent } from './components/pan-zoom-canvas/interfaces/zoom-event.interface';
import { MenuDataService } from './services/menu-data/menu-data.service';
import { LocIds } from './enums/loc-ids.enum';
import { DialogService } from './services/dialog/dialog.service';

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
    MatDialogModule,
    ZoomControlComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(MapCanvasComponent, { static: true })
  mapCanvas!: MapCanvasComponent;

  @ViewChild(MiniMapComponent, {
    static: true,
  })
  minimap!: MiniMapComponent;

  @ViewChild(ZoomControlComponent, {
    static: true,
  })
  zoomControl!: ZoomControlComponent;

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
    items: this.menuData.getToolbarData(),
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
    private readonly translate: TranslateService,
    private readonly dialog: DialogService,
    private readonly menuData: MenuDataService
  ) {
    this.initLanguage();

    this.sideMenuData$ = this.store
      .select(PreferencesSelectors.selectPreferences)
      .pipe(
        map((preferences: Preferences) => {
          return {
            sections: this.menuData.getMenuData(),
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
    this.setDocTitle(this.translate.instant(LocIds.EditorTitle));
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
    const osLang = this.translate.getBrowserLang() ?? 'en';
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
    this.mapCanvas.selectRenderMode(this.renderMode);
  }

  private setThemeMode(mode: ThemeMode) {
    if (mode === ThemeMode.Dark) {
      this.setBodyClass('dark-mode');
      return;
    }
    this.removeBodyClass('dark-mode');
  }

  private onNewMission() {
    console.log('New mission created.');
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
    const id: MenuItemIds = params.item.id ?? MenuItemIds.Unknown;
    const item: MenuItem = params.item;

    if (id === MenuItemIds.NewMission) {
      this.dialog.open({
        title: LocIds.NewMission,
        component: NewMissionModalComponent,
        buttons: [
          {
            icon: 'add_task',
            label: LocIds.Ok,
            color: 'primary',
            action: () => this.onNewMission(),
          },
          {
            icon: 'block',
            label: LocIds.Cancel,
            color: 'warn',
            closeOnClick: true,
          },
        ],
      });

      return;
    }
    if (id === MenuItemIds.FileOpen) {
      return;
    }
    if (id === MenuItemIds.CloseMission) {
      return;
    }
    if (id === MenuItemIds.SaveMission) {
      return;
    }
    if (id === MenuItemIds.ExportMission) {
      return;
    }
    if (id === MenuItemIds.EditMission) {
      return;
    }
    if (id === MenuItemIds.ExportMissionData) {
      return;
    }
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

  onZoomChangeHandler(event: ZoomEvent) {
    this.zoomControl.updateZoom();
  }

  @HostListener('window:contextmenu', ['$event'])
  onContextmenu(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
