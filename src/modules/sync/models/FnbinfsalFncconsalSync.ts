import {AssociationSync} from './AssociationSync';
export class FnbinfsalFncconsalSync {
  id?: string;
  seleccion: string;
  fncconsal: AssociationSync;
  fncelesal: AssociationSync;
  constructor(
    id: string = '',
    seleccion: string,
    fncconsal: AssociationSync,
    fncelesal: AssociationSync,
  ) {
    this.seleccion = seleccion;
    this.id = id;
    this.fncconsal = fncconsal;
    this.fncelesal = fncelesal;
  }
}
