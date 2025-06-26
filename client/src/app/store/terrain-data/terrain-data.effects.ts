import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { TerrainDataService } from '../../services/terrain-data/terrain-data.service';
import { TerrainDataActions } from './terrain-data.actions';
import { TerrainData } from '../../services/terrain-data/interfaces/terrain-data.interface';

@Injectable()
export class TerrainDataEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly terrainDataService: TerrainDataService
  ) {}

  loadTerrainData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TerrainDataActions.loadTerrainData),
      switchMap(() =>
        this.terrainDataService.getAll().pipe(
          map((terrainData) => {
            if (terrainData && terrainData.length > 0) {
              return TerrainDataActions.loadTerrainDataSuccess({
                data: terrainData as TerrainData[],
              });
            }

            return TerrainDataActions.loadTerrainDataFailure({
              error: 'A terepadatok betöltése sikertelen.',
            });
          })
        )
      )
    );
  });
}
