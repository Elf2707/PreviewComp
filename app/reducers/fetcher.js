/**
 * Created by Elf on 06.06.2016.
 */
import * as types from '../constants/actionsType';

const initialState = {
    link: 'Hello'
};

export default function fetcher(state = initialState, action = {}) {
    switch (action.type){
        case types.FETCH_PAGE:
            return {
                ...state,
                link: action.link
            }

        default:
            return state;
    }
}