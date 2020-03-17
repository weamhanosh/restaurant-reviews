import initialState from '../../initialState';
import {Search_UsersActionsConstants} from './constants.js';
import { List } from 'immutable';

const Search_Users_Reducer = (state = initialState.users, action) => {
    console.log('Search_UsersReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case Search_UsersActionsConstants.UPDATE_SEARCH_TYPE_USER:
            return state.set('is_username', action.payload.search_type);
        case Search_UsersActionsConstants.UPDATE_TAG_USER:
            return state.set('user', action.payload.username);
        case Search_UsersActionsConstants.SEARCH_USERS:
            state = state.set('no_results', false);
            return state.set('render_results', false);
        case Search_UsersActionsConstants.SEARCH_USERS_LOCATION:
            state = state.set('no_results', false);
            return state.set('render_results', false);
        case Search_UsersActionsConstants.LOAD_USER:
            console.log(action.payload)
            if (action.payload.result === false){
                state = state.set('no_results', true);
                return state.set('render_results', true);
            }
            state = state.set('no_results', false);
            state = state.set('render_results', true);
            state = state.set('received_username', action.payload.result.username);
            state = state.set('location', action.payload.result.location);
            return state.set('user_reviews', action.payload.result.my_reviews);
        case Search_UsersActionsConstants.LOAD_USER_LOCATION:
            if (action.payload.result === false){
                state = state.set('no_results', true);
                return state.set('render_results', true);
            }
            state = state.set('no_results', true);
            state = state.set('render_results', false);
            return state.set('arr_of_usernames', action.payload);
        case Search_UsersActionsConstants.GLOBAL_FILTER_SEARCH:
            return state.set('globalFilter', action.payload.e);
        default: //otherwise state is lost!
            return state;
    }
};

export default Search_Users_Reducer;
