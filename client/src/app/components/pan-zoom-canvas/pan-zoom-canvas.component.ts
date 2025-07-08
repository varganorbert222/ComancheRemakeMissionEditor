import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ZoomEvent } from './interfaces/zoom-event.interface';

@Component({
  selector: 'app-pan-zoom-canvas',
  templateUrl: './pan-zoom-canvas.component.html',
  styleUrls: ['./pan-zoom-canvas.component.scss'],
})
export class PanZoomCanvasComponent implements AfterViewInit, OnChanges {
  @HostBinding('class.panning') isPanning = false;

  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() width?: number;
  @Input() height?: number;
  @Input() disableMouseEvents?: boolean = true;
  @Input() calcSizeFunc?: () => { width: number; height: number };
  @Output() onZoomChange = new EventEmitter<ZoomEvent>();

  private img!: CanvasImageSource;
  private ctx!: CanvasRenderingContext2D;
  private cachedPattern?: CanvasPattern;

  private zoom: number = 1;
  private wx: number = 0;
  private wy: number = 0;
  private sx: number = 0;
  private sy: number = 0;

  private mouse = {
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
    down: false,
  };

  getZoom(): number {
    return this.zoom;
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.resize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isPanning = !this.disableMouseEvents;
  }

  private applyTransform(ctx: CanvasRenderingContext2D): void {
    const dx = this.sx - this.zoom * this.wx;
    const dy = this.sy - this.zoom * this.wy;
    ctx.setTransform(this.zoom, 0, 0, this.zoom, dx, dy);
  }

  private zoomedXInv(screenX: number): number {
    return (screenX - this.sx) / this.zoom + this.wx;
  }

  private zoomedYInv(screenY: number): number {
    return (screenY - this.sy) / this.zoom + this.wy;
  }

  draw(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    ctx.imageSmoothingEnabled = false;

    if (!this.img) return;
    if (!this.cachedPattern) {
      const pattern = ctx.createPattern(this.img, 'repeat');
      if (!pattern) return;
      this.cachedPattern = pattern;
      ctx.fillStyle = this.cachedPattern;
    }

    this.applyTransform(ctx);

    // Nézetméret világkoordinátában
    const viewWidth = canvas.width / this.zoom;
    const viewHeight = canvas.height / this.zoom;
    const viewLeft = this.wx - this.sx / this.zoom;
    const viewTop = this.wy - this.sy / this.zoom;

    // Lefedjük az egész aktuális viewport világterületet
    ctx.fillRect(viewLeft, viewTop, viewWidth, viewHeight);
  }

  private updateMousePosition(event: MouseEvent) {
    const bounds = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse.x = event.clientX - bounds.left;
    this.mouse.y = event.clientY - bounds.top;
    this.mouse.rx = this.zoomedXInv(this.mouse.x);
    this.mouse.ry = this.zoomedYInv(this.mouse.y);
  }

  setImage(img: CanvasImageSource) {
    this.img = img;
    this.cachedPattern = undefined;

    const canvas = this.canvasRef.nativeElement;
    const image = img as HTMLImageElement;

    const scaleX = canvas.width / image.naturalWidth;
    const scaleY = canvas.height / image.naturalHeight;
    this.zoom = Math.min(scaleX, scaleY);

    this.wx = image.naturalWidth / 2;
    this.wy = image.naturalHeight / 2;

    this.sx = canvas.width / 2;
    this.sy = canvas.height / 2;

    this.draw();
  }

  private resizeCanvas(width: number, height: number) {
    const canvasElement = this.canvasRef.nativeElement;
    canvasElement.width = width;
    canvasElement.height = height;

    if (this.img) {
      // újraszámolja a scale-t és redraw
      this.setImage(this.img);
    }

    this.draw();
  }

  private resize() {
    if (this.calcSizeFunc) {
      const { width, height } = this.calcSizeFunc();
      this.resizeCanvas(width, height);
    } else {
      this.resizeCanvas(this.width ?? 100, this.height ?? 100);
    }
  }

  resetZoom() {
    const prevZoom: number = this.zoom;

    this.zoom = 1;

    this.onZoomChange.emit({
      prevZoom: prevZoom,
      currZoom: 1,
      factor: 0,
    });

    this.draw();
  }

  zoomStep(delta: number) {
    const prevZoom: number = this.zoom;
    const zoomFactor = delta < 0 ? 1.1 : 1 / 1.1;
    this.zoom = Math.max(0.1, Math.min(10, this.zoom * zoomFactor));

    this.onZoomChange.emit({
      prevZoom: prevZoom,
      currZoom: this.zoom,
      factor: zoomFactor,
    });

    this.draw();
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (this.disableMouseEvents) {
      return;
    }

    const canvas = this.canvasRef.nativeElement;
    const bounds = canvas.getBoundingClientRect();
    this.mouse.x = event.clientX - bounds.left;
    this.mouse.y = event.clientY - bounds.top;

    this.mouse.rx = this.zoomedXInv(this.mouse.x);
    this.mouse.ry = this.zoomedYInv(this.mouse.y);

    this.zoomStep(event.deltaY);

    this.wx = this.mouse.rx;
    this.wy = this.mouse.ry;
    this.sx = this.mouse.x;
    this.sy = this.mouse.y;

    this.mouse.rx = this.zoomedXInv(this.mouse.x);
    this.mouse.ry = this.zoomedYInv(this.mouse.y);

    event.preventDefault();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (this.disableMouseEvents) {
      return;
    }

    this.mouse.down = event.button === 2;

    if (event.button === 1) {
      this.resetZoom();
    }

    this.updateMousePosition(event);
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  onMouseUp() {
    if (this.disableMouseEvents) {
      return;
    }
    this.mouse.down = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.disableMouseEvents || !this.mouse.down) {
      return;
    }

    const lastRx = this.mouse.rx;
    const lastRy = this.mouse.ry;

    this.updateMousePosition(event);

    this.wx -= this.mouse.rx - lastRx;
    this.wy -= this.mouse.ry - lastRy;

    this.mouse.rx = this.zoomedXInv(this.mouse.x);
    this.mouse.ry = this.zoomedYInv(this.mouse.y);

    this.draw();
  }

  @HostListener('window:resize', ['$event'])
  onResize(_: Event): void {
    this.resize();
  }
}
