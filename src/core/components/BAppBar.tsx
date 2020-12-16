import React, {Component} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Appbar, withTheme} from 'react-native-paper';
interface Props {
  mode?: 'text' | 'outlined' | 'contained' | undefined;
  title: string;
  backH?: boolean;
  onPress: any;
  theme: ReactNativePaper.Theme;
  style?: any;
  message?: string;
  subtitle?: string;
}
class BAppBar extends Component<Props, any> {
  alert() {
    Alert.alert(
      this.props.title ? this.props.title : '',
      this.props.message ? this.props.message : '¿Desea cancelar el proceso?',
      [
        {
          text: 'NO',
          style: 'cancel',
        },
        {text: 'SI', onPress: () => this.props.onPress()},
      ],
      {cancelable: false},
    );
  }
  render() {
    return (
      <Appbar.Header style={this.props.subtitle ? styles.header : null}>
        <Appbar.BackAction
          onPress={() => {
            this.props.backH ? this.alert() : this.props.onPress();
          }}
        />
        <Appbar.Content
          titleStyle={styles.appBr}
          title={this.props.title}
          subtitle={this.props.subtitle}
        />
      </Appbar.Header>
    );
  }
}
const styles = StyleSheet.create({
  appBr: {
    fontWeight: '600',
    fontSize: 25,
  },
  header: {
    marginBottom: 10,
  },
});
export default withTheme(BAppBar);
