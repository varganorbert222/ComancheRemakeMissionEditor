import { SideMenuSection } from './side-menu-section.interface';

export interface SideMenuData {
  sections: SideMenuSection[];
  values: Record<string, any>;
}
