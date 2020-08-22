import {Fragment} from 'react';
import {View} from 'react-native';
import React from 'react';
import BNumberInput from '../../../core/components/BNumberInput';

export interface FamiliarNucleusProps {}

const FamiliarNucleus: React.SFC<FamiliarNucleusProps> = () => {
  return (
    <Fragment>
      <View>
        <Fragment>
          <BNumberInput
            type="number"
            name="FamilyNucleus"
            placeholder="Numero de nucleos familiares"
          />
        </Fragment>
      </View>
    </Fragment>
  );
};

export default FamiliarNucleus;
