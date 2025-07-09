import { Injectable } from '@angular/core';
import { SideMenuSection } from '../../components/side-menu/interfaces/side-menu-section.interface';
import { MenuItem } from '../../components/interfaces/menu-item.interface';
import { SideMenuSectionsData } from './data/menu-data.data';
import { ToolbarMenuData } from './data/toolbar-data.data';
import { MenuItemType } from '../../components/enums/menu-item-type.enum';

@Injectable({
  providedIn: 'root',
})
export class MenuDataService {
  constructor() {}

  private translateItem(item: MenuItem) {
    if (item.type === MenuItemType.Separator) {
      return item;
    }
    if (!item.label) {
      console.warn('The menu item does not have a label.', item);
    }
    if (!item.tooltip) {
      console.warn('The menu item does not have a tooltip.', item);
    }

    return item;
  }

  getMenuData(): SideMenuSection[] {
    return (
      SideMenuSectionsData.map((x) => {
        if (!x.title) {
          console.warn('The menu section does not have a title.', x);
        }

        return {
          ...x,
          items: x.items?.map((y) => this.translateItem(y)),
        };
      }) ?? []
    );
  }

  getToolbarData(): MenuItem[] {
    return (
      ToolbarMenuData.map((x) => {
        return this.translateItem(x);
      }) ?? []
    );
  }
}
