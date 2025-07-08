import { MenuItemIds } from '../../../enums/menu-item-ids.enum';
import { MenuItemType } from '../../../components/enums/menu-item-type.enum';
import { MenuItem } from '../../../components/interfaces/menu-item.interface';
import { LocIds } from '../../../enums/loc-ids.enum';

export const ToolbarMenuData: MenuItem[] = [
  {
    icon: 'refresh',
    label: LocIds.RefreshScreen,
    tooltip: LocIds.RedrawsTheMapContentsOnScreen,
  },
  {
    icon: 'polyline',
    label: LocIds.WaypointManager,
    tooltip: LocIds.EditPlayerAndAIWaypoints,
  },
  {
    icon: 'air',
    label: LocIds.WindManager,
    tooltip: LocIds.EditWindPositionsDirectionsAndStrengths,
  },
  {
    type: MenuItemType.Separator,
  },
  {
    id: MenuItemIds.ToggleDepthMap,
    label: LocIds.ToggleDepthMap,
    type: MenuItemType.Toggle,
    tooltip: LocIds.TheEditorShowsTheColormapOrHeightmapOfTheMap,
  },
] as MenuItem[];
