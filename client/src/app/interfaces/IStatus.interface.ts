import { Status as Status } from '../components/map-canvas/enums/Status.enum';

export interface IStatus {
  status: Status;
  errorMessage?: string;
}
