import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { HousingService } from '../../../services';
import { ListItem } from 'react-native-elements'
import { FUBUBIVIV } from '../../../state/house/types';

const _HouseList = (props: any) => {

    console.log(props);

    const syncCatalogService = new HousingService();

    const [state, setState] = useState({
        houses: [] as FUBUBIVIV[],
    });

    useEffect(() => {
        fetchHouses();
    }, []);

    const fetchHouses = async () => {
        let result = await syncCatalogService.getHouses()
        if (result) {
            setState({
                ...state,
                houses: result,
            });
        }
    };

    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                {
                    state.houses.map((house, i) => (
                        <ListItem onPress={() => props.onSelect(house)} key={i} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{house.CODIGO}</ListItem.Title>
                                <ListItem.Subtitle>{house.DIRECCION}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
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


export default _HouseList;
