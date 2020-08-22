import * as React from 'react';
import {View} from 'react-native';
import {LoginForm} from '../components';
import {BHeader} from '../../../core/components';

export default () => {
  return (
    <View>
      <BHeader>Ficha Familiar</BHeader>
      <LoginForm />
    </View>
  );
};
