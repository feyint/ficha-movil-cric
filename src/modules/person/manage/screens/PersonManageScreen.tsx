import React, {Component} from 'react';
import {BButton} from '../../../../core/components';
import {View} from 'react-native';
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
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }
  async fetchPersons() {
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
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Identificacion nucleo familiar" />
        </Appbar.Header>
        <Text>
          Personas relacionadas con el nucleo familiar{' '}
          {this.props.FNBNUCVIV.CODIGO}
        </Text>
        <BButton
          color="primary"
          value="Nueva persona"
          mode="contained"
          onPress={() => this.createNewPerson()}
        />
        <PersonManageList
          persons={this.state.persons}
          onSelect={(value: any) => {
            console.log('Selected Item: ', value);
            this.goViewPersonScreen(value);
          }}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonManageScreen);
