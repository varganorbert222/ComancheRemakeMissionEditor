import { Injectable } from '@angular/core';
import { SideMenuSection } from '../../components/side-menu/interfaces/side-menu-section.interface';
import { MenuItem } from '../../components/interfaces/menu-item.interface';
import { SideMenuSectionsData } from './data/menu-data.data';
import { ToolbarMenuData } from './data/toolbar-data.data';

@Injectable({
  providedIn: 'root',
})
export class MenuDataService {
  constructor() {}

  getMenuData(): SideMenuSection[] {
    return SideMenuSectionsData;
  }

  getToolbarData(): MenuItem[] {
    return ToolbarMenuData.map(
      (x) =>
        ({
          ...x,
          label: '', // TODO: fordítás
        } as MenuItem)
    );
  }
}
