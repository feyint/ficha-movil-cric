export default function Required() {
  const rule = {
    required: {
      value: true,
      message: '{FieldName} es obligatorio',
    },
  };
  return rule;
}
