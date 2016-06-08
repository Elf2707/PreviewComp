/**
 * Created by Elf on 06.06.2016.
 */
import * as types from '../constants/actionsType';

export function addPagePreview(preview = {}){
    return {
        type: types.ADD_PAGE_PREVIEW,
        preview: preview
    };
}