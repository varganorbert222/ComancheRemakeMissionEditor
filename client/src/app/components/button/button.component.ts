import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LocIds } from '../../enums/loc-ids.enum';

@Component({
  selector: 'app-button',
  imports: [NgTemplateOutlet, MatTooltipModule, MatIconModule, MatButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @HostBinding('class.button') isButton = true;
  @Input() icon?: string;
  @Input() label?: string;
  @Input() shortcut?: string;
  @Input() tooltip?: string;
  @Input() width: string = 'auto';
  @Input() height: string = 'auto';
  @Input() minWidth: string = 'auto';
  @Input() minHeight: string = 'auto';
  @Input() isMini: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() color?: string;
  @Output() onClick = new EventEmitter<void>();

  LocIds = LocIds;

  click(event: Event) {
    this.onClick.emit();
  }
}
