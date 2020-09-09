import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {HousingService} from '../../../../services';
import {ListItem} from 'react-native-elements';
//import {FUBUBIVIV} from '../../../../state/house/types';

const _PersonList = (props: any) => {
  console.log(props);

  const syncCatalogService = new HousingService();

  const [state, setState] = useState({
    persons: [] as any[],
  });
  //consulta bd local
  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    let result = await syncCatalogService.getPersons();
    console.log(`listando personas ${result}`);
    if (result) {
      setState({
        ...state,
        persons: result,
      });
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        {state.persons.map((person, i) => (
          <ListItem
            onPress={() => props.onSelect(person)}
            key={i}
            bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{person.PRIMER_NOMBRE}</ListItem.Title>
              <ListItem.Subtitle>{person.IDENTIFICACION}</ListItem.Subtitle>
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
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});

export default _PersonList;
