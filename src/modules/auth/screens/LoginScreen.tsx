import React, {useEffect} from 'react';
import {View, StyleSheet, Image, PermissionsAndroid} from 'react-native';
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
    <View>
      <View style={styles.header}>
        <View style={styles.c}>
          <BHeader>Ficha Familiar</BHeader>
        </View>
        <View>
          <Image
            style={styles.image}
            source={require('../../../core/assets/logoCRIC.png')}
          />
        </View>
        <View style={styles.mid}></View>
      </View>
      <View style={styles.boddy}>
        <LoginForm />
      </View>
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
  header: {
    top: 0,
    width: '100%',
    backgroundColor: '#009788',
    position: 'absolute',
    //height: '100%',
  },
  boddy: {
    marginTop: 300,
    backgroundColor: '#ececec',
    zIndex: 1,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    height: '100%',
    borderStartWidth: 1,
    borderEndWidth: 1,
    borderTopWidth: 20,
    borderColor: '#017d71',
    //shadowColor: '#017d71',
  },
  image: {
    width: 228,
    height: 165,
    position: 'absolute',
    marginTop: -120,
    marginLeft: 100,
    //tintColor: 'red',
    //zIndex: 1,
  },
  mid: {
    //backgroundColor: 'white',
    marginBottom: 300,
    //zIndex: 3,
  },
  c: {
    flexDirection: 'row',
    marginLeft: 380,
    //backgroundColor: 'red',
    marginTop: 120,
    //marginHorizontal:
  },
});
