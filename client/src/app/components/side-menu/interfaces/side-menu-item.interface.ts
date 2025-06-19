import { SideMenuItemType } from '../enums/side-menu-item-type.enum';

export interface SideMenuItem {
  icon?: string;
  label?: string;
  tooltip?: string;
  shortcut?: string;
  type?: SideMenuItemType;
}
