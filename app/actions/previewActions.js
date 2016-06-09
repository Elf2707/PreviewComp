/**
 * Created by Elf on 06.06.2016.
 */
import * as types from '../constants/actionsType';

export function addUrlToPreviewAction(url = ''){
    return {
        type: types.ADD_URL_TO_MAKE_PREVIEW,
         url: url
    }
}