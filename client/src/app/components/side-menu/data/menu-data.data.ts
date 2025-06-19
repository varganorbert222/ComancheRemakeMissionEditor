import { SideMenuItemType } from '../enums/side-menu-item-type.enum';
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
        type: SideMenuItemType.SEPARATOR,
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
        type: SideMenuItemType.SEPARATOR,
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
        type: SideMenuItemType.SEPARATOR,
      },
      {
        icon: 'refresh',
        label: 'Redraw screen',
        tooltip: '',
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
        tooltip: '',
        shortcut: '',
        type: SideMenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show static',
        tooltip: '',
        shortcut: '',
        type: SideMenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show land vehicles',
        tooltip: '',
        shortcut: '',
        type: SideMenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show aircrafts',
        tooltip: '',
        shortcut: '',
        type: SideMenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show goals',
        tooltip: '',
        shortcut: '',
        type: SideMenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show waypoints',
        tooltip: '',
        shortcut: '',
        type: SideMenuItemType.TOGGLE,
      },
      {
        type: SideMenuItemType.SEPARATOR,
      },
      {
        icon: '',
        label: 'Show entire world',
        tooltip: '',
        shortcut: '',
        type: SideMenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show coords in meters',
        tooltip: '',
        shortcut: '',
        type: SideMenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show distance bar',
        tooltip: '',
        shortcut: '',
        type: SideMenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show true direction',
        tooltip: '',
        shortcut: '',
        type: SideMenuItemType.TOGGLE,
      },
      {
        icon: '',
        label: 'Show zoom spot',
        tooltip: '',
        shortcut: '',
        type: SideMenuItemType.TOGGLE,
      },
    ],
  },
];
