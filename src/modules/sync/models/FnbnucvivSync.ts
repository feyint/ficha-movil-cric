import {FnbnucvivFncpersonSync} from './FnbnucvivFncpersonSync';
import {FnbnucvivFvcconvivSync} from './FnbnucvivFvcconvivSync';
import {StatusSync} from './StatusSync';
import {AssociationSync} from './AssociationSync';
import {FNBNUCVIV} from '../../../types';
export class FnbnucvivSync {
  statusSync?: StatusSync;
  id?: string;
  localId: string;
  accesoInternet: string;
  animalNovacunado: string;
  animalVacunado: string;
  cocinaDentro: string;
  codigo: string;
  humoDentro: string;
  observacion: string;
  residuoBor: string;
  residuoPeligroso: string;
  riesgo: string;
  origenData: string;
  usuarioData: string;
  fechaActividad: string;
  fechaCreacion: string;
  fvbencueSync: AssociationSync;
  fnbnucvivFvcconvivSync: FnbnucvivFvcconvivSync[];
  fnbnucvivFncpersonSync: FnbnucvivFncpersonSync[];
  constructor(
    id: string = '',
    localId: string = '',
    accesoInternet: string = '',
    animalNovacunado: string = '',
    animalVacunado: string = '',
    cocinaDentro: string = '',
    codigo: string = '',
    humoDentro: string = '',
    observacion: string = '',
    residuoBor: string = '',
    residuoPeligroso: string = '',
    riesgo: string = '',
    origenData: string = '',
    usuarioData: string = '',
    fechaActividad: string = '',
    fechaCreacion: string = '',
    fvbencueSync: AssociationSync,
  ) {
    this.id = id;
    this.localId = localId;
    this.accesoInternet = accesoInternet;
    this.animalNovacunado = animalNovacunado;
    this.animalVacunado = animalVacunado;
    this.cocinaDentro = cocinaDentro;
    this.codigo = codigo;
    this.humoDentro = humoDentro;
    this.observacion = observacion;
    this.residuoBor = residuoBor;
    this.residuoPeligroso = residuoPeligroso;
    this.riesgo = riesgo;
    this.origenData = origenData;
    this.usuarioData = usuarioData;
    this.fechaActividad = fechaActividad;
    this.fechaCreacion = fechaCreacion;
    this.fvbencueSync = fvbencueSync;
    this.fnbnucvivFvcconvivSync = [];
    this.fnbnucvivFncpersonSync = [];
  }

  static fromModel(data: FNBNUCVIV): FnbnucvivSync {
    return new FnbnucvivSync(
      data.WEB_ID,
      data.ID?.toString(),
      data.ACCESO_INTERNET + "",
      data.ANIMAL_NOVACUNADO + "",
      data.ANIMAL_VACUNADO +"",
      data.LUGAR_COCINA,
      data.CODIGO,
      data.HUMO_DENTRO,
      data.OBSERVACION,
      data.RESIDUO_BOR,
      data.RESIDUO_PELIGROSO,
      data.RIESGO + "",
      data.ORIGEN_DATA,
      data.USUARIO_DATA,
      '',
      '',
      new AssociationSync(),
    );
  }
}
