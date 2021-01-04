import { FuczoncuiFucbarverSync } from './FuczoncuiFucbarverSync';
import {FUBUBIVIV} from './../../../types/FUBUBIVIV';
import {FnbnucvivSync} from './FnbnucvivSync';
import {StatusSync} from './StatusSync';
import {AssociationSync} from './AssociationSync';
export class FububivivSync {
  statusSync?: StatusSync;
  id: string;
  localId: string;
  codigo: string;
  coordenadaX: string;
  coordenadaY: string;
  direccion: string;
  numNucleos: string;
  origenData?: string;
  usuarioData?: string;
  fvbencueSync: AssociationSync;
  fuczoncuiFucbarverSync: FuczoncuiFucbarverSync;
  fnbnucvivSync: FnbnucvivSync[];
  constructor(
    id: string = '',
    localId: string,
    codigo: string,
    coordenadaX: string,
    coordenadaY: string,
    direccion: string,
    numNucleos: string,
    origenData: string = '',
    usuarioData: string = '',
    fvbencue: AssociationSync,
    fuczoncuiFucbarver: FuczoncuiFucbarverSync,
  ) {
    this.id = id;
    this.localId = localId;
    this.codigo = codigo;
    this.coordenadaX = coordenadaX;
    this.coordenadaY = coordenadaY;
    this.direccion = direccion;
    this.numNucleos = numNucleos;
    this.origenData = origenData;
    this.usuarioData = usuarioData;
    this.fvbencueSync = fvbencue;
    this.fuczoncuiFucbarverSync = fuczoncuiFucbarver;
    this.fnbnucvivSync = [];
  }
  static fromModel(data: FUBUBIVIV): FububivivSync {
    return new FububivivSync(
      data.WEB_ID,
      data.ID.toString(),
      data.CODIGO,
      data.COORDENADA_X,
      data.COORDENADA_Y,
      data.DIRECCION,
      '0',
      data.ORIGEN_DATA,
      data.USUARIO_DATA,
      new AssociationSync(data.FVBENCUES_ID?.toString()),
      new FuczoncuiFucbarverSync(data.FUCZONCUI_FUCBARVER_ID?.toString()),
    );
  }
}
