import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { MenuItem } from '../interfaces/menu-item.interface';
import { MenuItemType } from '../enums/menu-item-type.enum';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolbarData } from './interfaces/toolbar-data.interface';
import { TranslateModule } from '@ngx-translate/core';
import { LocIds } from '../../enums/loc-ids.enum';

@Component({
  selector: 'app-toolbar',
  imports: [
    ButtonComponent,
    MatSlideToggleModule,
    MatDividerModule,
    MatTooltipModule,
    TranslateModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  @Input() toolbarData?: ToolbarData | null | undefined;
  @Output() onToolbarButtonClick = new EventEmitter<{
    item: MenuItem;
  }>();
  @Output() onToolbarToggleChange = new EventEmitter<{
    checked: boolean;
    item: MenuItem;
  }>();

  LocIds = LocIds;
  MenuItemType = MenuItemType;

  onButtonClick(item: MenuItem) {
    this.onToolbarButtonClick.emit({ item: item });
  }

  onToggleChange(e: MatSlideToggleChange, item: MenuItem) {
    this.onToolbarToggleChange.emit({ checked: e.checked, item: item });
  }
}
