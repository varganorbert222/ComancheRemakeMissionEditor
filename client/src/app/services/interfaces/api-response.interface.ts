import { HttpStatusCode } from '@angular/common/http';

export interface ApiResponse<T> {
  data: T | null;
  status: HttpStatusCode;
  errorMessage?: string;
}
