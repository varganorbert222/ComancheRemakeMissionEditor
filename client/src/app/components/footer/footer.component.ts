import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeMode } from '../../enums/theme-mode.enum';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @Output() onThemeModeChanged = new EventEmitter<ThemeMode>();

  now: number = new Date().getFullYear();
  title: string = 'Comanche Remake Mission Editor';
  owner: string = 'varganorbert222';
  themeMode: ThemeMode = ThemeMode.Light;
  nextThemeMode$: BehaviorSubject<ThemeMode> = new BehaviorSubject<ThemeMode>(
    ThemeMode.Dark
  );

  onThemeModeClick(event: Event) {
    if (this.themeMode === ThemeMode.Light) {
      this.themeMode = ThemeMode.Dark;
      this.nextThemeMode$.next(ThemeMode.Light);
    } else {
      this.themeMode = ThemeMode.Light;
      this.nextThemeMode$.next(ThemeMode.Dark);
    }
    this.onThemeModeChanged.emit(this.themeMode);
  }
}
