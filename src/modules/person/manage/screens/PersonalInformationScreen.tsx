import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {PersonalInformationForm} from '../forms';
import {NavigationProp} from '@react-navigation/native';
import {QuestionConditionPersonCodes} from '../../../../core/utils/PersonTypes';
import {getQuestionWithOptions} from '../../../../state/ConditionPerson/actions';
import {connect} from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
  navigation: NavigationProp<any>;
  getQuestionWithOptions: any;
}
interface State {
  questionitems: [];
  loaded: boolean;
}
const questionscodes = [QuestionConditionPersonCodes.GrupoEtnico];
class PersonalInformationScreen extends Component<Props, State> {
  //TODO añadir el back interceptor
  constructor(props: Props) {
    super(props);
    this.state = {
      questionitems: [],
      loaded: false,
    };
  }
  _goBack() {
    this.props.navigation.goBack();
  }
  async componentDidMount() {
    await this.inicialize();
  }
  async inicialize() {
    let questionitems = await this.props.getQuestionWithOptions(questionscodes);
    this.setState({
      questionitems: questionitems,
      loaded: true,
    });
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction  onPress={() => this._goBack()} />
          <Appbar.Content title="Datos Personales" />
        </Appbar.Header>
        {this.state.loaded ? (
          <KeyboardAwareScrollView>
            <PersonalInformationForm questions={this.state.questionitems} />
          </KeyboardAwareScrollView>
        ) : null}
      </View>
    );
  }
}

const mapDispatchToProps = {
  getQuestionWithOptions,
};
export default connect(null, mapDispatchToProps)(PersonalInformationScreen);
