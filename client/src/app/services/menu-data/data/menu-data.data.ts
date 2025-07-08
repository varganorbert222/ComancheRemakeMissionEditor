import { MenuItemIds } from '../../../enums/menu-item-ids.enum';
import { PreferenceIds } from '../../../enums/preference-ids.enum';
import { SideMenuSectionIds } from '../../../enums/side-menu-section-ids.enum';
import { MenuItemType } from '../../../components/enums/menu-item-type.enum';
import { MenuItem } from '../../../components/interfaces/menu-item.interface';
import { SideMenuSection } from '../../../components/side-menu/interfaces/side-menu-section.interface';

export const SideMenuSectionsData: SideMenuSection[] = [
  {
    title: 'Mission',
    items: [
      {
        id: MenuItemIds.NewMission,
        icon: 'add_circle_outline',
        label: 'New',
        tooltip: 'Create a new mission',
        shortcut: 'Ctrl+N',
      },
      {
        id: MenuItemIds.FileOpen,
        icon: 'file_open',
        label: 'Open',
        tooltip: 'Open an existing mission',
        shortcut: 'Ctrl+O',
      },
      {
        id: MenuItemIds.CloseMission,
        icon: 'close',
        label: 'Close',
        tooltip: 'Close mission',
        shortcut: 'Ctrl+Q',
      },
      {
        id: MenuItemIds.SaveMission,
        icon: 'save',
        label: 'Save',
        tooltip: 'Save mission',
        shortcut: 'Ctrl+S',
      },
      {
        id: MenuItemIds.ExportMission,
        icon: 'archive',
        label: 'Save as',
        tooltip: 'Save mission to a disk',
        shortcut: 'Ctrl+Shift+S',
      },
      {
        type: MenuItemType.Separator,
      },
      {
        id: MenuItemIds.EditMission,
        icon: 'description',
        label: 'Edit mission',
        tooltip: 'Edit mission parameters',
        shortcut: 'Ctrl+E',
      },
      {
        id: MenuItemIds.ExportMissionData,
        icon: 'launch',
        label: 'Export data',
        tooltip: 'Export mission data to game',
        shortcut: 'Ctrl+Alt+S',
      },
    ],
  },
  {
    title: 'Object',
    items: [
      {
        icon: 'view_in_ar',
        label: 'Open object file',
        tooltip: '',
        shortcut: '',
      },
      {
        icon: 'data_object',
        label: 'Save object file',
        tooltip: '',
        shortcut: '',
      },
      {
        icon: 'arrow_circle_down',
        label: 'Save as object file',
        tooltip: '',
        shortcut: '',
      },
      {
        icon: 'category',
        label: 'Select base class',
        tooltip: '',
        shortcut: 'Ctrl+Z',
      },
      {
        type: MenuItemType.Separator,
      },
      {
        icon: 'delete',
        label: 'Clear all objects instances',
        tooltip: '',
        shortcut: '',
      },
    ],
  },
  {
    title: 'View',
    items: [
      {
        icon: 'add',
        label: 'Zoom in',
        tooltip: '',
        shortcut: '+',
      },
      {
        icon: 'remove',
        label: 'Zoom out',
        tooltip: '',
        shortcut: '-',
      },
      {
        type: MenuItemType.Separator,
      },
      {
        icon: 'refresh',
        label: 'Refresh screen',
        tooltip: 'Redraws the map contents on screen',
        shortcut: 'F5',
      },
    ],
  },
  {
    id: SideMenuSectionIds.Preferences,
    title: 'Preferences',
    items: [
      {
        id: PreferenceIds.ShowAllObjects,
        preferenceId: PreferenceIds.ShowAllObjects,
        icon: '',
        label: 'Show all objects',
        tooltip: 'Display all kinds of objects',
        shortcut: '',
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowStatic,
        preferenceId: PreferenceIds.ShowStatic,
        icon: '',
        label: 'Show static',
        tooltip: 'Show only buildings and non-moving targets',
        shortcut: '',
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowLandVehicles,
        preferenceId: PreferenceIds.ShowLandVehicles,
        icon: '',
        label: 'Show land vehicles',
        tooltip: 'Show ground vehicles only',
        shortcut: '',
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowAircrafts,
        preferenceId: PreferenceIds.ShowAircrafts,
        icon: '',
        label: 'Show aircrafts',
        tooltip: 'Display fixed-wing aircrafts on the map',
        shortcut: '',
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowGoals,
        preferenceId: PreferenceIds.ShowGoals,
        icon: '',
        label: 'Show goals',
        tooltip: 'Display of objectives required to complete the mission',
        shortcut: '',
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowWaypoints,
        preferenceId: PreferenceIds.ShowWaypoints,
        icon: '',
        label: 'Show waypoints',
        tooltip: 'Displaying player and AI routes',
        shortcut: '',
        type: MenuItemType.Toggle,
      },
      {
        type: MenuItemType.Separator,
      },
      {
        id: PreferenceIds.ShowEntireWorld,
        preferenceId: PreferenceIds.ShowEntireWorld,
        icon: '',
        label: 'Show entire world',
        tooltip: 'Show the entire playing area',
        shortcut: '',
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowCoordsInMeters,
        preferenceId: PreferenceIds.ShowCoordsInMeters,
        icon: '',
        label: 'Show coords in meters',
        tooltip: 'The cursor coordinates are shown in meters',
        shortcut: '',
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowDistanceBar,
        preferenceId: PreferenceIds.ShowDistanceBar,
        icon: '',
        label: 'Show distance bar',
        tooltip: 'We show the reference distance with a measuring bar',
        shortcut: '',
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowTrueDirection,
        preferenceId: PreferenceIds.ShowTrueDirection,
        icon: '',
        label: 'Show true direction',
        tooltip: 'Displaying the orientation of objects',
        shortcut: '',
        type: MenuItemType.Toggle,
      },
      {
        id: PreferenceIds.ShowZoomSpot,
        preferenceId: PreferenceIds.ShowZoomSpot,
        icon: '',
        label: 'Show zoom spot',
        tooltip:
          'Display of the currently visible map detail from the entire playing field',
        shortcut: '',
        type: MenuItemType.Toggle,
      },
    ] as MenuItem,
  },
] as SideMenuSection[];
