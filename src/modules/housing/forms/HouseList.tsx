import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ListItem} from 'react-native-elements';
import CardView from 'react-native-cardview';
import {theme} from '../../../core/style/theme';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const _HouseList = (props: any) => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        {props.houses.map((house: any, i: number) => {
          console.log('house ', house);
          return (
            <CardView
              key={i}
              cardElevation={8}
              cardMaxElevation={10}
              cornerRadius={6}
              style={{
                margin: 15,
                backgroundColor: '#ffffff',
              }}>
              <TouchableOpacity onPress={() => props.onSelect(house)}>
                <View style={{flex: 1, padding: 20}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: theme.colors.gray,
                    }}>
                    {house.DIRECCION}
                  </Text>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: theme.colors.light,
                      marginVertical: 10,
                    }}
                  />
                  <CardItem title="Código" value={house.CODIGO} />
                  <CardItem title="Núcleos" value={house.NUM_NUCLEOS} />
                  <CardItem
                    title="Fecha"
                    value={`${house.FECHA_CREACION.getDate()}/${
                      house.FECHA_CREACION.getMonth() + 1
                    }/${house.FECHA_CREACION.getFullYear()}`}
                  />
                  <CardItem
                    title="Hora"
                    value={`${house.FECHA_CREACION.getHours()}:${house.FECHA_CREACION.getMinutes()}`}
                  />
                </View>
              </TouchableOpacity>
            </CardView>
          );
        })}
      </View>
      <View style={styles.spacer} />
    </KeyboardAwareScrollView>
  );
};

const CardItem = (props: any) => {
  return (
    <Text style={{fontSize: 17, color: theme.colors.gray}}>
      <Text style={{fontWeight: 'bold'}}>{props.title}:</Text> {props.value}
    </Text>
  );
};

const styles = StyleSheet.create({
  spacer: {
    height: 150,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});

export default _HouseList;
