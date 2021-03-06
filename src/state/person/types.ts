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
  IDENTIFICACION: string;
  PRIMER_NOMBRE: string;
  SEGUNDO_NOMBRE: string;
  PRIMER_APELLIDO: string;
  SEGUNDO_APELLIDO: string;
  FECHA_NACIMIENTO: Date;
  TEL_CELULAR: string;
  TEL_ALTERNO: string;
  CORREO_ELECTRONICO: string;
  FECHA_ACTIVIDAD: Date;
  USUARIO_DATA: string;
  FECHA_CREACION: Date;
  ORIGEN_DATA: string;
  FNCTIPIDE_ID: number;
  FNCORGANI_ID: number;
  FNCLUNIND_ID: number;
  FNCOCUPAC_ID: number;
  FUCMUNICI_ID: number;
  FNCPAREN_ID: number;
  FNCGENERO_ID: number;
};
export type FNCPERSON_FNCCONPER = {
  ID?: number;
  FNCCONPER_ID: number;
  FNCPERSON_ID: number;
  FNCELEPER_ID: number;
  SYNCSTATE: number;
};
export type FNBNUCVIV_FNCPERSON = {
  ID?: number;
  FNBNUCVIV_ID: number;
  FNCPERSON_ID: number;
};
export type FNCGENERO = {
  ID: number;
  CODIGO: string;
  NOMBRE: string;
  COD_FF: string;
  ESTADO: number;
  USUARIO_DATA: string;
  FECHA_ACTIVIDAD: Date;
  FECHA_CREACION: Date;
  ORIGEN_DATA: string;
};
