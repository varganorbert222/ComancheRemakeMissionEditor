import { Component, Input } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { InputGroupData } from './interfaces/input-group-data.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-group',
  imports: [MatRadioModule, FormsModule],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss',
})
export class RadioGroupComponent {
  @Input() inputGroupData!: InputGroupData;
}
