import React, {useEffect} from 'react';
import {View, StyleSheet, PermissionsAndroid} from 'react-native';
import {LoginForm} from '../components';
import {BHeader} from '../../../core/components';
export default () => {
  useEffect(() => {
    requestLocationPermission();
  }, []);
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permisos de ubicación ',
          message: 'debes permitir el acceso a la ubicación',
          buttonPositive: 'Permitir',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  return (
    <View style={styles.container}>
      <BHeader>Ficha Familiar</BHeader>
      <LoginForm />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});
