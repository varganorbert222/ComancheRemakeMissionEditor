import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalData } from './interfaces/modal-data.interface';
import { ModalButton } from './interfaces/modal-button.interface';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [MatDialogModule, NgComponentOutlet],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  defaultButtons: ModalButton[] = [
    { label: 'Mégsem', color: 'warn', closeOnClick: true },
    { label: 'OK', color: 'primary', closeOnClick: true },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: ModalData,
    private readonly dialogRef: MatDialogRef<ModalComponent>
  ) {}

  onButtonClick(button: ModalButton) {
    if (button.action) button.action();
    if (button.closeOnClick !== false) this.dialogRef.close();
  }
}
