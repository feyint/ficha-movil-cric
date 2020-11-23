export interface FNCPERSON {
  ID?: number;
  CODIGO?: number;
  IDENTIFICACION: string;
  PRIMER_NOMBRE: string;
  SEGUNDO_NOMBRE: string;
  PRIMER_APELLIDO: string;
  SEGUNDO_APELLIDO: string;
  FECHA_NACIMIENTO: Date;
  TEL_CELULAR?: string;
  TEL_ALTERNO?: string;
  CORREO_ELECTRONICO?: string;
  FECHA_ACTIVIDAD?: Date;
  USUARIO_DATA?: string;
  FECHA_CREACION?: Date;
  ORIGEN_DATA?: string;
  FNCTIPIDE_ID: number;
  FNCORGANI_ID?: number;
  FNCLUNIND_ID?: number;
  FNCOCUPAC_ID?: number;
  FUCMUNICI_ID?: number;
  FNCPAREN_ID?: number;
  FNCGENERO_ID?: number;
  FNCPUEIND_ID?: number;
  FVBENCUES_ID?: number;
}
