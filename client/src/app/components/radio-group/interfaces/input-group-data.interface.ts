export interface InputGroupData {
  id: string;
  label?: string;
  data?: {
    value: any;
    name: string;
    disabled?: boolean;
  }[];
  value: any;
  disabled?: boolean;
}
