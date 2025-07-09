import { MenuItemIds } from '../../../enums/menu-item-ids.enum';
import { PreferenceIds } from '../../../enums/preference-ids.enum';
import { SideMenuSectionIds } from '../../../enums/side-menu-section-ids.enum';
import { MenuItemType } from '../../../components/enums/menu-item-type.enum';
import { MenuItem } from '../../../components/interfaces/menu-item.interface';
import { SideMenuSection } from '../../../components/side-menu/interfaces/side-menu-section.interface';
import { LocIds } from '../../../enums/loc-ids.enum';

export const SideMenuSectionsData: SideMenuSection[] = [
  {
    title: LocIds.Mission,
    items: [
      {
        id: MenuItemIds.NewMission,
        icon: 'add_circle_outline',
        label: LocIds.NewMission,
        tooltip: LocIds.NewMissionTooltip,
        shortcut: 'Ctrl+N',
      },
      {
        id: MenuItemIds.FileOpen,
        icon: 'file_open',
        label: LocIds.FileOpen,
        tooltip: LocIds.FileOpenTooltip,
        shortcut: 'Ctrl+O',
      },
      {
        id: MenuItemIds.CloseMission,
        icon: 'close',
        label: LocIds.CloseMission,
        tooltip: LocIds.CloseMissionTooltip,
        shortcut: 'Ctrl+Q',
      },
      {
        id: MenuItemIds.SaveMission,
        icon: 'save',
        label: LocIds.SaveMission,
        tooltip: LocIds.SaveMissionTooltip,
        shortcut: 'Ctrl+S',
      },
      {
        id: MenuItemIds.ExportMission,
        icon: 'archive',
        label: LocIds.ExportMission,
        tooltip: LocIds.ExportMissionTooltip,
        shortcut: 'Ctrl+Shift+S',
      },
      { type: MenuItemType.Separator },
      {
        id: MenuItemIds.EditMission,
        icon: 'description',
        label: LocIds.EditMission,
        tooltip: LocIds.EditMissionTooltip,
        shortcut: 'Ctrl+E',
      },
      {
        id: MenuItemIds.ExportMissionData,
        icon: 'launch',
        label: LocIds.ExportMissionData,
        tooltip: LocIds.ExportMissionDataTooltip,
        shortcut: 'Ctrl+Alt+S',
      },
    ],
  },
  {
    title: LocIds.Object,
    items: [
      {
        icon: 'view_in_ar',
        label: LocIds.OpenObjectFile,
      },
      {
        icon: 'data_object',
        label: LocIds.SaveObjectFile,
      },
      {
        icon: 'arrow_circle_down',
        label: LocIds.SaveAsObjectFile,
      },
      {
        icon: 'category',
        label: LocIds.SelectBaseClass,
        tooltip: LocIds.SelectBaseClassTooltip,
        shortcut: 'Ctrl+Z',
      },
      { type: MenuItemType.Separator },
      {
        icon: 'delete',
        label: LocIds.ClearAllObjectsInstances,
      },
    ],
  },
  {
    title: LocIds.View,
    items: [
      {
        id: MenuItemIds.ZoomIn,
        icon: 'add',
        label: LocIds.ZoomIn,
        shortcut: '+',
      },
      {
        id: MenuItemIds.ZoomOut,
        icon: 'remove',
        label: LocIds.ZoomOut,
        shortcut: '-',
      },
      {
        id: MenuItemIds.Reset,
        icon: 'refresh',
        label: LocIds.Reset,
        shortcut: '*',
      },
      { type: MenuItemType.Separator },
      {
        id: MenuItemIds.RedrawScreen,
        icon: 'refresh',
        label: LocIds.RefreshScreen,
        tooltip: LocIds.RefreshScreenTooltip,
        shortcut: 'F5',
      },
    ],
  },
  {
    id: SideMenuSectionIds.Preferences,
    title: LocIds.Preferences,
    items: [
      {
        id: PreferenceIds.ShowAllObjects,
        preferenceId: PreferenceIds.ShowAllObjects,
        label: LocIds.ShowAllObjects,
        tooltip: LocIds.ShowAllObjectsTooltip,
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowStatic,
        preferenceId: PreferenceIds.ShowStatic,
        label: LocIds.ShowStatic,
        tooltip: LocIds.ShowStaticTooltip,
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowLandVehicles,
        preferenceId: PreferenceIds.ShowLandVehicles,
        label: LocIds.ShowLandVehicles,
        tooltip: LocIds.ShowLandVehiclesTooltip,
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowAircrafts,
        preferenceId: PreferenceIds.ShowAircrafts,
        label: LocIds.ShowAircrafts,
        tooltip: LocIds.ShowAircraftsTooltip,
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowGoals,
        preferenceId: PreferenceIds.ShowGoals,
        label: LocIds.ShowGoals,
        tooltip: LocIds.ShowGoalsTooltip,
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowWaypoints,
        preferenceId: PreferenceIds.ShowWaypoints,
        label: LocIds.ShowWaypoints,
        tooltip: LocIds.ShowWaypointsTooltip,
        type: MenuItemType.Toggle,
      },
      { type: MenuItemType.Separator },
      {
        id: PreferenceIds.ShowEntireWorld,
        preferenceId: PreferenceIds.ShowEntireWorld,
        label: LocIds.ShowEntireWorld,
        tooltip: LocIds.ShowEntireWorldTooltip,
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowCoordsInMeters,
        preferenceId: PreferenceIds.ShowCoordsInMeters,
        label: LocIds.ShowCoordsInMeters,
        tooltip: LocIds.ShowCoordsInMetersTooltip,
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowDistanceBar,
        preferenceId: PreferenceIds.ShowDistanceBar,
        label: LocIds.ShowDistanceBar,
        tooltip: LocIds.ShowDistanceBarTooltip,
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowTrueDirection,
        preferenceId: PreferenceIds.ShowTrueDirection,
        label: LocIds.ShowTrueDirection,
        tooltip: LocIds.ShowTrueDirectionTooltip,
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowZoomSpot,
        preferenceId: PreferenceIds.ShowZoomSpot,
        label: LocIds.ShowZoomSpot,
        tooltip: LocIds.ShowZoomSpotTooltip,
        type: MenuItemType.Toggle,
      },
    ] as MenuItem[],
  },
];
