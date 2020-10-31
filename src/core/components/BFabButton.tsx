import React, {Component} from 'react';
import ActionButton from 'react-native-action-button';
import {theme} from '../style/theme';

interface Props {
    onPress: () => void;
}
export default class BFabButton extends Component<Props> {
  render() {
    return (
      <ActionButton
        buttonColor={theme.colors.accent}
        bgColor={theme.colors.backgroundTransparent}
        onPress={this.props.onPress}
      />
    );
  }
}
