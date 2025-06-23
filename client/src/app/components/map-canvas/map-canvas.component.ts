import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import MapCanvasData from '../interfaces/map-canvas-data.interface';
import { RenderMode } from './enums/render-mode.enum';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-map-canvas',
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './map-canvas.component.html',
  styleUrl: './map-canvas.component.scss',
})
export default class MapCanvasComponent implements OnInit {
  @Input() mapCanvasData?: MapCanvasData;

  @ViewChild('id_canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  hasData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private renderMode = RenderMode.COLORMAP;
  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;
  private img = new Image();
  private offsetX = 0;
  private offsetY = 0;
  private scale = 1;
  private dragging = false;
  private lastMouseX = 0;
  private lastMouseY = 0;

  constructor() {
    this.onMapLoaded();
  }

  onMapLoaded(): void {
    if (
      this.mapCanvasData &&
      this.mapCanvasData.colorMapUrl &&
      this.mapCanvasData.heightMapUrl
    ) {
      this.hasData$.next(true);
    } else {
      this.hasData$.next(false);
    }

    this.isLoading$.next(false);
  }

  ngOnInit() {
    this.selectRenderMode(RenderMode.COLORMAP);
    this.img.onload = (e: Event) => {
      this.initCanvas();
      this.isLoading$.next(false);
    };
  }

  initCanvas() {
    this.canvas = this.canvasRef.nativeElement!;
    this.ctx = this.canvas?.getContext('2d')!;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.ctx.createPattern(this.img, 'repeat')!;
    this.draw();
  }

  selectRenderMode(renderMode: RenderMode) {
    this.renderMode = renderMode;

    if (this.renderMode === RenderMode.COLORMAP) {
      this.img.src = this.mapCanvasData?.colorMapUrl!;
    } else if (this.renderMode === RenderMode.HEIGHTMAP) {
      this.img.src = this.mapCanvasData?.heightMapUrl!;
    }
  }

  draw() {
    if (this.ctx && this.canvas && this.canvas.width && this.canvas.height) {
      this.ctx.setTransform(
        this.scale,
        0,
        0,
        this.scale,
        this.offsetX,
        this.offsetY
      );

      this.ctx.fillRect(
        -this.canvas.width,
        -this.canvas.height,
        this.canvas.width * 3,
        this.canvas.height * 3
      );
    }
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
    this.scale = Math.max(0.5, Math.min(3, this.scale)); // Limitáljuk a zoomot
    this.draw();
  }
}
