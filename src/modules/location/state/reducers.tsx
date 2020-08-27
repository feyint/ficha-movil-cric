
import {
    ActionType
} from './actions';

const initialState = {
    availableCatalogsHouse: []
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case ActionType.SET_CATALOGS:
            return {
                ...state,
                availableCatalogsHouse: action.data
            };
        default:
            return state;
    }
};
