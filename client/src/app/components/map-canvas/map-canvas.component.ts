import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
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
import { CmCanvasComponent } from '../cm-canvas/cm-canvas.component';

@Component({
  selector: 'app-map-canvas',
  imports: [MatProgressSpinnerModule, CommonModule, CmCanvasComponent],
  templateUrl: './map-canvas.component.html',
  styleUrl: './map-canvas.component.scss',
})
export class MapCanvasComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('container', { static: false })
  containerRef!: ElementRef<HTMLElement>;

  @ViewChild('cmcanvas', { static: false })
  cmcanvas!: CmCanvasComponent;

  @Input() mapCanvasData?: MapCanvasData | null | undefined;

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  hasData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private renderMode = RenderMode.Colormap;
  private img = new Image();
  private subscription!: Subscription;
  private offsetX = 0;
  private offsetY = 0;
  private scale = 1;
  private dragging = false;
  private lastMouseX = 0;
  private lastMouseY = 0;

  constructor() {}

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
      this.hasData$.next(true);
    });

    this.subscription = interval(3000).subscribe(() => {
      if (this.hasData$.getValue()) {
        return;
      }
      this.isLoading$.next(false);
      this.hasData$.next(false);
      this.subscription.unsubscribe();
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
      this.selectRenderMode(this.renderMode);
    }
  }

  selectRenderMode(renderMode: RenderMode) {
    this.renderMode = renderMode;

    if (this.renderMode === RenderMode.Colormap) {
      this.img.src = this.mapCanvasData?.colorMapUrl!;
    } else if (this.renderMode === RenderMode.Heightmap) {
      this.img.src = this.mapCanvasData?.heightMapUrl!;
    }
  }

  draw() {
    if (this.cmcanvas) {
      this.cmcanvas.draw();
    }
    // if (this.ctx && this.canvas) {
    //   this.ctx.setTransform(
    //     this.scale,
    //     0,
    //     0,
    //     this.scale,
    //     this.offsetX,
    //     this.offsetY
    //   );

    //   this.ctx.fillRect(
    //     -this.canvas.width,
    //     -this.canvas.height,
    //     this.canvas.width * 3,
    //     this.canvas.height * 3
    //   );
    // }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (event.button === 2) {
      this.dragging = true;
      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;
    }
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.dragging = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.dragging) {
      const dx = event.clientX - this.lastMouseX;
      const dy = event.clientY - this.lastMouseY;
      this.offsetX += dx;
      this.offsetY += dy;
      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;
      this.draw();
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    const zoomFactor = 0.1;
    this.scale += event.deltaY > 0 ? -zoomFactor : zoomFactor;
    this.scale = Math.max(0.5, Math.min(3, this.scale));
    this.draw();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.resize();
  }
}
