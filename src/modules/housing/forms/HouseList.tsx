import React from 'react';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ListItem} from 'react-native-elements';
const _HouseList = (props: any) => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        {props.houses.map((house: any, i: number) => (
          <ListItem onPress={() => props.onSelect(house)} key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{house.CODIGO}</ListItem.Title>
              <ListItem.Subtitle>{house.DIRECCION}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      <View style={styles.spacer} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  spacer: {
    height: 150,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});

export default _HouseList;
