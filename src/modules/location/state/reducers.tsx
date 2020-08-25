
import {
    CATALOGS_HOUSE
} from './actions';

// TODO traer de la base de datos
const CATALOGSHOUSEBD = [
    { 'Type': 1 },
    { 'Type': 2 },
    { 'Type': 3 },
];

const initialState = {
    availableCatalogsHouse: CATALOGSHOUSEBD
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case CATALOGS_HOUSE:
            return {
                ...state,
                availableCatalogsHouse: state.availableCatalogsHouse
            };

    }
    return state;
};
