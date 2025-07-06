export interface ModalButton {
  label: string;
  action?: () => void;
  color?: 'primary' | 'accent' | 'warn';
  closeOnClick?: boolean;
}
