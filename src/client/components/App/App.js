import React from 'react';
import './App.scss';
import Search_Rests from '../Search_Rests';
import Search_Users from '../Search_Users';
import User_Login from '../User_Login';
import Hot_Search from '../Hot_Search';
import {connect} from 'react-redux';
import AppActions from './actions';


class App extends React.Component {

    render() {
        return (
            <div className="app-root">
                <h2>Zomato Clone</h2>
                <div>
                    <User_Login/>
                </div>
                <div>
                    <Search_Rests/>
                </div>
                <div>
                    <Search_Users/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        render_login: state['app'].get('render_login'),
        render_rests: state['app'].get('render_rests'),
        render_hot_search: state['app'].get('render_hot_search'),
        render_users: state['app'].get('render_users')
        // restaurant: state['app'].get('restaurant'),
        // restaurants: state['app'].get('restaurants').toArray()
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTagsEventHandler: () => {
            dispatch(AppActions.loadTagsAction());
        },
        updateTagEventHandler: (e) => {
            dispatch(AppActions.updateTagAction(e));
        },
        loadImagesEventHandler: (tag) => {
            dispatch(GalleryActions.loadImagesAction(tag))
        },
        searchRestaurantEventHandler: (restaurant) => {
            dispatch(AppActions.searchRestaurantAction(restaurant));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
