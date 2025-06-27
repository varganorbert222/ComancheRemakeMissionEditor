import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-cm-canvas',
  imports: [],
  templateUrl: './cm-canvas.component.html',
  styleUrl: './cm-canvas.component.scss',
})
export class CmCanvasComponent implements AfterViewInit {
  @ViewChild('cmcanvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  @Input() width?: number;
  @Input() height?: number;
  @Input() calcSizeFunc?: () => { width: number; height: number };

  private ctx!: CanvasRenderingContext2D;
  private img!: CanvasImageSource;

  constructor() {}

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.resize();
  }

  draw(
    transform: {
      scale?: number;
      offsetX?: number;
      offsetY?: number;
    } = {}
  ) {
    const canvas = this.canvas.nativeElement;
    const ctx = this.ctx;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!this.img) return;

    const imgEl = this.img as HTMLImageElement;

    const scale = transform.scale ?? 1;
    const panX = transform.offsetX ?? 0;
    const panY = transform.offsetY ?? 0;

    const pattern = ctx.createPattern(this.img, 'repeat');
    if (!pattern) return;

    ctx.fillStyle = pattern;

    if (this.width && this.height) {
      const scaleX = this.width / imgEl.width;
      const scaleY = this.height / imgEl.height;
      const baseScale = Math.min(scaleX, scaleY) * scale;

      const offsetX = canvas.width / 2 + panX;
      const offsetY = canvas.height / 2 + panY;

      ctx.setTransform(baseScale, 0, 0, baseScale, offsetX, offsetY);

      const fillW = canvas.width / baseScale;
      const fillH = canvas.height / baseScale;

      ctx.fillRect(-offsetX / baseScale, -offsetY / baseScale, fillW, fillH);
    } else {
      const imgWidth2 = imgEl.width / 2;
      const imgHeight2 = imgEl.height / 2;

      const offsetX = canvas.width / 2 + imgWidth2 + panX;
      const offsetY = canvas.height / 2 + imgHeight2 + panY;

      ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);

      const fillW = canvas.width / scale;
      const fillH = canvas.height / scale;

      ctx.fillRect(-offsetX / scale, -offsetY / scale, fillW, fillH);
    }
  }

  setImage(img: CanvasImageSource) {
    this.img = img;

    const canvasPattern = this.ctx.createPattern(
      img,
      'repeat'
    ) as CanvasPattern;

    this.ctx.fillStyle = canvasPattern;
  }

  private resizeCanvas(width: number, height: number) {
    const canvasElement = this.canvas.nativeElement;

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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.resize();
  }
}
