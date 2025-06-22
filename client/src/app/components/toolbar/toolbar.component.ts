import { Component } from '@angular/core';
import { ToolbarMenuData } from '../side-menu/data/menu-data.data';
import { CmButtonComponent } from '../cm-button/cm-button.component';
import { MenuItem } from '../interfaces/menu-item.interface';
import { MenuItemType } from '../enums/menu-item-type.enum';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-toolbar',
  imports: [
    CmButtonComponent,
    MatSlideToggleModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  MenuItemType = MenuItemType;

  title = 'Mission Editor';
  menuData = ToolbarMenuData;

  onToolbarButtonClick(menuItem: MenuItem) {
    console.log(menuItem);
  }
}
