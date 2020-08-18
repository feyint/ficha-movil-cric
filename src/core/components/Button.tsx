import React, {Component} from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
interface Props {
  mode?: 'text' | 'outlined' | 'contained' | undefined;
  value: string;
  onPress?: any;
}
export default class BButton extends Component<Props, any> {
  render() {
    return (
      <Button
        style={[styles.button]}
        labelStyle={styles.text}
        mode={this.props.mode ? this.props.mode : 'outlined'}
        onPress={() => this.props.onPress()}>
        {this.props.value}
      </Button>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});
