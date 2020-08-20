import {useForm} from 'react-hook-form';

export default function Form(defaultValues: any) {
  const form = useForm({
    mode: 'onBlur',
    defaultValues,
  });

  return form;
}
