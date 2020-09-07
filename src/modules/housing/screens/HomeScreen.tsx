import React, {Component} from 'react';
import {View} from 'react-native';
import {BButton} from '../../../core/components';
//import {LoginForm} from '../components';
import {NavigationProp} from '@react-navigation/native';
import {Appbar} from 'react-native-paper';
import {connect} from 'react-redux';
import {setQuestionWithOptions} from '../../../state/house/actions';

interface FormData {
  navigation: NavigationProp<any>;
}

class HomeScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  UNSAFE_componentWillMount() {
    //this.props.setQuestionWithOptions();
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.Content title="INICIO" />
        </Appbar.Header>
        <BButton
          color="primary"
          value="Crear Nueva"
          mode="contained"
          onPress={() => this.goHomeLocation()}
        />
      </View>
    );
  }
  goHomeLocation() {
    this.props.navigation.navigate('ManageHousingScreen');
  }
}
const mapDispatchToProps = {
  setQuestionWithOptions,
};
export default connect(null, mapDispatchToProps)(HomeScreen);
