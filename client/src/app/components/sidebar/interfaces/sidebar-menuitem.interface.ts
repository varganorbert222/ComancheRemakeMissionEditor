import { ISidebarMenuItemButton } from './sidebar-menuitem-button.interface';

export interface ISidebarMenuSection {
  title?: string;
  buttons?: ISidebarMenuItemButton[];
}
