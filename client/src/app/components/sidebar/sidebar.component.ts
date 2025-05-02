import { Component } from '@angular/core';
import { ISidebarMenuSection } from './interfaces/sidebar-menuitem.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ISidebarMenuItemButton } from './interfaces/sidebar-menuitem-button.interface';
import { MenuData } from './data/menu-data.data';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuSections: ISidebarMenuSection[] = MenuData;
  isSidebarOpen = true;

  onMenuSectionButtonClick(button: ISidebarMenuItemButton): void {
    console.log(button.label);
  }
}
