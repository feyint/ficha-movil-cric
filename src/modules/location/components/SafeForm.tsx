import React, {Fragment} from 'react';
import {BButton} from '../../../core/components';

export interface SafeFormProps {}

const SafeForm: React.SFC<SafeFormProps> = () => {
  return (
    <Fragment>
      <BButton
        value="Guardar"
        //icon="people"
        onPress={() => console.log('Pressed')}
      />
    </Fragment>
  );
};

export default SafeForm;
