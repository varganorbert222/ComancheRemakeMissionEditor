import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ITerrainData } from './interfaces/ITerrainData.interface';
import { TerrainType } from '../mission-data/enums/TerrainType.enum';
import { ITerrainDataDto } from './ITerrainDataDto.interface';

@Injectable({
  providedIn: 'root',
})
export class TerrainDataService {
  private readonly terrainDataUrl: string = environment.terrainDataUrl;
  private readonly colorMapUrl: string = environment.colorMapUrl;
  private readonly heightMapUrl: string = environment.heightMapUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ITerrainData[]> {
    return this.http.get<ITerrainDataDto[]>(this.terrainDataUrl).pipe(
      map(
        (data) =>
          data.map((terrainDataDto) => ({
            terrainType: terrainDataDto.terrainCamo as TerrainType,
            colorMapUrl: `${this.colorMapUrl}/${terrainDataDto.colorMap}.png`,
            heightMapUrl: `${this.heightMapUrl}/${terrainDataDto.heightMap}.png`,
            terrainWidth: 1024,
            terrainHeight: 1024,
          })) || []
      )
    );
  }
}
