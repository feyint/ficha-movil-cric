import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { HousingService } from '../../../services';
import { ListItem } from 'react-native-elements'
import { FNBNUCVIV } from '../../../state/house/types';
import { connect } from 'react-redux';

const _FamilyList = (props: any) => {

    console.log(props);

    const syncHousingService = new HousingService();

    const [state, setState] = useState({
        families: [] as FNBNUCVIV[],
    });

    useEffect(() => {
        console.log('Vivienda del state: ', props.FUBUBIVIV.ID);
        fetchFamilies();
    }, []);

    const fetchFamilies = async () => {
        let result = await syncHousingService.getFamilies(props.FUBUBIVIV.ID)
        if (result) {
            setState({
                ...state,
                families: result,
            });
        }
    };

    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                {
                    state.families.map((family, i) => (
                        <ListItem onPress={() => props.onPress(family)} key={i} bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{family.CODIGO}</ListItem.Title>
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

const mapStateToProps = (housing: any) => {
    return {
        FUBUBIVIV: housing.housing.FUBUBIVIV,
    };
};

export default connect(mapStateToProps)(_FamilyList);
