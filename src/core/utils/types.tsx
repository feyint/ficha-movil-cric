export type MultiSelectSchema = {
  name: string;
  id: number;
  children: {name: string; id: number, item: any}[];
};

export type SelectSchema = {
  name: string;
  id: number;
  children: {label: string; value: string; item: any}[];
};
