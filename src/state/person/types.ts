
export type FNBINFSAL = {
  ID: number;
  PESO: number;
  TALLA: number;
  TA_SISTOLICA: number;
  TA_DIASTOLICA: number;
  USO_PROTESIS: number;
  TIEMPO_PROTESIS: number;
  ULTIMA_VISITA: Date;
  FECHA_MUERTE: Date;
  DEFUNCION: string;
  FECHA_ACTIVIDAD: Date;
  USUARIO_DATA: string;
  FECHA_CREACION: Date;
  ORIGEN_DATA: string;
};
export type FNBINFSAL_FNCCONSAL = {
  ID?: number;
  FNCCONSAL_ID: number;
  FNBINFSAL_ID: number;
  FNCELESAL_ID: number;
  SYNCSTATE: number;
};
