import React, {Fragment} from 'react';
import {View} from 'react-native';
import {BTextInput} from '../../../core/components';

export interface CareZoneProps {}

const CareZone: React.SFC<CareZoneProps> = () => {
  return (
    <Fragment>
      <View>
        <Fragment>
          <BTextInput
            type="text"
            name="CareZone"
            placeholder="Zona de cuidado"
          />
        </Fragment>
      </View>
    </Fragment>
  );
};

export default CareZone;
