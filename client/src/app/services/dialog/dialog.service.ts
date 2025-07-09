import { Injectable } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { ModalData } from '../../components/modal/interfaces/modal-data.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private readonly dialog: MatDialog) {}

  open(modalData: ModalData) {
    this.dialog.open(ModalComponent, {
      data: modalData,
    });
  }
}
