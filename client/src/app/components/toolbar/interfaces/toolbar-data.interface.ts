import { MenuItem } from '../../interfaces/menu-item.interface';

export interface ToolbarData {
  items: MenuItem[];
  values: Record<string, any>;
}
