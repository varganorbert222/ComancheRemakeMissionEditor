import { Component } from '@angular/core';
import { SidebarMenuSection } from './interfaces/sidebar-menuitem.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SidebarMenuItemButton } from './interfaces/sidebar-menuitem-button.interface';
import { MenuData } from './data/menu-data.data';

@Component({
  selector: 'app-sidebar',
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuSections: SidebarMenuSection[] = MenuData;
  isSidebarOpen = true;

  onMenuSectionButtonClick(button: SidebarMenuItemButton): void {
    console.log(button.label);
  }
}
