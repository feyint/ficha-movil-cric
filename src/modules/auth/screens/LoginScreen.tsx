import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {LoginForm} from '../components';
import {BHeader} from '../../../core/components';
export default () => {
  return (
    <View style={styles.container}>
      <BHeader>Ficha Familiar</BHeader>
      <LoginForm />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7F7",
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
})
