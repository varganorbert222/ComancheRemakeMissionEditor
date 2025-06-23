import { MenuItemType } from '../enums/menu-item-type.enum';

export default interface MenuItem {
  icon?: string;
  label?: string;
  tooltip?: string;
  shortcut?: string;
  type?: MenuItemType;
}
