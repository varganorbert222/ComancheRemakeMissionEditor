import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { saveAs } from 'file-saver';
import ExportResult from './interfaces/export-result.interface';
import Mission from '../../interfaces/mission.interface';

@Injectable({
  providedIn: 'root',
})
export default class MissionExportService {
  constructor() {}

  exportMission(mission: Mission): Observable<ExportResult> {
    try {
      let blobIsSupported = !!new Blob();

      const data = {
        mapName: mission.mapName,
        time: mission.time,
        missionName: mission.missionName,
        windDirection: mission.windDirection,
        objects: mission.objects.map((obj: any) => ({
          id: obj.id,
          type: obj.type,
          position: obj.position,
          rotation: obj.rotation,
        })),
      };

      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });

      saveAs(blob, 'mission.mis');

      return of({
        success: true,
        message: 'Mission exported successfully.',
      });
    } catch (error: any) {
      console.error('Blob is not supported in this browser.', error);

      return of({
        success: false,
        message: 'Mission export failed.',
      });
    }
  }
}
