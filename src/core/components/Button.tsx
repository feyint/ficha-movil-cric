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
        labelStyle={[styles.text, this.props.labelStyle]}
        mode={this.props.mode ? this.props.mode : 'contained'}
        onPress={() => this.props.onPress()}>
        {this.props.value}
      </Button>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    //width: '100%',
    marginVertical: 10,
    justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 15,
    marginTop: 30,
    height: 57,
    width: '90%',
    marginHorizontal: '5%',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});
export default withTheme(BButton);
