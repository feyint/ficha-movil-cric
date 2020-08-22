import * as React from 'react';
import {Fragment} from 'react';
import {View} from 'react-native';
import {BTextInput} from '../../../../core/components';

export interface DepartmentProps {}

const Department: React.SFC<DepartmentProps> = () => {
  return (
    <Fragment>
      <View>
        <Fragment>
          <BTextInput
            type="text"
            name="Department"
            placeholder="Departamento"
          />
        </Fragment>
      </View>
    </Fragment>
  );
};

export default Department;
