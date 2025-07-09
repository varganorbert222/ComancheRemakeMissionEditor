export interface ModalButton {
  icon?: string;
  label: string;
  action?: () => void;
  color?: 'primary' | 'accent' | 'warn';
  closeOnClick?: boolean;
}
