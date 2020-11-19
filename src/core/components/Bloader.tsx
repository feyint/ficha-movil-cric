import * as React from 'react';
import {StyleSheet} from 'react-native';
import {
  Modal,
  Portal,
  Text,
  Provider,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';

interface Props {
  visible: boolean;
  hideModal?: any;
  dismissable?: boolean;
  text?: string;
}
const Bloader = (props: Props) => {
  return (
    <Provider>
      <Portal>
        <Modal
          dismissable={props.dismissable ? props.dismissable : false}
          visible={props.visible}
          onDismiss={props.hideModal ? props.hideModal() : null}
          contentContainerStyle={styles.containerStyle}>
          <ActivityIndicator
            size={'large'}
            animating={true}
            color={Colors.cyan800}
          />
          <Text style={styles.text}>
            {props.text ? props.text : 'Cargando ...'}
          </Text>
        </Modal>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 15,
    position: 'relative',
    backgroundColor: 'white',
    padding: 20,
    width: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    position: 'relative',
    justifyContent: 'center',
    alignSelf: 'center',
    color: Colors.cyan800,
  },
});
export default Bloader;
