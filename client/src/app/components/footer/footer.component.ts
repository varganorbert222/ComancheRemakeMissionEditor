import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ThemeMode } from '../../enums/theme-mode.enum';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnChanges {
  @Input() themeMode: ThemeMode = ThemeMode.Light;
  @Output() onThemeModeChanged = new EventEmitter<ThemeMode>();

  now: number = new Date().getFullYear();
  title: string = 'Comanche Remake Mission Editor';
  owner: string = 'varganorbert222';

  nextThemeMode$: BehaviorSubject<ThemeMode> = new BehaviorSubject<ThemeMode>(
    ThemeMode.Dark
  );

  private getNextThemeMode(mode: ThemeMode) {
    return {
      [ThemeMode.Light]: ThemeMode.Dark,
      [ThemeMode.Dark]: ThemeMode.Light,
    }[mode];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.themeMode = changes['themeMode'].currentValue as ThemeMode;
    this.onThemeModeChanged.emit(this.themeMode);
    this.nextThemeMode$.next(this.getNextThemeMode(this.themeMode));
  }

  onThemeModeClick() {
    this.themeMode = this.getNextThemeMode(this.themeMode);
    this.onThemeModeChanged.emit(this.themeMode);
    this.nextThemeMode$.next(this.getNextThemeMode(this.themeMode));
  }
}
