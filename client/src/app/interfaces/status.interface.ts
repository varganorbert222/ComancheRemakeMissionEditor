import { StatusEnum } from './status.enum';

export default interface Status {
  status: StatusEnum;
  errorMessage?: string;
}
