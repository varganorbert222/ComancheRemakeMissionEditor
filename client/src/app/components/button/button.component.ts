import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { LocIds } from '../../enums/loc-ids.enum';

@Component({
  selector: 'app-button',
  imports: [MatTooltipModule, MatIconModule, TranslateModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @HostBinding('class.cm-button') isButton = true;
  @Input() icon?: string;
  @Input() label?: string;
  @Input() shortcut?: string;
  @Input() tooltip?: string;
  @Input() width?: string = 'auto';
  @Input() height?: string = 'auto';
  @Input() isMini?: boolean = false;
  @Input() isDisabled?: boolean = false;
  @Output() onClick = new EventEmitter<void>();

  LocIds = LocIds;

  click(event: Event) {
    this.onClick.emit();
  }
}
