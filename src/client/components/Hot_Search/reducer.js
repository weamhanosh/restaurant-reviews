import initialState from '../../initialState';
import {Hot_SearchActionsConstants} from './constants.js';
import { List } from 'immutable';

const Hot_Search_Reducer = (state = initialState.hot_search, action) => {
    console.log('Hot_SearchReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    // switch (action.type){
    //     case AppActionsConstants.UPDATE_TAG:
    //         return state.set('restaurant', action.payload.restaurant);
    //     case AppActionsConstants.LOAD_TAGS_SUCCESS:
    //         let res = action.payload.tags.map(elm => {
    //             return {label: elm, value: elm }
    //         });
    //         return state.set('tags', new List(res));
    //     default: //otherwise state is lost!
            return state;
    // }
};

export default Hot_Search_Reducer;
