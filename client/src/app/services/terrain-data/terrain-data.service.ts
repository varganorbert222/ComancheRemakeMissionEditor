import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TerrainData } from './interfaces/terrain-data.interface';
import { TerrainType } from '../mission-data/enums/terrain-type.enum';
import { TerrainDataDto } from './interfaces/terrain-data-dto.interface';
import { DataService } from '../data-service/data-service.service';
import { ToasterService } from '../toaster/toaster.service';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TerrainDataService {
  private readonly terrainDataUrl: string = environment.terrainDataUrl;
  private readonly colorMapUrl: string = environment.colorMapUrl;
  private readonly heightMapUrl: string = environment.heightMapUrl;

  constructor(
    private readonly dataService: DataService,
    private readonly toaster: ToasterService
  ) {}

  getAll(): Observable<TerrainData[]> {
    return this.dataService.getData<TerrainDataDto[]>(this.terrainDataUrl).pipe(
      map((response) => {
        if (response.status !== HttpStatusCode.Ok) {
          this.toaster
            .show(`${response.status}: ${response.errorMessage}`)
            .subscribe(() => {
              this.toaster.show('A terepadatok betöltése sikertelen.');
            });
          return [];
        }

        const data = response.data ?? [];

        return data.map(
          (terrainDataDto) =>
            ({
              terrainType: terrainDataDto.terrainCamo as TerrainType,
              name: terrainDataDto.colorMap.replace('_C', ''),
              colorMapUrl: `${this.colorMapUrl}/${terrainDataDto.colorMap}.png`,
              heightMapUrl: `${this.heightMapUrl}/${terrainDataDto.heightMap}.png`,
              terrainWidth: 1024,
              terrainHeight: 1024,
            } as TerrainData)
        );
      })
    );
  }
}
