export interface FNCSALREP {
  ID?: number;
  FNCPERSON_ID: number;
  EDAD_PRIMERA_REGLA?: number;
  GRAVIDEZ?: number;
  PARIDEZ?: number;
  ABORTO?: number;
  CESAREA?: number;
  NACIDOS_VIVOS?: number;
  NACIDOS_MUERTOS?: number;
  PARTO_ULTIMO?: Date;
  ULTIMA_REGLA?: Date;
  PARTO_ESTIMADO?: Date;
  EDAD_GESTACION?: string;
  PRESENCIA_FAM?: number;
  SEROLOGIA?: number;
  VIH?: number;
  RESUL_CITOLOGIA?: string;
  ACCION_CITOLOGIA?: number;
  RESUL_PROSTATA?: string;
  ACCION_PROSTATA?: number;
  ESTADO?: number;
}
