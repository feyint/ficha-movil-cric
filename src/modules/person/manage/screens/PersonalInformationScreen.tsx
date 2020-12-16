import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {PersonalInformationForm} from '../forms';
import {NavigationProp} from '@react-navigation/native';
import {QuestionConditionPersonCodes} from '../../../../core/utils/PersonTypes';
import {getQuestionWithOptions} from '../../../../state/ConditionPerson/actions';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { BAppBar } from '../../../../core/components';

interface Props {
  navigation: NavigationProp<any>;
  getQuestionWithOptions: any;
}

class PersonalInformationScreen extends Component<Props, any> {
  //TODO añadir el back interceptor
  constructor(props: Props) {
    super(props);
  }
  _goBack() {
    console.log('go back');
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View>
        <BAppBar
          backH={true}
          onPress={() => this._goBack()}
          title="Datos Personales"
        />
        <KeyboardAwareScrollView>
          <PersonalInformationForm />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = {
  getQuestionWithOptions,
};
export default connect(null, mapDispatchToProps)(PersonalInformationScreen);
