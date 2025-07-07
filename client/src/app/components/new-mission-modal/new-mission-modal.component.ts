import { Component } from '@angular/core';
import { InputGroupData } from '../radio-group/interfaces/input-group-data.interface';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { MatInputModule } from '@angular/material/input';
import { SelectGroupComponent } from '../select-group/select-group.component';

@Component({
  selector: 'app-new-mission-modal',
  imports: [RadioGroupComponent, MatInputModule, SelectGroupComponent],
  templateUrl: './new-mission-modal.component.html',
  styleUrl: './new-mission-modal.component.scss',
})
export class NewMissionModalComponent {
  mapTypeData: InputGroupData = {
    id: 'terrain-type',
    label: 'Terrain Type',
    data: [
      { value: 'green-cropland', name: 'Green Cropland' },
      { value: 'green-isle', name: 'Green Isle' },
      { value: 'green-hills', name: 'Green Hills' },
      { value: 'snow-mountains', name: 'Snow Mountains' },
      { value: 'snow-isle', name: 'Snow Isle' },
      { value: 'desert-dunes', name: 'Desert Dunes' },
      { value: 'desert-plateau', name: 'Desert Plateau' },
      { value: 'guantanamo-bay', name: 'Guantanamo Bay' },
    ],
    value: '',
  };

  realisticLoadoutData: InputGroupData = {
    id: 'realistic-loadout',
    label: 'Realistic Loadout',
    data: [
      { value: 'yes', name: 'Yes' },
      { value: 'no', name: 'No' },
    ],
    value: 'yes',
  };

  efamsData: InputGroupData = {
    id: 'efams',
    label: 'EFAMS',
    data: [
      { value: 'yes', name: 'Yes' },
      { value: 'no', name: 'No' },
    ],
    value: 'no',
  };
}
