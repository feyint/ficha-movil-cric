export type MultiSelectSchema = {
  name: string;
  id: number;
  children: {name: string; id: number}[];
};
