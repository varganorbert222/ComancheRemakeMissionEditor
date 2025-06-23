import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cm-button',
  imports: [MatTooltipModule, MatIconModule],
  templateUrl: './cm-button.component.html',
  styleUrl: './cm-button.component.scss',
})
export default class CmButtonComponent {
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

  click(event: Event) {
    this.onClick.emit();
  }
}
