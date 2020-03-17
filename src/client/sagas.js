import { all } from 'redux-saga/effects'
import AppSaga from './components/App/saga'
import Search_RestsSaga from './components/Search_Rests/saga'
import Search_UsersSaga from './components/Search_Users/saga'
import User_Login from './components/User_Login/saga'
import Hot_Search from './components/Hot_Search/saga'

export default function* Sagas() {
    yield all([
        AppSaga(),
        Search_RestsSaga(),
        Search_UsersSaga(),
        User_Login(),
        Hot_Search()
    ])
}
