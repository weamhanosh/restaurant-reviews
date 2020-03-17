import { Search_RestsActionsConstants} from './constants.js';
import {AppActionsConstants} from "../App/constants";


function updateSearchTypeAction(search_type) {
  return {
    type: Search_RestsActionsConstants.UPDATE_SEARCH_TYPE,
    payload: {
        search_type
    }
  }
}

function updateAdvancedSearchTypeAction(advanced_search_type) {
  return {
    type: Search_RestsActionsConstants.UPDATE_ADVANCED_SEARCH_TYPE,
    payload: {
        advanced_search_type
    }
  }
}

function updateTagAction(restaurant_name){
    return {
        type: Search_RestsActionsConstants.UPDATE_TAG_RESTATURANT,
        payload: {
          restaurant_name
        }
    }
}

function updateLocationAction(restaurant_location){
  return {
      type: Search_RestsActionsConstants.UPDATE_LOCATION_RESTATURANT,
      payload: {
        restaurant_location
      }
  }
}

function searchRestaurantAction(keyword, time_choice){
  return {
      type: Search_RestsActionsConstants.SEARCH_RESTAURANT,
      uri: '/api/app/search_restaurant',
      payload: {
        keyword: keyword,
        time_choice: time_choice
      }
  }
}

function searchRestaurantLocationAction(keyword){
  return {
      type: Search_RestsActionsConstants.SEARCH_RESTAURANT_LOCATION,
      uri: '/api/app/search_restaurant_location',
      payload: keyword
  }
}

function filterRestaurantsAction(results){
  return {
      type: Search_RestsActionsConstants.FILTER_RESTAURANT,
      payload: results
  }
}

function loadRestaurantSuccessAction(restaurant){
    return {
        type: Search_RestsActionsConstants.SEARCH_RESTAURANT_SUCCESS,
        payload: restaurant
    }
}

function loadRestaurantLocationSuccessAction(restaurant){
  return {
      type: Search_RestsActionsConstants.SEARCH_RESTAURANT_LOCATION_SUCCESS,
      payload: restaurant
  }
}

function loadRestaurantFailureAction(){
    return {
        type: Search_RestsActionsConstants.SEARCH_RESTAURANT_FAILURE
    }
}

function loadRestaurantLocationFailureAction(){
  return {
      type: Search_RestsActionsConstants.SEARCH_RESTAURANT_LOCATION_FAILURE
  }
}

function globalFilterSearchRestsAction(e){
  return {
      type: Search_RestsActionsConstants.GLOBAL_FILTER_SEARCH_RESTS,
      payload: {
          e: e
      }
  }
}

function addReviewAction(username, restaurant_name, location, rowData){
  return {
      uri: '/api/app/add_review',
      type: Search_RestsActionsConstants.ADD_REVIEW,
      payload: {
          username: username,
          restaurant_name: restaurant_name,
          location: location,
          rowData: rowData
      }
  }
}

function bathroom_qualityReviewAction(row, e){
  return {
      type: Search_RestsActionsConstants.BATHROOM_QUALITY_TMP,
      payload: {
        row: row,
        e: e
      }
  }
}

function staff_kindnessReviewAction(row, e){
  return {
      type: Search_RestsActionsConstants.STAFF_KINDNESS_TMP,
      payload: {
        row: row,
        e: e
      }
  }
}

function cleanlinessReviewAction(row, e){
  return {
      type: Search_RestsActionsConstants.CLEANLINESS_TMP,
      payload: {
        row: row,
        e: e
      }
  }
}

function drive_thruReviewAction(row, e){
  return {
      type: Search_RestsActionsConstants.DRIVE_THRU_TMP,
      payload: {
        row: row,
        e: e
      }
  }
}

function delivery_speedReviewAction(row, e){
  return {
      type: Search_RestsActionsConstants.DELIVERY_SPEED_TMP,
      payload: {
        row: row,
        e: e
      }
  }
}

function food_qualityReviewAction(row, e){
  return {
      type: Search_RestsActionsConstants.FOOD_QUALITY_TMP,
      payload: {
        row: row,
        e: e
      }
  }
}

function uploadImagesAction(img, name, username){
  return {
      uri: '/api/app/upload_image',
      type: Search_RestsActionsConstants.UPLOAD_IMAGES,
      payload: {
          img: img,
          name: name,
          username: username
      }
  }
}

function updateImagesAction(images){
  return {
      type: Search_RestsActionsConstants.UPDATE_IMAGES,
      payload: images
  }
}

function updateTimeAction(time) {
  return {
    type: Search_RestsActionsConstants.UPDATE_TIME,
    payload: time
  }
}

let Search_RestsActions  = {
    updateSearchTypeAction,
    updateTagAction,
    searchRestaurantAction,
    filterRestaurantsAction,
    updateAdvancedSearchTypeAction,
    updateLocationAction,
    loadRestaurantSuccessAction,
    loadRestaurantLocationSuccessAction,
    loadRestaurantFailureAction,
    loadRestaurantLocationFailureAction,
    globalFilterSearchRestsAction,
    searchRestaurantLocationAction,
    addReviewAction,
    bathroom_qualityReviewAction,
    staff_kindnessReviewAction,
    cleanlinessReviewAction,
    drive_thruReviewAction,
    delivery_speedReviewAction,
    food_qualityReviewAction,
    uploadImagesAction,
    updateImagesAction,
    updateTimeAction
};

export default Search_RestsActions
