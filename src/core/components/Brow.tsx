import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {withTheme} from 'react-native-paper';
interface Props {
  theme: any;
}
class BRow extends Component<Props, any> {
  render() {
    return <View style={styles.row}>{this.props.children}</View>;
  }
}
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});
export default withTheme(BRow);
