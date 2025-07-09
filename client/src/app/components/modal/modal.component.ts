import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ModalData } from './interfaces/modal-data.interface';
import { ModalButton } from './interfaces/modal-button.interface';
import { NgComponentOutlet } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { LocIds } from '../../enums/loc-ids.enum';

@Component({
  selector: 'app-modal',
  imports: [
    MatDialogModule,
    NgComponentOutlet,
    ButtonComponent,
    TranslateModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  defaultButtons: ModalButton[] = [
    { icon: 'block', label: LocIds.Cancel, color: 'warn', closeOnClick: true },
    {
      icon: 'add_task',
      label: LocIds.Ok,
      color: 'primary',
      closeOnClick: true,
    },
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
