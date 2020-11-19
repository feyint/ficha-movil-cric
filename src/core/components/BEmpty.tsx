import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Colors} from 'react-native-paper';

interface Props {
  visible: boolean;
  text?: string;
}
const BEmpty = (props: Props) => {
  return (
    <View>
      {props.visible ? (
        <View style={styles.containerStyle}>
          <Text style={styles.text}>
            {props.text ? props.text : 'No hay registros en esta vista aún.'}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    position: 'relative',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    margin: 15,
    fontSize: 20,
    position: 'relative',
    justifyContent: 'center',
    alignSelf: 'center',
    color: Colors.cyan800,
  },
});
export default BEmpty;
