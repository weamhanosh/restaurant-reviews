import {Search_UsersActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import Search_UsersActions from './actions'

function* getUsers(action){
    const data = action.payload;
    console.log('Search_UsersSaga=', action);
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "data": data
                })
            });

        const json = yield call([res, 'json']); //retrieve body of response
        if (action.type === 'SEARCH_USERS'){
                yield put(Search_UsersActions.loadUserAction(json));
        } else if (action.type === 'SEARCH_USERS_LOCATION'){
            if (json.result !== false) {
                let arr = [];
                (json.result).forEach(element => {
                    arr.push(element.username);
                });
                console.log(arr);
                yield put(Search_UsersActions.loadUserLocationAction(arr));
            } else {
                yield put(Search_UsersActions.loadUserLocationAction(json));
            }
        }
    } catch (e) {
    }
}

function* Search_UsersSaga() {
    //using takeEvery, you take the action away from reducer to saga
    // yield takeEvery(Search_UsersActionsConstants.LOAD_TAGS, loadTags);
    yield takeEvery(Search_UsersActionsConstants.SEARCH_USERS, getUsers);
    yield takeEvery(Search_UsersActionsConstants.SEARCH_USERS_LOCATION, getUsers);
}

export default Search_UsersSaga;
