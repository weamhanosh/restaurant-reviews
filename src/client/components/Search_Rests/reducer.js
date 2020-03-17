import initialState from '../../initialState';
import {Search_RestsActionsConstants} from './constants.js';
import { List } from 'immutable';

const Search_Rests_Reducer = (state = initialState.rests, action) => {
    console.log('Search_RestsReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type){
        case Search_RestsActionsConstants.UPDATE_SEARCH_TYPE:
            return state.set('isBasic', action.payload.search_type);
        case Search_RestsActionsConstants.UPDATE_ADVANCED_SEARCH_TYPE:
            return state.set('isName', action.payload.advanced_search_type);
        case Search_RestsActionsConstants.UPDATE_TAG_RESTATURANT:
            return state.set('restaurant', action.payload.restaurant_name);
        case Search_RestsActionsConstants.UPDATE_LOCATION_RESTATURANT:
            return state.set('location', action.payload.restaurant_location);
        case Search_RestsActionsConstants.SEARCH_RESTAURANT_SUCCESS:
            state = state.set('render_results', true);
            state = state.set('no_results', false);
            console.log(action)
            return state.set('received_restaurant', action.payload.result);
        case Search_RestsActionsConstants.SEARCH_RESTAURANT_LOCATION_SUCCESS:
            if (action.payload.result === false){
                state = state.set('no_results', true);
                return state.set('render_results', true);
            }
            state = state.set('no_results', true);
            state = state.set('render_results', false);
            return state.set('arr_of_restaurant_names', action.payload);
        case Search_RestsActionsConstants.SEARCH_RESTAURANT_FAILURE:
            state = state.set('render_results', true);
            return state.set('no_results', true);
        case Search_RestsActionsConstants.SEARCH_RESTAURANT_LOCATION_FAILURE:
            state = state.set('render_results', true);
            return state.set('no_results', true);
        case Search_RestsActionsConstants.FILTER_RESTAURANT:
            return state.set('filtered_rests', action.payload);
        case Search_RestsActionsConstants.SEARCH_RESTAURANT:
            state = state.set('no_results', false);
            return state.set('render_results', false);
        case Search_RestsActionsConstants.SEARCH_RESTAURANT_LOCATION:
            state = state.set('no_results', false);
            return state.set('render_results', false);
        case Search_RestsActionsConstants.GLOBAL_FILTER_SEARCH:
            return state.set('globalFilter', action.payload.e);
        case Search_RestsActionsConstants.UPDATE_AVERAGE_ARR:
            let new_available_rests1 = state.get('available_rests');
            new_available_rests1.filter((rest) => rest.name !== action.payload.name);
            let new_restaurant_arr1 = state.get('available_rests').filter((rest) => rest.name === action.payload.name);
            let new_restaurant1 = new_restaurant_arr1[0];
            new_restaurant1.average = action.payload.new_average_arr;
            new_available_rests1.push(new_restaurant1);
            return state.set('available_rests', new_available_rests1);
        case Search_RestsActionsConstants.UPDATE_RESTAURANT_REVIEWS:
            let new_available_rests2 = state.get('available_rests');
            new_available_rests2.filter((rest) => rest.name !== action.payload.name);
            let new_restaurant_arr2 = state.get('available_rests').filter((rest) => rest.name === action.payload.name);
            let new_restaurant2 = new_restaurant_arr2[0];
            new_restaurant2.reviews = action.payload.new_reviews;
            new_available_rests2.push(new_restaurant2);
            return state.set('available_rests', new_available_rests2);
        case Search_RestsActionsConstants.UPDATE_AVERAGE:
            let new_available_rests3 = state.get('available_rests');
            new_available_rests3.filter((rest) => rest.name !== action.payload.name);
            let new_restaurant_arr3 = state.get('available_rests').filter((rest) => rest.name === action.payload.name);
            let new_restaurant3 = new_restaurant_arr3[0];
            new_restaurant3.total_average = action.payload.new_average;
            new_available_rests3.push(new_restaurant3);
            return state.set('available_rests', new_available_rests3);
        case Search_RestsActionsConstants.ADD_REVIEW:
            return state.set('render_add_review', true);
        case Search_RestsActionsConstants.BATHROOM_QUALITY_TMP:
            let tmp1 = action.payload.row;
            tmp1.bathroom_quality = action.payload.e;
            return state.set('default_review', [tmp1]);
        case Search_RestsActionsConstants.STAFF_KINDNESS_TMP:
            let tmp2 = action.payload.row;
            tmp2.staff_kindness = action.payload.e;
            return state.set('default_review', [tmp2]);
        case Search_RestsActionsConstants.CLEANLINESS_TMP:
            let tmp3 = action.payload.row;
            tmp3.cleanliness = action.payload.e;
            return state.set('default_review', [tmp3]);
        case Search_RestsActionsConstants.DRIVE_THRU_TMP:
            let tmp4 = action.payload.row;
            tmp4.drive_thru = action.payload.e;
            return state.set('default_review', [tmp4]);
        case Search_RestsActionsConstants.DELIVERY_SPEED_TMP:
            let tmp5 = action.payload.row;
            tmp5.delivery_speed = action.payload.e;
            return state.set('default_review', [tmp5]);
        case Search_RestsActionsConstants.FOOD_QUALITY_TMP:
            let tmp6 = action.payload.row;
            tmp6.food_quality = action.payload.e;
            return state.set('default_review', [tmp6]);
        case Search_RestsActionsConstants.UPDATE_IMAGES:
            console.log("IMAGES: " + action.payload)
            return state.set('images', action.payload);
        case Search_RestsActionsConstants.UPDATE_TIME:
            return state.set('time', action.payload);
        default: //otherwise state is lost!
            return state;
    }
};

export default Search_Rests_Reducer;
