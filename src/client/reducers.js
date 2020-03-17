import { combineReducers } from 'redux';
import AppReducer from './components/App/reducer';
import Search_Rests from './components/Search_Rests/reducer';
import Search_Users from './components/Search_Users/reducer';
import User_Login from './components/User_Login/reducer';
import Hot_Search from './components/Hot_Search/reducer';


export default combineReducers({
  app: AppReducer,
  rests: Search_Rests,
  users: Search_Users,
  login: User_Login,
  hot_search: Hot_Search
});
