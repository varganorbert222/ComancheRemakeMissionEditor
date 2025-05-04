import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from, of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { TerrainDataService } from '../../services/terrain-data/terrain-data.service';
import { IAppDataState } from '../../interfaces/IAppDataState.interface';
import { Store } from '@ngrx/store';
import {
  loadTerrainData,
  loadTerrainDataFailure,
  loadTerrainDataSuccess,
} from './terrain-data.actions';

@Injectable()
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IAppDataState>,
    private terrainDataService: TerrainDataService
  ) {}

  loadTerrainData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTerrainData),
      switchMap(() =>
        this.terrainDataService.getAll().pipe(
          map((data) => loadTerrainDataSuccess({ data: data })),
          catchError((error) => of(loadTerrainDataFailure({ error })))
        )
      )
    );
  });
}
