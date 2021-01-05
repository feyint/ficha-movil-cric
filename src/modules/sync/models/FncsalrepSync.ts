import {FncsalrepFncconrepSync} from './FncsalrepFncconrepSync';
export interface FncsalrepSync {
  id?: string;
  edadPrimeraRegla: string;
  gravidez: string;
  paridez: string;
  aborto: string;
  cesarea: string;
  nacidosVivos: string;
  nacidosMuertos: string;
  partoUltimo: string;
  ultimaRegla: string;
  edadGestacion: string;
  partoEstimado: string;
  presenciaFam: string;
  serologia: string;
  vih: string;
  resulCitologia: string;
  accionCitologia: string;
  resulProstata: string;
  accionProstata: string;
  usuarioData: string;
  origenData: string;
  fncsalrepFncconrepSync: FncsalrepFncconrepSync[];
}
