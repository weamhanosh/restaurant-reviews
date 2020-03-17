import initialState from '../../initialState';
import {User_LoginActionsConstants} from './constants.js';
import { List } from 'immutable';

const User_Login_Reducer = (state = initialState.login, action) => {
    console.log('User_LoginReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case User_LoginActionsConstants.UPDATE_USERNAME:
            return state.set('username', action.payload.username);
        case User_LoginActionsConstants.UPDATE_PASSWORD:
            return state.set('password', action.payload.password);
        case User_LoginActionsConstants.UPDATE_LOCATION:
            return state.set('location', action.payload.location);
        case User_LoginActionsConstants.UPDATE_NEW_USERNAME:
            return state.set('new_username', action.payload.new_username);
        case User_LoginActionsConstants.UPDATE_NEW_PASSWORD:
            return state.set('new_password', action.payload.new_password);
        case User_LoginActionsConstants.UPDATE_NEW_LOCATION:
            return state.set('new_location', action.payload.new_location);
        case User_LoginActionsConstants.UPDATE_AVAILABILITY:
            return state.set('availability', action.payload.availability);
        case User_LoginActionsConstants.UPDATE_NEW_AVAILABILITY:
            return state.set('new_availability', action.payload.new_availability);
        case User_LoginActionsConstants.SUCCESS_LOGIN:
            state = state.set('logged_in', true);
            return state.set('render_login', false);
        case User_LoginActionsConstants.SUCCESS_REGISTER:
            state = state.set('logged_in', true);
            return state.set('render_login', false);
        case User_LoginActionsConstants.SUCCESS_LOGOUT:
            state = state.set('logged_in', false);
            state = state.set('render_profile', false);
            return state.set('render_login', true);
        case User_LoginActionsConstants.FAIL_LOGIN:
            state = state.set('logged_in', false);
            return state.set('render_login', true);
        case User_LoginActionsConstants.FAIL_REGISTER:
            state = state.set('logged_in', false);
            return state.set('render_login', true);
        case User_LoginActionsConstants.FAIL_LOGOUT:
            state = state.set('logged_in', true);
            return state.set('render_login', false);
        case User_LoginActionsConstants.PROFILE:
            return state.set('render_profile', action.payload.render_profile);
        case User_LoginActionsConstants.GLOBAL_FILTER:
            return state.set('globalFilter', action.payload.e);
        case User_LoginActionsConstants.SELECT_RESTAURANT:
            return state.set('selectedRestaurant', action.payload.e);
        case User_LoginActionsConstants.UPDATE_REVIEWS:
            return state.set('my_reviews', action.payload.new_reviews);
        case User_LoginActionsConstants.EDIT_IMAGE:
            return state.set('img', action.payload);
        case User_LoginActionsConstants.UPDATE_PROFILE:
            state = state.set('img', action.payload.img);
            return state.set('my_reviews', action.payload.reviews);
        default: //otherwise state is lost!
            return state;
    }
};

export default User_Login_Reducer;
