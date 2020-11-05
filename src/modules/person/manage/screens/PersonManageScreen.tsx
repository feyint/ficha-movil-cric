import React, {Component} from 'react';
import {BSearchBarV2} from '../../../../core/components';
import {Image, StyleSheet, View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  clearFNBINFSAL,
  clearFNCPERSON,
  setFNCPERSON,
  setQuestionWithOptions,
} from '../../../../state/person/actions';
import {FNBNUCVIV} from '../../../../state/house/types';
import {HousingService} from '../../../../services';
import {FNCPERSON} from '../../../../state/person/types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ListItem} from 'react-native-elements';
import BFabButton from '../../../../core/components/BFabButton';

interface Props {
  navigation: NavigationProp<any>;
  clearFNCPERSON: any;
  setFNCPERSON: any;
  clearFNBINFSAL: any;
  setQuestionWithOptions: any;
  FNBNUCVIV: FNBNUCVIV;
}
interface State {
  persons: FNCPERSON[];
  filteredPersons: FNCPERSON[];
  //filteredPersonsID: FNCPERSON[];
  word: string;
}
/* const Helper2 =()=>{
  const [searchQuery, setSearchQuery] = React.useState('');
} */
class PersonManageScreen extends Component<Props, State> {
  private _unsubscribe: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      persons: [],
      filteredPersons: [],
      word: '',
    };
  }
  componentDidMount() {
    try {
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.fetchPersons();
      });
      this.props.setQuestionWithOptions();
    } catch (error) {
      console.error('ocurrio un error');
    }
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  async fetchPersons() {
    try {
      if (this.props.FNBNUCVIV.ID) {
        let syncCatalogService = new HousingService();
        let result = await syncCatalogService.getFNBNUCVIVPersons(
          this.props.FNBNUCVIV.ID,
        );
        if (result) {
          this.setState({
            persons: result,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  //const [searchQuery, setSearchQuery] = React.useState('');
  _goBack() {
    this.props.navigation.goBack();
  }
  searchUser(textToSearch: any) {
    this.setState({
      filteredPersons: this.state.persons.filter(
        (i) =>
          i.PRIMER_NOMBRE.toLowerCase().includes(textToSearch.toLowerCase()) ||
          i.IDENTIFICACION.toLowerCase().includes(textToSearch.toLowerCase()) ||
          i.PRIMER_APELLIDO.toLowerCase().includes(
            textToSearch.toLowerCase(),
          ) ||
          i.SEGUNDO_NOMBRE.toLowerCase().includes(textToSearch.toLowerCase()) ||
          i.SEGUNDO_APELLIDO.toLowerCase().includes(textToSearch.toLowerCase()),
      ),
      word: textToSearch,
    });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Identificacion nucleo familiar" />
        </Appbar.Header>
        <Text style={{fontSize: 16, padding: 10}}>
          <Text style={{fontWeight: 'bold'}}>Nucleo familiar:</Text>{' '}
          {this.props.FNBNUCVIV.CODIGO}
        </Text>
        <KeyboardAwareScrollView>
          <BSearchBarV2
            placeholder="Ingrese identificacion o nombre de persona a buscar"
            onChange={(text: any) => {
              this.searchUser(text);
            }}
          />
          <View style={styles.container}>
            {this.state.filteredPersons &&
            this.state.filteredPersons.length > 0 ? (
              this.state.filteredPersons.map((person: FNCPERSON, i: any) => (
                <ListItem
                  onPress={() => {
                    this.goViewPersonScreen(person);
                  }}
                  key={i}
                  bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{`${person.PRIMER_NOMBRE}  ${person.SEGUNDO_NOMBRE}  ${person.PRIMER_APELLIDO}  ${person.SEGUNDO_APELLIDO}`}</ListItem.Title>
                    <ListItem.Subtitle>
                      {person.IDENTIFICACION}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))
            ) : this.state.filteredPersons.length == 0 &&
              this.state.word != '' ? (
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
              this.state.persons.map((person: FNCPERSON, i: any) => (
                <ListItem
                  onPress={() => {
                    this.goViewPersonScreen(person);
                  }}
                  key={i}
                  bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>
                      {`${person.PRIMER_NOMBRE}  ${person.SEGUNDO_NOMBRE}  ${person.PRIMER_APELLIDO}  ${person.SEGUNDO_APELLIDO}`}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      {person.IDENTIFICACION}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))
            )}
          </View>
          <View style={styles.spacer} />
        </KeyboardAwareScrollView>

        <BFabButton onPress={() => this.createNewPerson()} />
      </View>
    );
  }
  goViewPersonScreen(data: FNCPERSON) {
    this.props.setFNCPERSON(data);
    this.props.navigation.navigate('ViewPersonScreen');
  }
  createNewPerson() {
    this.props.clearFNCPERSON();
    this.props.clearFNBINFSAL();
    this.props.navigation.navigate('ViewPersonScreen');
  }
}

const mapDispatchToProps = {
  clearFNCPERSON,
  setFNCPERSON,
  setQuestionWithOptions,
  clearFNBINFSAL,
};
const mapStateToProps = (housing: any) => {
  return {
    FNBNUCVIV: housing.housing.FNBNUCVIV,
  };
};

const styles = StyleSheet.create({
  spacer: {
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonManageScreen);
