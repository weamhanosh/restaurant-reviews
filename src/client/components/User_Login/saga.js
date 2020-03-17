import {User_LoginActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import User_LoginActions from './actions'
import Search_RestsAction from '../Search_Rests/actions'

function* login_or_register_or_logout(action){
    const username = action.payload.username;
    const password = action.payload.password;
    const location = action.payload.location;
    let img;
    if (action.type === User_LoginActionsConstants.REGISTER)
        img = action.payload.img;
    console.log('User_LoginSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.type === User_LoginActionsConstants.REGISTER ?
                    {
                        "username": username,
                        "password": password,
                        "location": location,
                        "img": img
                    }
                    :
                    {
                        "username": username,
                        "password": password,
                        "location": location
                    })
            });

        const json = yield call([res, 'json']); //retrieve body of response
        if (json.result === true){
            if (action.type === User_LoginActionsConstants.LOGIN)
                yield put(User_LoginActions.successfulLoginAction(username, password, location));
            if (action.type === User_LoginActionsConstants.REGISTER)
                yield put(User_LoginActions.successfulRegisterAction(username, password, location));
            if (action.type === User_LoginActionsConstants.LOGOUT)
                yield put(User_LoginActions.successfulLogoutAction(username, password, location));
        } else {
            if (action.type === User_LoginActionsConstants.LOGIN)
                yield put(User_LoginActions.failedLoginAction(username, password, location));
            if (action.type === User_LoginActionsConstants.REGISTER)
                yield put(User_LoginActions.failedRegisterAction(username, password, location));
            if (action.type === User_LoginActionsConstants.LOGOUT)
                yield put(User_LoginActions.failedLogoutAction(username, password, location));
        }
    } catch (e) {
        if (action.type === User_LoginActionsConstants.LOGIN)
            yield put(User_LoginActions.failedLoginAction(username, password, location));
        if (action.type === User_LoginActionsConstants.REGISTER)
            yield put(User_LoginActions.failedRegisterAction(username, password, location));
        if (action.type === User_LoginActionsConstants.LOGOUT)
            yield put(User_LoginActions.failedLogoutAction(username, password, location));
    }
}

function* before_register(action){
    let username;
    if (action.type === User_LoginActionsConstants.UPDATE_USERNAME)
        username = action.payload.username;
    else if (action.type === User_LoginActionsConstants.UPDATE_NEW_USERNAME)
        username = action.payload.new_username;
    console.log('User_LoginSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username
                })
            });

        const json = yield call([res, 'json']); //retrieve body of response
        if (action.type === User_LoginActionsConstants.UPDATE_USERNAME)
            yield put(User_LoginActions.updateAvailability(json.result));
        else if (action.type === User_LoginActionsConstants.UPDATE_NEW_USERNAME)
            yield put(User_LoginActions.updateNewAvailability(json.result));
    } catch (e) {
        if (action.type === User_LoginActionsConstants.UPDATE_USERNAME)
            yield put(User_LoginActions.updateAvailability(false));
        else if (action.type === User_LoginActionsConstants.UPDATE_NEW_USERNAME)
            yield put(User_LoginActions.updateNewAvailability(false));
    }
}

function* changeProfile(action){
    const username = action.payload.username;
    const password = action.payload.password;
    const location = action.payload.location;
    let new_data;
    if (action.type === User_LoginActionsConstants.CHANGE_USERNAME)
        new_data = action.payload.new_username;
    else if (action.type === User_LoginActionsConstants.CHANGE_PASSWORD)
        new_data = action.payload.new_password;
    else if (action.type === User_LoginActionsConstants.CHANGE_LOCATION)
        new_data = action.payload.new_location;
    console.log('User_LoginSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "new_data": new_data,
                    "username": username,
                    "password": password,
                    "location": location
                })
            });

        const json = yield call([res, 'json']); //retrieve body of response
        console.log("json res is: " + json.result)
        console.log("action.type is: " + action.type)
        if (json.result === true){
            if (action.type === User_LoginActionsConstants.CHANGE_USERNAME)
                yield put(User_LoginActions.updateUsernameAction(new_data));
            if (action.type === User_LoginActionsConstants.CHANGE_PASSWORD)
                yield put(User_LoginActions.updatePasswordAction(new_data));
            if (action.type === User_LoginActionsConstants.CHANGE_LOCATION)
                yield put(User_LoginActions.updateLocationAction(new_data));
        }
    } catch (_e) {}
}

function* changeReview(action){
    const username = action.payload.username;
    const rowData = action.payload.rowData;
    const name = rowData.name;
    const new_data = action.payload.e;
        console.log('AppSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username,
                    "name": name,
                    "rowData": rowData,
                    "new_data": new_data
                })
            });

        const json = yield call([res, 'json']); //retrieve body of response
        console.log("json res is: " + json.result)
        console.log("action.type is: " + action.type)
        if (json.result !== false){
            yield put(User_LoginActions.updateMyReviewsAction(json.result));
        }
    } catch (_e) {}
}

function* deleteReview(action){
    const username = action.payload.username;
    const rowData = action.payload.rowData;
        console.log('AppSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username,
                    "rowData": rowData
                })
            });

        const json = yield call([res, 'json']); //retrieve body of response
        console.log("json res is: " + json.result_my_reviews)
        console.log("action.type is: " + action.type)
        if (json.result !== false){
            yield put(User_LoginActions.updateMyReviewsAction(json.result_my_reviews));
            yield put(Search_RestsAction.updateAverageAction(rowData.name, json.result_average_new));
            yield put(Search_RestsAction.updateTotalAverageAction(rowData.name, json.result_total_average_new));
            yield put(Search_RestsAction.updateReviewsAction(rowData.name, json.result_reviews_new));
        }
    } catch (_e) {}
}

function* getProfile(action){
    const username = action.payload.username;
        console.log('AppSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username
                })
            });

        const json = yield call([res, 'json']); //retrieve body of response
        if (json.result !== false){
            yield put(User_LoginActions.updateMyProfileAction(json.img, json.reviews));
        }
    } catch (_e) {}
}

function* User_LoginSaga() {
    //using takeEvery, you take the action away from reducer to saga
    yield takeEvery(User_LoginActionsConstants.PROFILE, getProfile);

    yield takeEvery(User_LoginActionsConstants.UPDATE_USERNAME, before_register);
    yield takeEvery(User_LoginActionsConstants.UPDATE_NEW_USERNAME, before_register);
    yield takeEvery(User_LoginActionsConstants.LOGIN, login_or_register_or_logout);
    yield takeEvery(User_LoginActionsConstants.REGISTER, login_or_register_or_logout);
    yield takeEvery(User_LoginActionsConstants.LOGOUT, login_or_register_or_logout);
    yield takeEvery(User_LoginActionsConstants.CHANGE_USERNAME, changeProfile);
    yield takeEvery(User_LoginActionsConstants.CHANGE_PASSWORD, changeProfile);
    yield takeEvery(User_LoginActionsConstants.CHANGE_LOCATION, changeProfile);
    
    yield takeEvery(User_LoginActionsConstants.NAME, changeReview);
    yield takeEvery(User_LoginActionsConstants.LOCATION, changeReview);
    yield takeEvery(User_LoginActionsConstants.BATHROOM_QUALITY, changeReview);
    yield takeEvery(User_LoginActionsConstants.STAFF_KINDNESS, changeReview);
    yield takeEvery(User_LoginActionsConstants.CLEANLINESS, changeReview);
    yield takeEvery(User_LoginActionsConstants.DRIVE_THRU, changeReview);
    yield takeEvery(User_LoginActionsConstants.DELIVERY_SPEED, changeReview);
    yield takeEvery(User_LoginActionsConstants.FOOD_QUALITY, changeReview);
    yield takeEvery(User_LoginActionsConstants.DELETE_ROW, deleteReview);
    // yield takeEvery(User_LoginActionsConstants.SEARCH_RESTAURANT, getRestaurants);
}

export default User_LoginSaga;
