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
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 14,
    marginLeft: 0,
    backgroundColor: theme.colors.primary,
    height: 400,
    width: '100%',
    paddingTop: 200,
    paddingLeft: 40,
    //borderBottomLeftRadius: 50,
    //borderBottomRightRadius: 50,
    position: 'absolute',
  },
});
