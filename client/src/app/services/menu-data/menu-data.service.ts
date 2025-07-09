import { Injectable } from '@angular/core';
import { SideMenuSection } from '../../components/side-menu/interfaces/side-menu-section.interface';
import { MenuItem } from '../../components/interfaces/menu-item.interface';
import { SideMenuSectionsData } from './data/menu-data.data';
import { ToolbarMenuData } from './data/toolbar-data.data';
import { TranslateService } from '@ngx-translate/core';
import { LocIds } from '../../enums/loc-ids.enum';

@Injectable({
  providedIn: 'root',
})
export class MenuDataService {
  constructor(private readonly translate: TranslateService) {}

  getMenuData(): SideMenuSection[] {
    return (
      SideMenuSectionsData.map((x) => {
        return {
          ...x,
          title: this.translate.instant(x.title ?? LocIds.Unknown),
          items:
            x.items?.map((y) => {
              return {
                ...y,
                label: this.translate.instant(y.label ?? LocIds.Unknown),
                tooltip: this.translate.instant(y.tooltip ?? LocIds.Unknown),
              } as MenuItem;
            }) ?? [],
        } as SideMenuSection;
      }) ?? []
    );
  }

  getToolbarData(): MenuItem[] {
    return (
      ToolbarMenuData.map((x) => {
        if (!x.label) {
          console.warn('The menu item does not have a label.', x);
        }
        if (!x.tooltip) {
          console.warn('The menu item does not have a tooltip.', x);
        }
        return {
          ...x,
          label: this.translate.instant(x.label ?? LocIds.Unknown),
          tooltip: this.translate.instant(x.tooltip ?? LocIds.Unknown),
        } as MenuItem;
      }) ?? []
    );
  }
}
