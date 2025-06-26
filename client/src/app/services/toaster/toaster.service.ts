import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private snackBar = inject(MatSnackBar);

  constructor() {}

  show(
    message: string = 'Example message',
    action: string = 'Ok',
    duration: number = 5000
  ): Observable<MatSnackBarDismiss> {
    return this.snackBar
      .open(message, action, {
        duration: duration,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      })
      .afterDismissed();
  }
}
