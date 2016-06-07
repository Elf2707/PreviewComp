/**
 * Created by Elf on 06.06.2016.
 */
import * as types from '../constants/actionsType';

const initialState = {
    preview: {}
};

export default function fetcher(state = initialState, action = {}) {
    switch (action.type){
        case types.FETCH_PAGE:
            return {
                ...state,
                preview: action.preview
            }

        default:
            return state;
    }
}