import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient) {}

  getData<T>(url: string): Observable<ApiResponse<T>> {
    return this.http.get<T>(url, { observe: 'response' }).pipe(
      map((response: HttpResponse<T>) => ({
        data: response.body ?? null,
        status: response.status as HttpStatusCode,
      })),
      catchError((error: HttpErrorResponse) => {
        let message = 'Ismeretlen hiba történt.';

        if (error.status === 404) {
          message = 'Az erőforrás nem található.';
        } else if (error.status === 500) {
          message = 'Szerverhiba történt.';
        } else if (error.status === 0) {
          message = 'Nem sikerült kapcsolódni a szerverhez.';
        }

        return of({
          data: null,
          status: error.status as HttpStatusCode,
          errorMessage: message,
        } as ApiResponse<T>);
      })
    );
  }
}
