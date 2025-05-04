import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IMapCanvasData } from './interfaces/IMapCanvasData.interface';
import { RenderMode } from './enums/RenderMode.enum';

@Component({
  selector: 'app-map-canvas',
  imports: [MatProgressSpinnerModule],
  templateUrl: './map-canvas.component.html',
  styleUrl: './map-canvas.component.scss',
})
export class MapCanvasComponent implements OnInit {
  @Input() mapCanvasData?: IMapCanvasData; // URL of the color map image

  @ViewChild('id_canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private img = new Image();
  private offsetX = 0;
  private offsetY = 0;
  private scale = 1;
  private dragging = false;
  private lastMouseX = 0;
  private lastMouseY = 0;

  isLoading = true; // Simulate loading state
  renderMode = RenderMode.COLORMAP; // Default render mode

  constructor() {}

  onMapLoaded(): void {
    this.isLoading = false; // Set loading to false when the map is loaded
  }

  ngOnInit() {
    this.selectRenderMode(RenderMode.COLORMAP); // Set default render mode to ColorMap
    this.img.onload = (e: Event) => {
      this.initCanvas();
      this.isLoading = false;
    };
  }

  initCanvas() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
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
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    const pattern = this.ctx.createPattern(this.img, 'repeat')!;
    this.ctx.setTransform(
      this.scale,
      0,
      0,
      this.scale,
      this.offsetX,
      this.offsetY
    );
    this.ctx.fillStyle = pattern;
    this.ctx.fillRect(
      -canvas.width,
      -canvas.height,
      canvas.width * 3,
      canvas.height * 3
    );
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (event.button === 2) {
      // Jobb klikk
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
