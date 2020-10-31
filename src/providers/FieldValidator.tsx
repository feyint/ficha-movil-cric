const required = (yup: any, field: string) => {
  return yup.mixed().required(`${field} requerido`);
};
export default {required};
