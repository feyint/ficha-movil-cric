/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {BSearchBarV2} from '../../../../core/components';
import {Image, StyleSheet, View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  clearFNBINFSAL,
  clearFNCPERSON,
  setFNCPERSON,
} from '../../../../state/person/actions';
import {HousingService} from '../../../../services';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ListItem} from 'react-native-elements';
import BFabButton from '../../../../core/components/BFabButton';
import {FNCPERSON} from '../../../../types';
import {useFNCPERSON} from '../../../../hooks';

const PersonManageScreen = (props: any) => {
  const [persons, setPersons] = useState<FNCPERSON[]>([]);
  const [filteredPersons, setFilter] = useState<FNCPERSON[]>([]);
  const [word, setWord] = useState<string>('');
  const navigation = useNavigation();
  const {listFNCPERSON, filterFNCPERSON} = useFNCPERSON();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPersons();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    if (listFNCPERSON) {
      setPersons(listFNCPERSON);
    }
  }, [listFNCPERSON]);

  async function fetchPersons() {
    try {
      if (props.FNBNUCVIV.ID) {
        filterFNCPERSON(props.FNBNUCVIV.ID);
      }
    } catch (error) {
      console.error(error);
    }
  }
  function searchUser(textToSearch: any) {
    // setState({
    //   filteredPersons: persons.filter(
    //     (i) =>
    //       i.PRIMER_NOMBRE.toLowerCase().includes(textToSearch.toLowerCase()) ||
    //       i.IDENTIFICACION.toLowerCase().includes(textToSearch.toLowerCase()) ||
    //       i.PRIMER_APELLIDO.toLowerCase().includes(
    //         textToSearch.toLowerCase(),
    //       ) ||
    //       i.SEGUNDO_NOMBRE.toLowerCase().includes(textToSearch.toLowerCase()) ||
    //       i.SEGUNDO_APELLIDO.toLowerCase().includes(textToSearch.toLowerCase()),
    //   ),
    //   word: textToSearch,
    // });
  }
  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Identificacion nucleo familiar" />
      </Appbar.Header>
      <Text style={{fontSize: 16, padding: 10}}>
        <Text style={{fontWeight: 'bold'}}>Nucleo familiar:</Text>{' '}
        {props.FNBNUCVIV.CODIGO}
      </Text>
      <KeyboardAwareScrollView>
        <BSearchBarV2
          placeholder="Ingrese identificacion o nombre de persona a buscar"
          onChange={(text: any) => {
            searchUser(text);
          }}
        />
        <View style={styles.container}>
          {filteredPersons && filteredPersons.length > 0 ? (
            filteredPersons.map((person: FNCPERSON, i: any) => (
              <ListItem
                onPress={() => {
                  goViewPersonScreen(person);
                }}
                key={i}
                bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{`${person.PRIMER_NOMBRE}  ${person.SEGUNDO_NOMBRE}  ${person.PRIMER_APELLIDO}  ${person.SEGUNDO_APELLIDO}`}</ListItem.Title>
                  <ListItem.Subtitle>{person.IDENTIFICACION}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))
          ) : filteredPersons.length == 0 && word != '' ? (
            <View>
              <Image
                source={{
                  uri: 'https://image.flaticon.com/icons/png/512/64/64670.png',
                }}
                style={styles.imageStyle}
              />
              <Text style={styles.noResultsText}>¡Sin resultados!</Text>
            </View>
          ) : (
            persons.map((person: FNCPERSON, i: any) => (
              <ListItem
                onPress={() => {
                  goViewPersonScreen(person);
                }}
                key={i}
                bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>
                    {`${person.PRIMER_NOMBRE}  ${person.SEGUNDO_NOMBRE}  ${person.PRIMER_APELLIDO}  ${person.SEGUNDO_APELLIDO}`}
                  </ListItem.Title>
                  <ListItem.Subtitle>{person.IDENTIFICACION}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))
          )}
        </View>
        <View style={styles.spacer} />
      </KeyboardAwareScrollView>

      <BFabButton onPress={() => createNewPerson()} />
    </View>
  );

  function goViewPersonScreen(data: FNCPERSON) {
    props.setFNCPERSON(data);
    props.navigation.navigate('ViewPersonScreen');
  }
  function createNewPerson() {
    props.clearFNCPERSON();
    props.clearFNBINFSAL();
    props.navigation.navigate('ViewPersonScreen');
  }
};

const mapDispatchToProps = {
  clearFNCPERSON,
  setFNCPERSON,
  clearFNBINFSAL,
};
const mapStateToProps = (store: any) => {
  return {
    FNBNUCVIV: store.housing.FNBNUCVIV,
  };
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
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 80,
    width: 80,
    resizeMode: 'stretch',
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: '42%',
    opacity: 0.7,
  },
  noResultsText: {
    resizeMode: 'stretch',
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: '38%',
    fontSize: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonManageScreen);
