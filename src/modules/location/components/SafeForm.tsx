import React, {Fragment} from 'react';
import {BButton} from '../../../core/components';
import { theme } from '../../../core/style/theme';

export interface SafeFormProps {}

const SafeForm: React.SFC<SafeFormProps> = () => {
  return (
    <Fragment>
      <BButton
        value="Guardar"
        //icon="people"
        color="primary"
        onPress={() => console.log('Pressed')}
      />
    </Fragment>
  );
};

export default SafeForm;
