import React from 'react';
import './Hot_Search.scss';
import {connect} from 'react-redux';
import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import Hot_SearchActions from './actions';

class Hot_Search extends React.Component {

    render() {
        return (
            <div className="app-root">
                    <div>
                        <h2>Hot_Search</h2>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // render_login: state['login'].get('render_login')
        // restaurant: state['rests'].get('restaurant'),
        // available_rests: state['rests'].get('available_rests')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // loginEventHandler: () => {
        //     dispatch(User_LoginActions.loginAction());
        // },
        // registerEventHandler: () => {
        //     dispatch(User_LoginActions.registerAction());
        // },
        // logoutEventHandler: () => {
        //     dispatch(User_LoginActions.logoutAction());
        // },
        // profileEventHandler: () => {
        //     dispatch(User_LoginActions.profileAction());
        // }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Hot_Search);
