import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MapCanvasData } from '../interfaces/map-canvas-data.interface';
import { RenderMode } from './enums/render-mode.enum';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { PanZoomCanvasComponent } from '../pan-zoom-canvas/pan-zoom-canvas.component';

@Component({
  selector: 'app-map-canvas',
  imports: [MatProgressSpinnerModule, CommonModule, PanZoomCanvasComponent],
  templateUrl: './map-canvas.component.html',
  styleUrl: './map-canvas.component.scss',
})
export class MapCanvasComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit
{
  @ViewChild('container', { static: false })
  containerRef!: ElementRef<HTMLElement>;

  @ViewChild('canvas', { static: false })
  cmcanvas!: PanZoomCanvasComponent;

  @Input() mapCanvasData?: MapCanvasData | null | undefined;

  isLoading$ = new BehaviorSubject<boolean>(true);
  imageIsLoaded$ = new BehaviorSubject<boolean>(false);
  renderMode$ = new BehaviorSubject<RenderMode>(RenderMode.Empty);

  private img = new Image();
  private subscription!: Subscription;

  private setCmCanvasImage(img: HTMLImageElement) {
    if (this.cmcanvas) {
      this.cmcanvas.setImage(img);
    }
  }

  private resizeElement(
    elementRef: ElementRef<HTMLElement>,
    width: number,
    height: number
  ) {
    const element = elementRef.nativeElement;

    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
  }

  private resize() {
    if (this.mapCanvasData) {
      const { calcSizeFunc, canvasWidth, canvasHeight } = this.mapCanvasData;

      if (calcSizeFunc) {
        const { width, height } = calcSizeFunc();
        this.resizeElement(this.containerRef, width, height);
        return;
      }

      this.resizeElement(
        this.containerRef,
        canvasWidth ?? 100,
        canvasHeight ?? 100
      );
    }
  }

  ngOnInit() {
    this.img.addEventListener('load', (e: Event) => {
      this.setCmCanvasImage(this.img);
      this.draw();

      this.isLoading$.next(false);
      this.imageIsLoaded$.next(true);
    });

    this.subscription = interval(3000).subscribe(() => {
      if (this.imageIsLoaded$.getValue()) {
        return;
      }
      this.isLoading$.next(false);
      this.imageIsLoaded$.next(false);
      this.subscription.unsubscribe();
    });

    this.renderMode$.subscribe((renderMode) => {
      if (
        this.mapCanvasData &&
        this.mapCanvasData.colorMapUrl &&
        this.mapCanvasData.heightMapUrl
      ) {
        if (renderMode === RenderMode.Colormap) {
          this.img.src = this.mapCanvasData.colorMapUrl;
        } else if (renderMode === RenderMode.Heightmap) {
          this.img.src = this.mapCanvasData.heightMapUrl;
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.resize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.selectRenderMode(RenderMode.Colormap);
    }
  }

  selectRenderMode(renderMode: RenderMode) {
    this.renderMode$.next(renderMode);
  }

  draw() {
    if (this.cmcanvas) {
      this.cmcanvas.draw();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.resize();
  }
}
