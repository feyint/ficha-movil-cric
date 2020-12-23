import {FnbnucvivFncpersonSync} from './FnbnucvivFncpersonSync';
import {FnbnucvivFvcconvivSync} from './FnbnucvivFvcconvivSync';
import {StatusSync} from './StatusSync';
import {AssociationSync} from './AssociationSync';
export interface FnbnucvivSync {
  status?: StatusSync;
  id?: string;
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
  fvbencue: AssociationSync;
  fnbnucvivFvcconviv: FnbnucvivFvcconvivSync[];
  fnbnucvivFncperson: FnbnucvivFncpersonSync[];
}
