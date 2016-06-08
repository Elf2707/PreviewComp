/**
 * Created by Elf on 06.06.2016.
 */
import * as types from '../constants/actionsType';

const initialState = {
    previewList:[]
};

export default function previewReducer(state = initialState, action = {}) {
    switch (action.type){
        case types.ADD_PAGE_PREVIEW:
            return Object.assign({}, state, {
                previewList: [
                    ...state.previewList, action.preview
                ]
            });

        default:
            return state;
    }
}