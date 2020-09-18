import React, { Component } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { FamilyList } from '../form';
import { BButton } from '../../../core/components';
import { connect } from 'react-redux';
import { setFNBNUCVIV } from '../../../state/house/actions';
import { setQuestionWithOptions } from '../../../state/ConditionPerson/actions';
//import { setQuestionWithOptions as setConditionQuestionWithOptions } from '../../../state/ConditionPerson/actions;
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}
class FamilyScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  //TODO añadir el back interceptor
  _goBack() {
    this.props.navigation.goBack();
  }
  UNSAFE_componentWillMount() {
    //this.props.setQuestionWithOptions();
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
          onPress={() => {
            this.goHouseMenuScreen();
            this.props.setQuestionWithOptions();
          }}
        />
        <FamilyList onPress={(family: any) => {
          console.log('Family->', family);
          this.props.setFNBNUCVIV(family);
          this.goHouseMenuScreen();
        }} />

      </View>
    );
  }

  goHouseMenuScreen() {
    this.props.navigation.navigate('HouseMenuScreen');
  }

}
const mapDispatchToProps = {
  setFNBNUCVIV,
  setQuestionWithOptions
};

export default connect(null, mapDispatchToProps)(FamilyScreen);
