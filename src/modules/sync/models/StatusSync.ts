import {StatusErrorSync} from './StatusErrorSync';
export interface StatusSync {
  code: string;
  description: string;
  statusError: StatusErrorSync[];
}
