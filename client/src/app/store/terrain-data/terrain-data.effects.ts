import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import TerrainDataService from '../../services/terrain-data/terrain-data.service';
import TerrainDataActions from './terrain-data.actions';

@Injectable()
export default class TerrainDataEffects {
  constructor(
    private actions$: Actions,
    private terrainDataService: TerrainDataService
  ) {}

  loadTerrainData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TerrainDataActions.loadTerrainData),
      switchMap(() =>
        this.terrainDataService.getAll().pipe(
          map((data) => {
            console.log(data);
            return TerrainDataActions.loadTerrainDataSuccess({ data: data });
          }),
          catchError((error) => {
            console.log(error);
            return of(TerrainDataActions.loadTerrainDataFailure({ error }));
          })
        )
      )
    );
  });
}
