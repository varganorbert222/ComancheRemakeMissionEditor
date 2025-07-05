import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MenuItemType } from '../enums/menu-item-type.enum';
import { MenuItem } from '../interfaces/menu-item.interface';
import { CmButtonComponent } from '../cm-button/cm-button.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SideMenuData } from './interfaces/side-menu-data.interface';

@Component({
  selector: 'app-side-menu',
  imports: [
    MatDividerModule,
    MatSlideToggleModule,
    MatExpansionModule,
    CmButtonComponent,
    MatTooltipModule,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  MenuItemType = MenuItemType;

  @Input() sideMenuData?: SideMenuData | undefined | null;
  @Output() onMenuItemButtonClick = new EventEmitter<{
    item: MenuItem;
  }>();
  @Output() onMenuItemToggleChange = new EventEmitter<{
    checked: boolean;
    item: MenuItem;
  }>();

  isSidebarOpen = true;

  onToggleChange(e: MatSlideToggleChange, item: MenuItem): void {
    this.onMenuItemToggleChange.emit({ checked: e.checked, item: item });
  }

  onButtonClick(item: MenuItem): void {
    this.onMenuItemButtonClick.emit({ item: item });
  }
}
