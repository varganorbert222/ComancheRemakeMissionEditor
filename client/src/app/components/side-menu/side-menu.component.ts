import { Component } from '@angular/core';
import { SideMenuSection } from './interfaces/side-menu-section.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SideMenuItem } from './interfaces/side-menu-item.interface';
import { SideMenuSectionsData } from './data/menu-data.data';
import { SideMenuItemType } from './enums/side-menu-item-type.enum';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-side-menu',
  imports: [
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatSlideToggleModule,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  SideMenuItemType = SideMenuItemType; // Expose the enum to the template

  menuSections: SideMenuSection[] = SideMenuSectionsData;
  isSidebarOpen = true;

  onMenuSectionButtonClick(button: SideMenuItem): void {
    console.log(button.label);
  }
}
