import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {FamilyList} from '../form';
import {BButton} from '../../../core/components';
import {connect} from 'react-redux';
import {setFNBNUCVIV, clearFNBNUCVIV} from '../../../state/house/actions';
import {NavigationProp} from '@react-navigation/native';
import {HousingService} from '../../../services';
import {setConditionQuestionWithOptions} from '../../../state/ConditionPerson/actions';
import {setQuestionWithOptions} from '../../../state/person/actions';
import {setSexAndRepHealthQuestionWithOptions} from '../../../state/SexAndRepHealthPerson/actions';

interface State {
  families: any[];
}
class FamilyScreen extends Component<any, State> {
  public _unsubscribe: any;
  constructor(props: any) {
    super(props);
    this.state = {
      families: [],
    };
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.fetchFamilies();
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  //TODO añadir el back interceptor
  _goBack() {
    this.props.navigation.goBack();
  }
  async UNSAFE_componentWillMount() {
    this.props.setQuestionWithOptions();
    this.props.setConditionQuestionWithOptions();
    this.props.setSexAndRepHealthQuestionWithOptions();
    await this.fetchFamilies();
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Nucleo Familiar" />
        </Appbar.Header>
        <BButton
          color="primary"
          value="Crear Nuevo"
          mode="contained"
          onPress={() => this.createNewNF()}
        />
        <FamilyList
          families={this.state.families}
          onPress={(family: any) => {
            console.log('Family->', family);
            this.goHouseMenuScreen(family);
          }}
        />
      </View>
    );
  }
  async fetchFamilies() {
    let syncHousingService = new HousingService();
    let result = await syncHousingService.getFamilies(this.props.FUBUBIVIV.ID);
    // console.error('result ', result);
    if (result) {
      this.setState({families: result});
    }
  }
  createNewNF() {
    this.props.clearFNBNUCVIV();
    this.props.navigation.navigate('HouseMenuScreen', {
      onGoBack: async () => {
        await this.fetchFamilies();
      },
    });
  }
  goHouseMenuScreen(family: any) {
    this.props.setFNBNUCVIV(family);
    this.props.navigation.navigate('HouseMenuScreen');
  }
}
const mapDispatchToProps = {
  setFNBNUCVIV,
  clearFNBNUCVIV,
  setQuestionWithOptions,
  setConditionQuestionWithOptions,
  setSexAndRepHealthQuestionWithOptions,
};
const mapStateToProps = (housing: any) => {
  return {
    FUBUBIVIV: housing.housing.FUBUBIVIV,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FamilyScreen);
