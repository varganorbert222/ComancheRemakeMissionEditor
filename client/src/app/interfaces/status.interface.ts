import { StatusEnum } from './status.enum';

export interface Status {
  status: StatusEnum;
  errorMessage?: string;
}
