import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-pan-zoom-canvas',
  templateUrl: './pan-zoom-canvas.component.html',
  styleUrls: ['./pan-zoom-canvas.component.scss'],
})
export class PanZoomCanvasComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() width?: number;
  @Input() height?: number;
  @Input() calcSizeFunc?: () => { width: number; height: number };

  private img!: CanvasImageSource;
  private ctx!: CanvasRenderingContext2D;
  private scale: number = 1;
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

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.resize();
  }

  private zoomedXInv(screenX: number): number {
    return (screenX - this.sx) / this.scale + this.wx;
  }

  private zoomedYInv(screenY: number): number {
    return (screenY - this.sy) / this.scale + this.wy;
  }

  draw(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    if (!this.img) return;
    const img = this.img as HTMLImageElement;

    const pattern = ctx.createPattern(img, 'repeat');
    if (!pattern) return;
    ctx.fillStyle = pattern;

    // Transzformációs mátrix alkalmazása
    const dx = this.sx - this.scale * this.wx;
    const dy = this.sy - this.scale * this.wy;
    ctx.setTransform(this.scale, 0, 0, this.scale, dx, dy);

    // Nézetméret világkoordinátában
    const viewWidth = canvas.width / this.scale;
    const viewHeight = canvas.height / this.scale;
    const viewLeft = this.wx - this.sx / this.scale;
    const viewTop = this.wy - this.sy / this.scale;

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

    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    const image = img as HTMLImageElement;

    // 1. Kiszámoljuk a skálát, hogy a kép pontosan kitöltse a canvas-t
    const scaleX = canvas.width / image.naturalWidth;
    const scaleY = canvas.height / image.naturalHeight;
    this.scale = Math.min(scaleX, scaleY); // arányosan kitölt

    // 2. A kép világközéppontját állítjuk középre
    this.wx = image.naturalWidth / 2;
    this.wy = image.naturalHeight / 2;

    // 3. A képernyő középpont a canvas közepe legyen
    this.sx = canvas.width / 2;
    this.sy = canvas.height / 2;

    // 4. Frissítjük a mintázatot
    const canvasPattern = ctx.createPattern(image, 'repeat');
    if (canvasPattern) ctx.fillStyle = canvasPattern;

    this.draw();
  }

  private resizeCanvas(width: number, height: number) {
    const canvasElement = this.canvasRef.nativeElement;

    canvasElement.width = width;
    canvasElement.height = height;

    if (this.img) {
      this.setImage(this.img);
    }

    this.draw();
  }

  private resize() {
    if (this.calcSizeFunc) {
      const { width, height } = this.calcSizeFunc();
      this.resizeCanvas(width, height);
      return;
    }
    this.resizeCanvas(this.width ?? 100, this.height ?? 100);
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    const canvas = this.canvasRef.nativeElement;
    const bounds = canvas.getBoundingClientRect();

    this.mouse.x = event.clientX - bounds.left;
    this.mouse.y = event.clientY - bounds.top;

    // Frissítjük az aktuális világkoordinátákat
    this.mouse.rx = this.zoomedXInv(this.mouse.x);
    this.mouse.ry = this.zoomedYInv(this.mouse.y);

    // Zoom logika
    const zoomFactor = event.deltaY < 0 ? 1.1 : 1 / 1.1;
    const newScale = this.scale * zoomFactor;
    this.scale = Math.max(0.1, Math.min(10, newScale));

    this.wx = this.mouse.rx;
    this.wy = this.mouse.ry;
    this.sx = this.mouse.x;
    this.sy = this.mouse.y;

    this.mouse.rx = this.zoomedXInv(this.mouse.x);
    this.mouse.ry = this.zoomedYInv(this.mouse.y);

    this.draw();
    event.preventDefault();
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.mouse.down = true;
    this.updateMousePosition(event);
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  onMouseUp() {
    this.mouse.down = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.mouse.down) return;

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
  onResize(event: Event): void {
    this.resize();
  }
}
