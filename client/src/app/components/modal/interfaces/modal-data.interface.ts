import { ModalButton } from './modal-button.interface';

export interface ModalData {
  title?: string;
  component: any;
  data?: any;
  buttons?: ModalButton[];
}
