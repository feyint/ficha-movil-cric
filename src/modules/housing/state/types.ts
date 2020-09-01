export type HousingQuestion = {
  ID: number;
  CODIGO: string;
  NOMBRE: string;
  ESTADO: number;
  OPTIONS: HousingQuestionOption[];
};
export type HousingQuestionOption = {
  ID: number;
  CODIGO: string;
  NOMBRE: string;
  FVCELEVIV_ID: number;
};

export type MultiSelectSchema = {
  name: string;
  id: number;
  children: {name: string; id: number}[];
};
