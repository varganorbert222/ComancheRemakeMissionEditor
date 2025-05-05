import { SidebarMenuSection } from '../interfaces/sidebar-menuitem.interface';

export const MenuData: SidebarMenuSection[] = [
  {
    title: 'File',
    buttons: [
      {
        icon: 'file_open',
        label: 'Open mission file',
        tooltip: 'Open an existing mission file',
      },
      {
        icon: 'save',
        label: 'Save mission file',
        tooltip: 'Save mission file',
      },
    ],
  },
  {
    title: 'Mission',
    buttons: [
      {
        icon: 'landscape',
        label: 'Mission map',
        tooltip: 'Select the landscape for the mission',
      },
      {
        icon: 'description',
        label: 'Mission details',
        tooltip: 'Mission details description',
      },
      {
        icon: 'partly_cloudy_day',
        label: 'Mission weather',
        tooltip: 'Mission weather factors',
      },
      {
        icon: 'route',
        label: 'Mission waypoints',
        tooltip: 'Navigation routes and waypoints',
      },
    ],
  },
  {
    title: 'Objects',
    buttons: [
      {
        icon: 'helicopter',
        label: 'Helicopters',
        tooltip: 'Available helicopters',
      },
      {
        icon: 'flight',
        label: 'Airplanes',
        tooltip: 'Available airplanes',
      },
      {
        icon: 'local_shipping',
        label: 'Ground vehicles',
        tooltip: 'Available ground vehicles',
      },
      {
        icon: 'sailing',
        label: 'Ships',
        tooltip: 'Available ships',
      },
      {
        icon: 'temple_hindu',
        label: 'Turrets',
        tooltip: 'Available turrets',
      },
      {
        icon: 'apartment',
        label: 'Structures',
        tooltip: 'Available structures',
      },
    ],
  },
];
