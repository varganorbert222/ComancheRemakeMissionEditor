import {
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
import { LocIds } from '../../enums/loc-ids.enum';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, TranslateModule, MatSelectModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnChanges {
  @Input() themeMode: ThemeMode = ThemeMode.Light;
  @Output() onThemeModeChanged = new EventEmitter<ThemeMode>();

  LocIds = LocIds;
  now: number = new Date().getFullYear();

  nextThemeMode$: BehaviorSubject<ThemeMode> = new BehaviorSubject<ThemeMode>(
    ThemeMode.Dark
  );

  langSelectData = {
    value: this.translate.getBrowserLang(),
    values: this.translate.getLangs(),
  };

  constructor(private readonly translate: TranslateService) {}

  private getNextThemeMode(mode: ThemeMode) {
    return {
      [ThemeMode.Light]: ThemeMode.Dark,
      [ThemeMode.Dark]: ThemeMode.Light,
    }[mode];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.themeMode = changes['themeMode'].currentValue as ThemeMode;
    this.nextThemeMode$.next(this.getNextThemeMode(this.themeMode));
  }

  onThemeModeClick() {
    this.themeMode = this.getNextThemeMode(this.themeMode);
    this.onThemeModeChanged.emit(this.themeMode);
    this.nextThemeMode$.next(this.getNextThemeMode(this.themeMode));
  }

  onLangSelectChange(event: MatSelectChange<string>) {
    this.translate.use(event.value);
  }
}
