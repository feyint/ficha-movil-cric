import React, {Component} from 'react';
import {BButton} from '../../../../core/components';
import {StyleSheet, View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import PersonManageList from '../forms/PersonManageList';
import {connect} from 'react-redux';
import {
  clearFNBINFSAL,
  clearFNCPERSON,
  setFNCPERSON,
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
  FNBNUCVIV: FNBNUCVIV;
}
interface State {
  persons: FNCPERSON[];
}
class PersonManageScreen extends Component<Props, State> {
  private _unsubscribe: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      persons: [],
    };
  }

  componentDidMount() {
    try {
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.fetchPersons();
      });
    } catch (error) {
      console.error('ocurrio un error');
    }
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  async fetchPersons() {
    try {
      let syncCatalogService = new HousingService();
      let result = await syncCatalogService.getFNBNUCVIVPersons(
        this.props.FNBNUCVIV.ID,
      );
      if (result) {
        this.setState({
          persons: result,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  _goBack() {
    this.props.navigation.goBack();
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
          <View style={styles.container}>
            {this.state.persons && this.state.persons.length > 0
              ? this.state.persons.map((person: FNCPERSON, i: any) => (
                  <ListItem
                    onPress={() => {
                      this.goViewPersonScreen(person);
                    }}
                    key={i}
                    bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>{person.PRIMER_NOMBRE}</ListItem.Title>
                      <ListItem.Subtitle>
                        {person.IDENTIFICACION}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                ))
              : null}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonManageScreen);
