import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {HousingService} from '../../../services';
import {ListItem} from 'react-native-elements';
import {FNBNUCVIV} from '../../../state/house/types';

const _FamilyList = (props: any) => {
  const [state, setState] = useState({
    families: props.families ? props.families : ([] as FNBNUCVIV[]),
  });

  useEffect(() => {}, []);
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        {props.families
          ? props.families.map((family, i) => (
              <ListItem
                onPress={() => props.onPress(family)}
                key={i}
                bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{family.CODIGO}</ListItem.Title>
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

export default _FamilyList;
