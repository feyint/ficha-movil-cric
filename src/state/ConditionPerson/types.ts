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
export type FNCPERSON = {
  ID: number;
  CODIGO: number;
  IDENTIFICACION: number;
  PRIMER_NOMBRE: string;
  SEGUNDO_NOMBRE: string;
  PRIMER_APELLIDO: string;
  SEGUNDO_APELLIDO: string;
  FECHA_NACIMIENTO: Date;
  EDAD: number;
  EDAD_VISITA: number;
  TEL_CELULAR: number;
  TEL_ALTERNO: number;
  CORREO_ELECTRONICO: string;
  FECHA_ACTIVIDAD: Date;
  USUARIO_DATA: string;
  FECHA_CREACION: Date;
  ORIGEN_DATA: string;
};
export type FNCPERSON_FNCCONPER = {
  ID?: number;
  FNCPERSON_ID: number;
  FNCCONPER_ID: number;
  FNCELEPER_ID: number;
  SYNCSTATE: number;
};
