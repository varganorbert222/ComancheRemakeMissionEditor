import { MenuItemType } from '../enums/menu-item-type.enum';

export interface MenuItem {
  icon?: string;
  label?: string;
  tooltip?: string;
  shortcut?: string;
  type?: MenuItemType;
}
