export type PersonQuestion = {
  ID: number;
  CODIGO: string;
  NOMBRE: string;
  ESTADO: number;
  OPTIONS: PersonQuestionOption[];
};
export type PersonQuestionOption = {
  ID: number;
  CODIGO: string;
  NOMBRE: string;
  FNCELESAL_ID: number;
};
export type ConditionPersonQuestion = {
  ID: number;
  CODIGO: string;
  NOMBRE: string;
  ESTADO: number;
  OPTIONS: ConditionPersonQuestionOption[];
};
export type ConditionPersonQuestionOption = {
  ID: number;
  CODIGO: string;
  NOMBRE: string;
  FNCELEPER_ID: number;
};
export type SexAndRepHealthPersonQuestion = {
  ID: number;
  CODIGO: string;
  NOMBRE: string;
  ESTADO: number;
  OPTIONS: SexAndRepHealthPersonQuestionOption[];
};
export type SexAndRepHealthPersonQuestionOption = {
  ID: number;
  CODIGO: string;
  NOMBRE: string;
  FNCELEPER_ID: number;
};
