import { Component } from '@angular/core';
import { SideMenuSection } from './interfaces/side-menu-section.interface';
import { SideMenuSectionsData } from './data/menu-data.data';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MenuItemType } from '../enums/menu-item-type.enum';
import MenuItem from '../interfaces/menu-item.interface';
import CmButtonComponent from '../cm-button/cm-button.component';
import { MatTooltipModule } from '@angular/material/tooltip';

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

  menuSections: SideMenuSection[] = SideMenuSectionsData;
  isSidebarOpen = true;

  onMenuSectionButtonClick(item: MenuItem): void {
    console.log(item);
  }
}
