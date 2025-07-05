import { MenuItemIds } from '../../../enums/menu-item-ids.enum';
import { MenuItemType } from '../../enums/menu-item-type.enum';
import { MenuItem } from '../../interfaces/menu-item.interface';

export const ToolbarMenuData: MenuItem[] = [
  {
    icon: 'refresh',
    label: 'Refresh screen',
    tooltip: 'Redraws the map contents on screen',
  },
  {
    icon: 'polyline',
    label: 'Waypoint manager',
    tooltip: 'Edit Player and AI waypoints',
  },
  {
    icon: 'air',
    label: 'Wind manager',
    tooltip: 'Edit wind positions, directions and strengths',
  },
  {
    type: MenuItemType.Separator,
  },
  {
    id: MenuItemIds.ToggleDepthMap,
    label: 'Toggle depth map',
    type: MenuItemType.Toggle,
    tooltip: 'The editor shows the colormap or heightmap of the map',
  },
] as MenuItem[];
