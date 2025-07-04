import { SideMenuSectionIds } from '../../../enums/side-menu-section-ids.enum';
import { MenuItem } from '../../interfaces/menu-item.interface';

export interface SideMenuSection {
  id?: SideMenuSectionIds;
  title?: string;
  items?: MenuItem[];
}
