import {AssociationSync} from './AssociationSync';
export class FnbinfsalFncconsalSync {
  id?: string;
  seleccion: string;
  fncconsalSync: AssociationSync;
  fncelesalSync: AssociationSync;
  constructor(
    id: string = '',
    seleccion: string,
    fncconsalSync: AssociationSync,
    fncelesalSync: AssociationSync,
  ) {
    this.seleccion = seleccion;
    this.id = id;
    this.fncconsalSync = fncconsalSync;
    this.fncelesalSync = fncelesalSync;
  }
}
