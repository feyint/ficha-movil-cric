import React from 'react';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ListItem} from 'react-native-elements';
import {FNCPERSON} from '../../../../state/person/types';
const _PersonList = (props: any) => {
  console.log(props);
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        {props.persons
          ? props.persons.map((person: FNCPERSON, i: any) => (
              <ListItem
                onPress={() => props.onSelect(person)}
                key={i}
                bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{person.PRIMER_NOMBRE}</ListItem.Title>
                  <ListItem.Subtitle>{person.IDENTIFICACION}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))
          : null}
      </View>
      <View style={styles.spacer} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  spacer: {
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});

export default _PersonList;
