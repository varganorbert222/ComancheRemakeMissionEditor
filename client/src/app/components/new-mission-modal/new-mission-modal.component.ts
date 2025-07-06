import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-new-mission-modal',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatRadioModule,
  ],
  templateUrl: './new-mission-modal.component.html',
  styleUrl: './new-mission-modal.component.scss',
})
export class NewMissionModalComponent {
  mapTypeData = [
    { value: 'green-cropland', viewValue: 'Green Cropland' },
    { value: 'green-isle', viewValue: 'Green Isle' },
    { value: 'green-hills', viewValue: 'Green Hills' },
    { value: 'snow-mountains', viewValue: 'Snow Mountains' },
    { value: 'snow-isle', viewValue: 'Snow Isle' },
    { value: 'desert-dunes', viewValue: 'Desert Dunes' },
    { value: 'desert-plateau', viewValue: 'Desert Plateau' },
    { value: 'guantanamo-bay', viewValue: 'Guantanamo Bay' },
  ];

  realisticLoadoutData = {
    selected: 'yes',
    values: [
      { value: 'yes', viewValue: 'Yes' },
      { value: 'no', viewValue: 'No' },
    ],
  };
}
