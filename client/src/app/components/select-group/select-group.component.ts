import { Component, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { InputGroupData } from '../radio-group/interfaces/input-group-data.interface';

@Component({
  selector: 'app-select-group',
  imports: [MatSelectModule, FormsModule],
  templateUrl: './select-group.component.html',
  styleUrl: './select-group.component.scss',
})
export class SelectGroupComponent {
  @Input() inputGroupData!: InputGroupData;
}
