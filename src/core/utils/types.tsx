export type MultiSelectSchema = {
  name: string;
  id: number;
  children: { name: string; id: number }[];
};

export type SelectSchema = {
  name: string;
  id: number;
  children: { label: string; value: string }[];
};
