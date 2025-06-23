import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import TerrainData from './interfaces/terrain-data.interface';
import { TerrainType } from '../mission-data/enums/terrain-type.enum';
import TerrainDataDto from './interfaces/terrain-data-dto.interface';

@Injectable({
  providedIn: 'root',
})
export default class TerrainDataService {
  private readonly terrainDataUrl: string = environment.terrainDataUrl;
  private readonly colorMapUrl: string = environment.colorMapUrl;
  private readonly heightMapUrl: string = environment.heightMapUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TerrainData[]> {
    return this.http.get<TerrainDataDto[]>(this.terrainDataUrl).pipe(
      map(
        (data) =>
          data.map((terrainDataDto) => ({
            terrainType: terrainDataDto.terrainCamo as TerrainType,
            name: terrainDataDto.colorMap.replace('_C', ''),
            colorMapUrl: `${this.colorMapUrl}/${terrainDataDto.colorMap}.png`,
            heightMapUrl: `${this.heightMapUrl}/${terrainDataDto.heightMap}.png`,
            terrainWidth: 1024,
            terrainHeight: 1024,
          })) || []
      )
    );
  }
}
