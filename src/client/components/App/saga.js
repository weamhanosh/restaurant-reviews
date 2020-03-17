import {AppActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import AppActions from './actions'

function* loadTags(action){
    console.log('AppSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(AppActions.loadTagsSuccessAction(json));
    } catch (e) {
        yield put(AppActions.loadTagsFailureAction(e.message));
    }
}

function* getRestaurants(action){
    console.log('AppSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        const json = yield call([res, 'json']); //retrieve body of response
        yield put(AppActions.loadRestaurantsSuccessAction(json));
    } catch (e) {
        yield put(AppActions.loadRestaurantsFailureAction(e.message));
    }
}


function* AppSaga() {
    
}

export default AppSaga;
