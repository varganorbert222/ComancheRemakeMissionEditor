import { Injectable } from '@angular/core';
import { ToasterService } from '../toaster/toaster.service';
import { LocIds } from '../../enums/loc-ids.enum';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(
    private readonly toaster: ToasterService,
    private readonly translate: TranslateService
  ) {}

  setItem<T>(key: string, value: T): boolean {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      this.toaster.show(
        this.translate.instant(LocIds.SettingsWereSavedSuccessfully)
      );
    } catch (e) {
      console.warn('Error during save to storage:', e);
      this.toaster.show(
        this.translate.instant(LocIds.AnErrorOccurredWhileSavingTheSettings)
      );
      return false;
    }
    return true;
  }

  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        this.toaster.show(
          this.translate.instant(LocIds.SettingsWereSavedSuccessfully)
        );
        return JSON.parse(item) as T;
      }
      return null;
    } catch (e) {
      console.warn('Error during read from storage:', e);
      this.toaster.show(this.translate.instant(LocIds.FailedToLoadSettings));
      return null;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  hasKey(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
