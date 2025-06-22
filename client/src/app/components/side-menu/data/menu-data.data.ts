import { MenuItemType } from '../../enums/menu-item-type.enum';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { SideMenuSection } from '../interfaces/side-menu-section.interface';

export const SideMenuSectionsData: SideMenuSection[] = [
  {
    title: 'Mission',
    items: [
      {
        icon: 'add_circle_outline',
        label: 'New',
        tooltip: 'Create a new mission',
        shortcut: 'Ctrl+N',
      },
      {
        icon: 'file_open',
        label: 'Open',
        tooltip: 'Open an existing mission',
        shortcut: 'Ctrl+O',
      },
      {
        icon: 'close',
        label: 'Close',
        tooltip: 'Close mission',
        shortcut: 'Ctrl+Q',
      },
      {
        icon: 'save',
        label: 'Save',
        tooltip: 'Save mission',
        shortcut: 'Ctrl+S',
      },
      {
        icon: 'archive',
        label: 'Save as',
        tooltip: 'Save mission to a disk',
        shortcut: 'Ctrl+Shift+S',
      },
      {
        type: MenuItemType.SEPARATOR,
      },
      {
        icon: 'description',
        label: 'Edit mission',
        tooltip: 'Edit mission parameters',
        shortcut: 'Ctrl+E',
      },
      {
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
        type: MenuItemType.SEPARATOR,
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
        type: MenuItemType.SEPARATOR,
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
    title: 'Preferences',
    items: [
      {
        icon: '',
        label: 'Show all objects',
        tooltip: 'Display all kinds of objects',
        shortcut: '',
        type: MenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show static',
        tooltip: 'Show only buildings and non-moving targets',
        shortcut: '',
        type: MenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show land vehicles',
        tooltip: 'Show ground vehicles only',
        shortcut: '',
        type: MenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show aircrafts',
        tooltip: 'Display fixed-wing aircrafts on the map',
        shortcut: '',
        type: MenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show goals',
        tooltip: 'Display of objectives required to complete the mission',
        shortcut: '',
        type: MenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show waypoints',
        tooltip: 'Displaying player and AI routes',
        shortcut: '',
        type: MenuItemType.TOGGLE,
      },
      {
        type: MenuItemType.SEPARATOR,
      },
      {
        icon: '',
        label: 'Show entire world',
        tooltip: 'Show the entire playing area',
        shortcut: '',
        type: MenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show coords in meters',
        tooltip: 'The cursor coordinates are shown in meters',
        shortcut: '',
        type: MenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show distance bar',
        tooltip: 'We show the reference distance with a measuring bar',
        shortcut: '',
        type: MenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show true direction',
        tooltip: 'Displaying the orientation of objects',
        shortcut: '',
        type: MenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show zoom spot',
        tooltip:
          'Display of the currently visible map detail from the entire playing field',
        shortcut: '',
        type: MenuItemType.TOGGLE,
      },
    ],
  },
];

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
    type: MenuItemType.SEPARATOR,
  },
  {
    label: 'Toggle depth map',
    type: MenuItemType.TOGGLE,
    tooltip: 'The editor shows the colormap or heightmap of the map',
  },
];
