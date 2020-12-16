import React, {Component} from 'react';
import {Text} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {withTheme} from 'react-native-paper';
import {theme} from '../style/theme';

interface Props {
  label?: string;
  theme: any;
}

class BLabel extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text style={styles.label}>
          {this.props.children ? this.props.children : 'Seleccione una opción'}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    color: theme.colors.accent,
  },
});

export default withTheme(BLabel);
