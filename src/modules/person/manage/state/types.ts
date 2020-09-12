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
