import { User_LoginActionsConstants} from './constants.js';
import {Search_RestsActionsConstants} from '../Search_Rests/constants'

function loginAction(username, password, location) {
    return {
        type: User_LoginActionsConstants.LOGIN,
        uri: '/api/user_login/login',
        payload: {
            username: username,
            password: password,
            location: location
        }
    }
}

function registerAction(username, password, location, img){
    return {
        type: User_LoginActionsConstants.REGISTER,
        uri: '/api/user_login/register',
        payload: {
            username: username,
            password: password,
            location: location,
            img: img
        }
    }
}

function logoutAction(username, password, location){
    return {
        type: User_LoginActionsConstants.LOGOUT,
        uri: '/api/user_login/logout',
        payload: {
            username: username,
            password: password,
            location: location
        }
    }
}

function profileAction(render_profile, username){
    return {
        uri: '/api/user_login/profile_data',
        type: User_LoginActionsConstants.PROFILE,
        payload: {
            render_profile: render_profile,
            username: username
        }
    }
}

function updateUsernameAction(username){
    return {
        uri: '/api/user_login/before_register',
        type: User_LoginActionsConstants.UPDATE_USERNAME,
        payload: {
          username
        }
    }
  }

  function updatePasswordAction(password){
    return {
        type: User_LoginActionsConstants.UPDATE_PASSWORD,
        payload: {
          password
        }
    }
  }

  function updateLocationAction(location){
    return {
        type: User_LoginActionsConstants.UPDATE_LOCATION,
        payload: {
          location
        }
    }
  }

  function updateNewUsernameAction(new_username){
    return {
        uri: '/api/user_login/before_register',
        type: User_LoginActionsConstants.UPDATE_NEW_USERNAME,
        payload: {
          new_username
        }
    }
  }

  function updateNewPasswordAction(new_password){
    return {
        type: User_LoginActionsConstants.UPDATE_NEW_PASSWORD,
        payload: {
          new_password
        }
    }
  }

  function updateNewLocationAction(new_location){
    return {
        type: User_LoginActionsConstants.UPDATE_NEW_LOCATION,
        payload: {
          new_location
        }
    }
  }

  function updateNewAvailability(new_availability){
    return {
        type: User_LoginActionsConstants.UPDATE_NEW_AVAILABILITY,
        payload: {
            new_availability
        }
    }
  }

  function updateAvailability(availability){
    return {
        type: User_LoginActionsConstants.UPDATE_AVAILABILITY,
        payload: {
            availability
        }
    }
  }

  function changeUsernameAction(new_username, username, password, location){
    return {
        uri: '/api/user_login/change_username',
        type: User_LoginActionsConstants.CHANGE_USERNAME,
        payload: {
          new_username,
          username,
          password,
          location
        }
    }
  }

  function changePasswordAction(new_password, username, password, location){
    return {
        uri: '/api/user_login/change_password',
        type: User_LoginActionsConstants.CHANGE_PASSWORD,
        payload: {
            new_password,
            username,
            password,
            location
        }
    }
  }

  function changeLocationAction(new_location, username, password, location){
    return {
        uri: '/api/user_login/change_user_location',
        type: User_LoginActionsConstants.CHANGE_LOCATION,
        payload: {
            new_location,
            username,
            password,
            location
        }
    }
  }

  function successfulLoginAction(username, password, location) {
    return {
        type: User_LoginActionsConstants.SUCCESS_LOGIN,
        // uri: '/api/user_login/login',
        payload: {
            username: username,
            password: password,
            location: location
        }
    }
}

function successfulRegisterAction(username, password, location){
    return {
        type: User_LoginActionsConstants.SUCCESS_REGISTER,
        // uri: '/api/user_login/register',
        payload: {
            username: username,
            password: password,
            location: location
        }
    }
}

function successfulLogoutAction(username, password, location){
    return {
        type: User_LoginActionsConstants.SUCCESS_LOGOUT,
        // uri: '/api/user_login/logout',
        payload: {
            username: username,
            password: password,
            location: location
        }
    }
}

function failedLoginAction(username, password, location) {
    return {
        type: User_LoginActionsConstants.FAIL_LOGIN,
        // uri: '/api/user_login/login',
        payload: {
            username: username,
            password: password,
            location: location
        }
    }
}

function failedRegisterAction(username, password, location){
    return {
        type: User_LoginActionsConstants.FAIL_REGISTER,
        // uri: '/api/user_login/register',
        payload: {
            username: username,
            password: password,
            location: location
        }
    }
}

function failedLogoutAction(username, password, location){
    return {
        type: User_LoginActionsConstants.FAIL_LOGOUT,
        // uri: '/api/user_login/logout',
        payload: {
            username: username,
            password: password,
            location: location
        }
    }
}

function globalFilterAction(e){
    return {
        type: User_LoginActionsConstants.GLOBAL_FILTER,
        payload: {
            e: e
        }
    }
}

function nameAction(username, name, e){
    return {
        uri: '/api/user_login/change_name',
        type: User_LoginActionsConstants.NAME,
        payload: {
            username: username,
            name: name,
            e: e
        }
    }
}

function locationAction(username, name, e){
    return {
        uri: '/api/user_login/change_location',
        type: User_LoginActionsConstants.LOCATION,
        payload: {
            username: username,
            name: name,
            e: e
        }
    }
}

function bathroom_qualityAction(username, rowData, e){
    return {
        uri: '/api/user_login/change_bathroom_quality',
        type: User_LoginActionsConstants.BATHROOM_QUALITY,
        payload: {
            username: username,
            rowData: rowData,
            e: e
        }
    }
}

function staff_kindnessAction(username, rowData, e){
    return {
        uri: '/api/user_login/change_staff_kindness',
        type: User_LoginActionsConstants.STAFF_KINDNESS,
        payload: {
            username: username,
            rowData: rowData,
            e: e
        }
    }
}

function cleanlinessAction(username, rowData, e){
    return {
        uri: '/api/user_login/change_cleanliness',
        type: User_LoginActionsConstants.CLEANLINESS,
        payload: {
            username: username,
            rowData: rowData,
            e: e
        }
    }
}

function drive_thruAction(username, rowData, e){
    return {
        uri: '/api/user_login/change_drive_thru',
        type: User_LoginActionsConstants.DRIVE_THRU,
        payload: {
            username: username,
            rowData: rowData,
            e: e
        }
    }
}

function delivery_speedAction(username, rowData, e){
    return {
        uri: '/api/user_login/change_delivery_speed',
        type: User_LoginActionsConstants.DELIVERY_SPEED,
        payload: {
            username: username,
            rowData: rowData,
            e: e
        }
    }
}

function food_qualityAction(username, rowData, e){
    return {
        uri: '/api/user_login/change_food_quality',
        type: User_LoginActionsConstants.FOOD_QUALITY,
        payload: {
            username: username,
            rowData: rowData,
            e: e
        }
    }
}

function selectRestaurantAction(e){
    return {
        type: User_LoginActionsConstants.SELECT_RESTAURANT,
        payload: {
            e: e
        }
    }
}

function updateMyReviewsAction(new_reviews){
    return {
        type: User_LoginActionsConstants.UPDATE_REVIEWS,
        payload: {
            new_reviews: new_reviews
        }
    }
}

function updateTotalAverageAction(name, new_average){
    return {
        type: Search_RestsActionsConstants.UPDATE_AVERAGE,
        payload: {
            name: name,
            new_average: new_average
        }
    }
}

function updateAverageAction(name, new_average_arr){
    return {
        type: Search_RestsActionsConstants.UPDATE_AVERAGE_ARR,
        payload: {
            name: name,
            new_average_arr: new_average_arr
        }
    }
}

function updateReviewsAction(name, new_reviews){
    return {
        type: Search_RestsActionsConstants.UPDATE_RESTAURANT_REVIEWS,
        payload: {
            name: name,
            new_reviews: new_reviews
        }
    }
}

function editImageAction(img){
    return {
        type: User_LoginActionsConstants.EDIT_IMAGE,
        payload: img
    }
}

function updateMyProfileAction(img, reviews){
    return {
        type: User_LoginActionsConstants.UPDATE_PROFILE,
        payload: {
            img: img,
            reviews: reviews
        }
    }
}

function deleteReviewAction(username, rowData){
    return {
        uri: '/api/user_login/delete_review',
        type: User_LoginActionsConstants.DELETE_ROW,
        payload: {
            username: username,
            rowData: rowData
        }
    }
}

let User_LoginActions  = {
    loginAction,
    registerAction,
    logoutAction,
    profileAction,
    updateUsernameAction,
    updatePasswordAction,
    updateLocationAction,
    updateNewUsernameAction,
    updateNewPasswordAction,
    updateNewLocationAction,
    updateNewAvailability,
    updateAvailability,
    changeUsernameAction,
    changePasswordAction,
    changeLocationAction,
    successfulLoginAction,
    successfulRegisterAction,
    successfulLogoutAction,
    failedLoginAction,
    failedRegisterAction,
    failedLogoutAction,
    globalFilterAction,
    nameAction,
    locationAction,
    bathroom_qualityAction,
    staff_kindnessAction,
    cleanlinessAction,
    drive_thruAction,
    delivery_speedAction,
    food_qualityAction,
    selectRestaurantAction,
    updateMyReviewsAction,
    deleteReviewAction,
    updateTotalAverageAction,
    updateAverageAction,
    updateReviewsAction,
    editImageAction,
    updateMyProfileAction
};

export default User_LoginActions
