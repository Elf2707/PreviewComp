/**
 * Created by Elf on 06.06.2016.
 */
import * as types from '../constants/actionsType';

export function fetchPage(preview = {}){
    return {
        type: types.FETCH_PAGE,
        preview: preview
    };
}