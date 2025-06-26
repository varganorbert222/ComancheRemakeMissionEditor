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

  constructor() {}

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.resize();
  }

  draw() {
    this.ctx.fillRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
  }

  setFillStyle(fillStyle: string | CanvasGradient | CanvasPattern) {
    this.ctx.fillStyle = fillStyle;
  }

  setImage(img: CanvasImageSource) {
    this.setFillStyle(this.ctx.createPattern(img, 'repeat') as CanvasPattern);
  }

  private resizeCanvas(width: number, height: number) {
    const canvasElement = this.canvas.nativeElement;

    canvasElement.width = width;
    canvasElement.height = height;

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
