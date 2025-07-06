import { ModalButton } from './modal-button.interface';

export interface ModalData {
  title?: string;
  contentComponent: any;
  data?: any;
  buttons?: ModalButton[];
}
