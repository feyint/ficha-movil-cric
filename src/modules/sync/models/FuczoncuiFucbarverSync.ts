import {AssociationSync} from './AssociationSync';
export class FuczoncuiFucbarverSync {
  id: string;
  fucbarverSync: AssociationSync;
  fuczoncuiSync: AssociationSync;
  constructor(
    id: string = '',
    fucbarverSync: AssociationSync = new AssociationSync(),
    fuczoncuiSync: AssociationSync = new AssociationSync(),
  ) {
    this.id = id;
    this.fucbarverSync = fucbarverSync;
    this.fuczoncuiSync = fuczoncuiSync;
  }
}
