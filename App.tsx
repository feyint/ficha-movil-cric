
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Form from './src/components/Form';
import colors from './src/utils/colors';


const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea} >
        <Text style={styles.titleApp}>Cotizador de prestamos</Text>

        <Form />

      </SafeAreaView>

      <View>
        <Text>Resultados</Text>
      </View>

      <View>
        <Text>Footer</Text>
      </View>

    </>
  );
};

const styles = StyleSheet.create({

  safeArea: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center"
  },
  titleApp: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  }


});

export default App;
