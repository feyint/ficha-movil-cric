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
        style={[styles.button, this.props.style]}
        color={this.props.theme.colors[this.props.color]}
        labelStyle={[styles.text]}
        mode={this.props.mode ? this.props.mode : 'contained'}
        onPress={() => this.props.onPress()}>
        {this.props.value}
      </Button>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    margin: 5,
    padding: 5,
    borderRadius: 15,
    borderWidth: 0,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});
export default withTheme(BButton);
