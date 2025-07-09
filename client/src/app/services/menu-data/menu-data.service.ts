import { Injectable } from '@angular/core';
import { SideMenuSection } from '../../components/side-menu/interfaces/side-menu-section.interface';
import { MenuItem } from '../../components/interfaces/menu-item.interface';
import { SideMenuSectionsData } from './data/menu-data.data';
import { ToolbarMenuData } from './data/toolbar-data.data';
import { TranslateService } from '@ngx-translate/core';
import { LocIds } from '../../enums/loc-ids.enum';
import { MenuItemType } from '../../components/enums/menu-item-type.enum';

@Injectable({
  providedIn: 'root',
})
export class MenuDataService {
  constructor(private readonly translate: TranslateService) {}

  private translateItem(item: MenuItem) {
    if (item.type === MenuItemType.Separator) {
      return item;
    }

    const label: string = item.label ?? LocIds.Unknown;
    const tooltip: string = item.tooltip ?? LocIds.Unknown;

    if (!item.label) {
      console.warn('The menu item does not have a label.', item);
    }
    if (!item.tooltip) {
      console.warn('The menu item does not have a tooltip.', item);
    }

    return {
      ...item,
      label: this.translate.instant(label),
      tooltip: this.translate.instant(tooltip),
    } as MenuItem;
  }

  getMenuData(): SideMenuSection[] {
    return (
      SideMenuSectionsData.map((x) => {
        const title: string = x.title ?? LocIds.Unknown;

        if (!x.title) {
          console.warn('The menu section does not have a title.', x);
        }

        return {
          ...x,
          title: this.translate.instant(title),
          items: x.items?.map((y) => this.translateItem(y)) ?? [],
        } as SideMenuSection;
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
