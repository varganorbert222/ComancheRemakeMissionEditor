import { PreferenceIds } from '../../enums/preference-ids.enum';
import { MenuItemType } from '../enums/menu-item-type.enum';

export interface MenuItem {
  id?: PreferenceIds;
  icon?: string;
  label?: string;
  tooltip?: string;
  shortcut?: string;
  type?: MenuItemType;
}
