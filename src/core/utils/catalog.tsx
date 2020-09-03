export const getCatalog = (catalogs: any[], codigo: string) => {
  const result = [] as any;
  catalogs.forEach((element) => {
    if (element.CODIGO === codigo) {
      result.push({value: element.ID, label: element.NOMBRE});
    }
  });
  return result;
};
