import { Search_UsersActionsConstants} from './constants.js';


function updateSearchTypeAction(search_type) {
  return {
    type: Search_UsersActionsConstants.UPDATE_SEARCH_TYPE_USER,
    payload: {
        search_type
    }
  }
}

function updateTagAction(username){
  return {
      type: Search_UsersActionsConstants.UPDATE_TAG_USER,
      payload: {
        username
      }
  }
}

function search_UsersAction(username){
  return {
      uri: '/api/user_login/search_users',
      type: Search_UsersActionsConstants.SEARCH_USERS,
      payload: username
  }
}

function search_UsersLocationAction(location){
  return {
      uri: '/api/user_login/search_users_location',
      type: Search_UsersActionsConstants.SEARCH_USERS_LOCATION,
      payload: location
  }
}

function loadUserAction(result){
    return {
        type: Search_UsersActionsConstants.LOAD_USER,
        payload: result
    }
}

function loadUserLocationAction(result){
  return {
      type: Search_UsersActionsConstants.LOAD_USER_LOCATION,
      payload: result
  }
}

function globalFilterSearchAction(e){
  return {
      type: Search_UsersActionsConstants.GLOBAL_FILTER_SEARCH,
      payload: {
          e: e
      }
  }
}

// function loadTagsFailureAction(error){
//     return {
//         type: AppActionsConstants.LOAD_TAGS_FAILURE,
//         error: error
//     }
// }


// function searchRestaurantAction(keyword){
//     return {
//         type: AppActionsConstants.SEARCH_RESTAURANT,
//         uri: '/api/load/restaurants',
//         payload: keyword
//     }
// }

// function loadRestaurantsSuccessAction(restaurants){
//     return {
//         type: AppActionsConstants.SEARCH_RESTAURANT_SUCCESS,
//         payload: {
//             restaurants: restaurants
//         }
//     }
// }

// function loadRestaurantsFailureAction(error){
//     return {
//         type: AppActionsConstants.SEARCH_RESTAURANT_FAILURE,
//         error: error
//     }
// }

let Search_UsersActions  = {
    updateSearchTypeAction,
    updateTagAction,
    search_UsersAction,
    search_UsersLocationAction,
    loadUserAction,
    loadUserLocationAction,
    globalFilterSearchAction
    // loadTagsSuccessAction,
    // loadTagsFailureAction,
    // searchRestaurantAction,
    // loadRestaurantsSuccessAction,
    // loadRestaurantsFailureAction
};

export default Search_UsersActions
