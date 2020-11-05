import React, {Component, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {BButton, BSearchBarV2} from '../../../core/components';
//import {LoginForm} from '../components';
import {NavigationProp} from '@react-navigation/native';
import {Appbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {setFUBUBIVIV, clearFUBUBIVIV} from '../../../state/house/actions';
import {HouseList} from '../forms';
import {HousingService} from '../../../services';
import {FUBUBIVIV} from '../../../state/house/types';
import {theme} from '../../../core/style/theme';
import BFabButton from '../../../core/components/BFabButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CardView from 'react-native-cardview';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface FormData {
  navigation: NavigationProp<any>;
  clearFUBUBIVIV: any;
  setFUBUBIVIV: any;
}
interface State {
  houses: FUBUBIVIV[];
  filteredHouses: FUBUBIVIV[];
  wordHouse: string;
}

class HomeScreen extends Component<FormData, State> {
  public _unsubscribe: any;
  constructor(props: any) {
    super(props);
    this.state = {
      houses: [],
      filteredHouses: [],
      wordHouse: '',
    };
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.fetchHouses();
    });
  }
  componentWillMount() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }
  async fetchHouses() {
    let syncCatalogService = new HousingService();
    let result = await syncCatalogService.getHouses();
    if (result) {
      this.setState({
        houses: result,
      });
    }
  }

  searchHouse(textToSearch: any) {
    this.setState({
      filteredHouses: this.state.houses.filter(
        (i) =>
          i.CODIGO.includes(textToSearch) || i.DIRECCION.includes(textToSearch),
      ),
      wordHouse: textToSearch,
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Appbar.Header>
          <Appbar.Content title="INICIO" />
        </Appbar.Header>
        <View>
          <KeyboardAwareScrollView>
            <BSearchBarV2
              placeholder="Ingrese codigo de ficha a buscar"
              onChange={(text: any) => {
                this.searchHouse(text);
              }}
            />
            <View style={styles.container}>
              {this.state.filteredHouses &&
              this.state.filteredHouses.length > 0 ? (
                this.state.filteredHouses.map((house: any, i: number) => {
                  return (
                    <CardView
                      key={i}
                      cardElevation={8}
                      cardMaxElevation={10}
                      cornerRadius={6}
                      style={styles.cardView1}>
                      <TouchableOpacity onPress={() => this.goToHouse(house)}>
                        <View style={{flex: 1, padding: 20}}>
                          <Text style={styles.textTouchable}>
                            {house.DIRECCION}
                          </Text>
                          <View style={styles.viewCardItem} />
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
                })
              ) : this.state.filteredHouses.length == 0 &&
                this.state.wordHouse != '' ? (
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
                this.state.houses.map((house: any, i: number) => {
                  return (
                    <CardView
                      key={i}
                      cardElevation={8}
                      cardMaxElevation={10}
                      cornerRadius={6}
                      style={styles.cardView1}>
                      <TouchableOpacity onPress={() => this.goToHouse(house)}>
                        <View style={{flex: 1, padding: 20}}>
                          <Text style={styles.textTouchable}>
                            {house.DIRECCION}
                          </Text>
                          <View style={styles.viewCardItem} />
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
                })
              )}
            </View>
            <View style={styles.spacer} />
          </KeyboardAwareScrollView>
        </View>
        {/* ------------------------------------------- */}
        {/* <HouseList
          houses={this.state.houses}
          onSelect={(value: any) => {
            this.goToHouse(value);
          }}
        /> */}
        {/* ------------------------------------------ */}
        <BFabButton onPress={() => this.createNew()} />
      </View>
    );
  }
  createNew() {
    this.props.clearFUBUBIVIV();
    this.props.navigation.navigate('ManageHousingScreen');
  }
  async goToHouse(value: any) {
    await this.props.setFUBUBIVIV(value);
    this.props.navigation.navigate('ManageHousingScreen');
  }
}
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
