import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {BButton} from '../components';

interface Props {
  mode?: 'text' | 'outlined' | 'contained' | undefined;
  value: string;
  onPress?: any;
  //color?: string;
}
export default class AlertBox extends Component<Props, any> {
  ShowAlertDialog = () => {
    Alert.alert(
      //Titulo
      'Guardar cambios',
      //Mensaje
      'Desea guardar los cambios?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('ejecuta cancelar'),
          style: 'cancel',
        },
        {text: 'Aceptar', onPress: () => this.props.onPress()},
      ],
    );
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <BButton
          color="primary"
          value={this.props.value}
          onPress={() => {
            this.ShowAlertDialog();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    // Setting up View inside content in Vertically center.
    justifyContent: 'center',
    flex: 1,
    margin: 10,
  },
});
