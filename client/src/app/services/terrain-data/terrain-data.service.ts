import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ITerrainData } from './interfaces/ITerrainData.interface';
import { TerrainType } from '../mission-data/enums/TerrainType.enum';
import { ITerrainDataDto } from './interfaces/ITerrainDataDto.interface';

@Injectable({
  providedIn: 'root',
})
export class TerrainDataService {
  private readonly terrainDataUrl: string = environment.terrainDataUrl;
  private readonly colorMapUrl: string = environment.colorMapUrl;
  private readonly heightMapUrl: string = environment.heightMapUrl;

  constructor(private http: HttpClient) {}

  getTerrainData(): Observable<ITerrainData[] | undefined> {
    return this.http.get<ITerrainDataDto[]>(this.terrainDataUrl).pipe(
      map((data) =>
        data.map((item) => ({
          terrainType: item.terrainCamo as TerrainType,
          colorMapUrl: `${this.colorMapUrl}/${item.colorMap}.png`,
          heightMapUrl: `${this.heightMapUrl}/${item.heightMap}.png`,
          terrainWidth: 1024,
          terrainHeight: 1024,
        }))
      )
    );
  }
}
