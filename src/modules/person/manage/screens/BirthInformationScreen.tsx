import React, {Component} from 'react';
import {View} from 'react-native';
import {Appbar} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import {BirthInformationForm} from '../forms';
import {connect} from 'react-redux';
import {getQuestionWithOptions} from '../../../../state/ConditionPerson/actions';
import {QuestionConditionPersonCodes} from '../../../../core/utils/PersonTypes';

interface Props {
  navigation: NavigationProp<any>;
  getQuestionWithOptions: any;
}
interface State {
  questionitems: [];
  loaded: boolean;
}
const questions = [
  QuestionConditionPersonCodes.LunaOccidental,
  QuestionConditionPersonCodes.LactanciaMaterna,
];
class BirthInformationScreen extends Component<Props, State> {
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
    let questionitems = await this.props.getQuestionWithOptions(questions);
    this.setState({
      questionitems: questionitems,
      loaded: true,
    });
  }
  render() {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => this._goBack()} />
          <Appbar.Content title="Datos de nacimiento" />
        </Appbar.Header>
        {this.state.loaded ? (
          <BirthInformationForm questions={this.state.questionitems} />
        ) : null}
      </View>
    );
  }
}
const mapDispatchToProps = {
  getQuestionWithOptions,
};
export default connect(null, mapDispatchToProps)(BirthInformationScreen);