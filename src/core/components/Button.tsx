import React, {Component} from 'react';
import {Button, withTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';
interface Props {
  mode?: 'text' | 'outlined' | 'contained' | undefined;
  value: string;
  color: 'primary' | 'secondary' | 'accent';
  onPress?: any;
  theme: ReactNativePaper.Theme;
  style?: any;
  labelStyle?: any;
}
class BButton extends Component<Props, any> {
  render() {
    return (
      <Button
        style={[this.props.style]}
        color={this.props.theme.colors[this.props.color]}
        labelStyle={[styles.text, this.props.labelStyle]}
        mode={this.props.mode ? this.props.mode : 'contained'}
        onPress={() => this.props.onPress()}>
        {this.props.value}
      </Button>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});
export default withTheme(BButton);
