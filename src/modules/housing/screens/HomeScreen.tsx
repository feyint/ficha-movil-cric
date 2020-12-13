/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {BSearchBarV2} from '../../../core/components';
import {useNavigation} from '@react-navigation/native';
import {
  Appbar,
  Avatar,
  Card,
  Paragraph,
  Searchbar,
  Title,
} from 'react-native-paper';
import {connect} from 'react-redux';
import {setFUBUBIVIV, clearFUBUBIVIV} from '../../../state/house/actions';
import {theme} from '../../../core/style/theme';
import BFabButton from '../../../core/components/BFabButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CardView from 'react-native-cardview';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFUBUBIVIV} from '../../../hooks';

const HomeScreen = (props: any) => {
  // TODO ajustar el filtro por queries y grupos, agregar fecha de creacion a ficha
  const [houses, setHouses] = useState<any[]>([]);
  const [filteredHouses, setfilteredHouses] = useState<any[]>([]);
  const [wordHouse, setWordHouse] = useState('');
  const {listFUBUBIVIV, getAllFUBUBIVIV} = useFUBUBIVIV();
  const navigation = useNavigation();

  useEffect(() => {
    setHouses(listFUBUBIVIV);
  }, [listFUBUBIVIV]);
  useEffect(() => {
    getAllFUBUBIVIV();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchHouses();
    });
    return unsubscribe;
  }, [navigation]);

  async function fetchHouses() {
    getAllFUBUBIVIV();
  }
  function searchHouse(textToSearch: any) {
    setWordHouse(textToSearch);
    let Result = houses.filter(
      (i) =>
        i.CODIGO.includes(textToSearch) || i.DIRECCION.includes(textToSearch),
    );
    setfilteredHouses(Result);
  }
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Appbar.Header>
        <Appbar.Content title="INICIO" />
      </Appbar.Header>
      {/* <Card>
        <Card.Cover source={require('../../../core/assets/img20.jpg')} />
        <Card.Content>
          <Card.Title title="Bienvenido a la ficha familiar"> </Card.Title>
        </Card.Content>
      </Card> */}
      <Searchbar
        placeholder="Ingrese codigo de ficha a buscar"
        onChangeText={(text: any) => {
          searchHouse(text);
        }}
        value={''}
      />
      <View>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            {filteredHouses && filteredHouses.length > 0 ? (
              filteredHouses.map((house: any, i: number) => {
                return (
                  <CardView
                    key={i}
                    cardElevation={8}
                    cardMaxElevation={10}
                    cornerRadius={6}
                    style={styles.cardView1}>
                    <TouchableOpacity onPress={() => goToHouse(house)}>
                      <View style={{flex: 1, padding: 20}}>
                        <Text style={styles.textTouchable}>
                          {house.DIRECCION}
                        </Text>
                        <View style={styles.viewCardItem} />
                        <CardItem title="Código" value={house.CODIGO} />
                        <CardItem title="Núcleos" value={house.NUM_NUCLEOS} />
                        <CardItem
                          title="Fecha"
                          value={
                            house.FECHA_CREACION
                              ? `${house.FECHA_CREACION.getDate()}/${
                                  house.FECHA_CREACION.getMonth() + 1
                                }/${house.FECHA_CREACION.getFullYear()}`
                              : ''
                          }
                        />
                        <CardItem
                          title="Hora"
                          value={
                            house.FECHA_CREACION
                              ? `${house.FECHA_CREACION.getHours()}:${house.FECHA_CREACION.getMinutes()}`
                              : ''
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  </CardView>
                );
              })
            ) : filteredHouses.length == 0 && wordHouse != '' ? (
              <View>
                <Image
                  source={{
                    uri:
                      'https://image.flaticon.com/icons/png/512/64/64670.png',
                  }}
                  style={styles.imageStyle}
                />
                <Text style={styles.noResultsText}>¡Sin resultados!</Text>
              </View>
            ) : (
              houses.map((house: any, i: number) => {
                return (
                  <CardView
                    key={i}
                    cardElevation={8}
                    cardMaxElevation={10}
                    cornerRadius={6}
                    style={styles.cardView1}>
                    <TouchableOpacity onPress={() => goToHouse(house)}>
                      <View style={{flex: 1, padding: 20}}>
                        <Text style={styles.textTouchable}>
                          {house.DIRECCION}
                        </Text>
                        <View style={styles.viewCardItem} />
                        <CardItem title="Código" value={house.CODIGO} />
                        <CardItem title="Núcleos" value={house.NUM_NUCLEOS} />
                        <CardItem
                          title="Fecha"
                          value={
                            house.FECHA_CREACION
                              ? `${house.FECHA_CREACION.getDate()}/${
                                  house.FECHA_CREACION.getMonth() + 1
                                }/${house.FECHA_CREACION.getFullYear()}`
                              : ''
                          }
                        />
                        <CardItem
                          title="Hora"
                          value={
                            house.FECHA_CREACION
                              ? `${house.FECHA_CREACION.getHours()}:${house.FECHA_CREACION.getMinutes()}`
                              : ''
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  </CardView>
                );
              })
            )}
          </View>
          <View style={styles.spacer} />
        </KeyboardAwareScrollView>
      </View>
      <BFabButton onPress={() => createNew()} />
    </View>
  );

  function createNew() {
    props.clearFUBUBIVIV();
    navigation.navigate('ManageHousingScreen');
  }
  async function goToHouse(value: any) {
    await props.setFUBUBIVIV(value);
    navigation.navigate('ManageHousingScreen');
  }
};
const mapDispatchToProps = {
  setFUBUBIVIV,
  clearFUBUBIVIV,
};

const CardItem = (data: any) => {
  return (
    <Text style={{fontSize: 17, color: theme.colors.gray}}>
      <Text style={{fontWeight: 'bold'}}>{data.title}:</Text> {data.value}
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
  cardView1: {
    margin: 15,
    backgroundColor: '#ffffff',
  },
  textTouchable: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colors.gray,
  },
  viewCardItem: {
    height: 1,
    backgroundColor: theme.colors.light,
    marginVertical: 10,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 80,
    width: 80,
    resizeMode: 'stretch',
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: '42%',
    opacity: 0.7,
  },
  noResultsText: {
    resizeMode: 'stretch',
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: '38%',
    fontSize: 20,
  },
});

export default connect(null, mapDispatchToProps)(HomeScreen);
