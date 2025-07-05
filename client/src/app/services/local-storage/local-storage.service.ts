import { Injectable } from '@angular/core';
import { ToasterService } from '../toaster/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private readonly toaster: ToasterService) {}

  setItem<T>(key: string, value: T): boolean {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      this.toaster.show('A beállítások mentése sikeresen megtörtént.');
    } catch (e) {
      console.warn('Hiba a mentés során:', e);
      this.toaster.show('Hiba történt a beállítások mentése során.');
      return false;
    }
    return true;
  }

  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        this.toaster.show('A beállítások betöltése sikeresen megtörtént.');
        return JSON.parse(item) as T;
      }
      return null;
    } catch (e) {
      console.warn('Nem sikerült beolvasni:', e);
      this.toaster.show('A beállítások betöltése sikertelen.');
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
