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
export default class FooterComponent {
  @Output() onThemeModeChanged = new EventEmitter<ThemeMode>();

  now: number = new Date().getFullYear();
  title: string = 'Comanche Remake Mission Editor';
  owner: string = 'varganorbert222';
  themeMode: ThemeMode = ThemeMode.LIGHT;
  nextThemeMode$: BehaviorSubject<ThemeMode> = new BehaviorSubject<ThemeMode>(
    ThemeMode.DARK
  );

  onThemeModeClick(event: Event) {
    if (this.themeMode === ThemeMode.LIGHT) {
      this.themeMode = ThemeMode.DARK;
      this.nextThemeMode$.next(ThemeMode.LIGHT);
    } else {
      this.themeMode = ThemeMode.LIGHT;
      this.nextThemeMode$.next(ThemeMode.DARK);
    }
    this.onThemeModeChanged.emit(this.themeMode);
  }
}
