import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {theme} from '../style/theme';
export default class BHeader extends Component<any, any> {
  render() {
    return <Text style={styles.header}>{this.props.children}</Text>;
  }
}
const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
    textAlign: 'center'
  },
});
