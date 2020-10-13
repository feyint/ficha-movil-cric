import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {ReproductiveSexualHealtForm} from '../forms';
import {NavigationProp} from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any>;
}
class ReproductiveSexualHealtScreen extends Component<Props, any> {
  //TODO añadir el back interceptor
  _goBack() {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content
            title="Salud sexual y reproductiva"
            subtitle="Antecedentes gineco obstétricos"
          />
        </Appbar.Header>
        <ReproductiveSexualHealtForm />
      </View>
    );
  }
}
export default ReproductiveSexualHealtScreen;
