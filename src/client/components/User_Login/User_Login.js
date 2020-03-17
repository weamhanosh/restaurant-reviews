import React from 'react';
import './User_Login.scss';
import {connect} from 'react-redux';
import {Button} from 'primereact/button';
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dropdown} from "primereact/dropdown";
import User_LoginActions from './actions';

class User_Login extends React.Component {


    requiredValidator(props) {
        let value = props.rowData[props.field];
        return value && value.length > 0;
    }

    render() {

        let header = (
            <div style={{'textAlign': 'left'}}>
                List of Restaurants
                <div  className="p-datatable-globalfilter-container">
                    <InputText type="search" onInput={(e) => this.props.globalFilterEventHandler(e.target.value)} placeholder="Global Search" size="50"/>
                </div>
            </div>
        );

        let ratings = [
            {label: '0', value: 0},
            {label: '1', value: 1},
            {label: '2', value: 2},
            {label: '3', value: 3},
            {label: '4', value: 4},
            {label: '5', value: 5}
        ]
        
        
            return (
            <div className="app-root">
                
                {this.props.render_login &&
                    <div>
                        <p>Username:</p>
                        <InputText value={this.props.username} onChange={(e) => this.props.updateUsernameEventHandler(e.target.value)}/>
                        {(!this.props.availability) &&
                            <p>Username "{this.props.username}" is in use!</p>}
                        <p>Password:</p>
                        <Password value={this.props.password} onChange={(e) => this.props.updatePasswordEventHandler(e.target.value)}/>
                        <p>Location:</p>
                        <InputText value={this.props.location} onChange={(e) => this.props.updateLocationEventHandler(e.target.value)}/>
                        <p></p>
                        <label>Image: </label>
                        <input type="file" name="search" accept="image/*" onChange={(e) => {
                            let fr = new FileReader();
                            fr.onloadend = () => {
                                let img = fr.result;
                                this.props.editImageEventHandler(img);
                            };
                            fr.readAsDataURL(e.target.files[0]);
                        }}/>
                    
                        <p></p>
                        <Button label="Login"
                                onClick={() => this.props.loginEventHandler(this.props.username, this.props.password, this.props.location)}/>
                        <Button label="Register"
                                onClick={() => this.props.registerEventHandler(this.props.username, this.props.password, this.props.location, this.props.img)}/>
                        
                    </div>
                }
                
                {(!this.props.render_login) && 
                    <div>
                        <p>Username "{this.props.username}" is logged in.</p>
                        {!this.props.render_profile && 
                            <Button label="Profile"
                                    onClick={(_e) => this.props.profileEventHandler(!this.props.render_profile, this.props.username)}/>
                        }
                        {this.props.render_profile && 
                            <Button label="Exit Profile"
                                    onClick={(_e) => this.props.profileEventHandler(!this.props.render_profile, this.props.username)}/>
                        }
                        <Button label="Logout"
                                onClick={() => this.props.logoutEventHandler(this.props.username, this.props.password, this.props.location)}/>
                    </div>
                }

                {this.props.render_profile &&
                    <div>
                        <p>Username: {this.props.username}</p>
                        <p>Location: {this.props.location}</p>
                        <img alt="Card" src={this.props.img}/>
                        <p>New Username:</p>
                        <InputText value={this.props.new_username} onChange={(e) => this.props.updateNewUsernameEventHandler(e.target.value)}/>
                        
                        {(!this.props.new_availability) &&
                            <p>Username "{this.props.new_username}" is in use!</p>}

                        <p>New Password:</p>
                        <Password value={this.props.new_password} onChange={(e) => this.props.updateNewPasswordEventHandler(e.target.value)}/>
                        <p>New Location:</p>
                        <InputText value={this.props.new_location} onChange={(e) => this.props.updateNewLocationEventHandler(e.target.value)}/>
                        <p></p>
                        <Button label="Change Username"
                                onClick={() => this.props.changeUsernameEventHandler(this.props.new_username, this.props.username, this.props.password, this.props.location)}/>
                        <Button label="Change Password"
                                onClick={() => this.props.changePasswordEventHandler(this.props.new_password, this.props.username, this.props.password, this.props.location)}/>
                        <Button label="Change Location"
                                onClick={() => this.props.changeLocationEventHandler(this.props.new_location, this.props.username, this.props.password, this.props.location)}/>
                        
                        <p>My Reviews:</p>
                        <div className="datatable-doc-demo">
                            <div className="content-section implementation">
                                <DataTable ref={(el) => this.dt = el} value={this.props.my_reviews} paginator={true} rows={10} header={header}
                                        globalFilter={this.props.globalFilter} emptyMessage="No records found" className="p-datatable-cars"
                                        selectionMode="single" selection={this.props.selectedRestaurant} onSelectionChange={(e) => this.props.selectRestaurantEventHandler(e.value)}
                                        editable={true}>
                                    <Column field="name" header="Name" filter sortable style={{width: '100%'}}/>
                                    <Column field="location" header="Location" filter sortable style={{width: '100%'}}/>
                                    <Column field="bathroom_quality" header="Bathroom Quality" filter sortable editor={props => <Dropdown value={props.rowData["bathroom_quality"]} onChange={(e) => this.props.bathroom_qualityEditorEventHandler(this.props.username, props.rowData, e.target.value)} options={ratings}/>} style={{width: '100%'}}/>
                                    <Column field="staff_kindness" header="Staff Kindness" filter sortable editor={props => <Dropdown value={props.rowData["staff_kindness"]} onChange={(e) => this.props.staff_kindnessEditorEventHandler(this.props.username, props.rowData, e.target.value)} options={ratings}/>} style={{width: '100%'}}/>
                                    <Column field="cleanliness" header="Cleanliness" filter sortable editor={props => <Dropdown value={props.rowData["cleanliness"]} onChange={(e) => this.props.cleanlinessEditorEventHandler(this.props.username, props.rowData, e.target.value)} options={ratings}/>} style={{width: '100%'}}/>
                                    <Column field="drive_thru" header="Drive-Thru" filter sortable editor={props => <Dropdown value={props.rowData["drive_thru"]} onChange={(e) => this.props.drive_thruEditorEventHandler(this.props.username, props.rowData, e.target.value)} options={ratings}/>} style={{width: '100%'}}/>
                                    <Column field="delivery_speed" header="Delivery Speed" filter sortable editor={props => <Dropdown value={props.rowData["delivery_speed"]} onChange={(e) => this.props.delivery_speedEditorEventHandler(this.props.username, props.rowData, e.target.value)} options={ratings}/>} style={{width: '100%'}}/>
                                    <Column field="food_quality" header="Food Quality" filter sortable editor={props => <Dropdown value={props.rowData["food_quality"]} onChange={(e) => this.props.food_qualityEditorEventHandler(this.props.username, props.rowData, e.target.value)} options={ratings}/>} style={{width: '100%'}}/>
                                    {/* <Column field="delete_review" header="Delete Review" filter sortable editor={props => <Button></Button>} style={{width: '100%'}}/> */}
                                    <Column field="delete_review" header="Delete Review" body={(rowData, column) => <Button type="button" icon="pi pi-times" onClick={_e => this.props.deleteReviewEventHandler(this.props.username, rowData)}></Button>} style={{textAlign:'center', width: '8em'}}/>
                                </DataTable>
                            </div>
                        </div>
                    </div>}
                    
                    <p></p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state['login'].get('username'),
        password: state['login'].get('password'),
        location: state['login'].get('location'),
        img: state['login'].get('img'),
        new_username: state['login'].get('new_username'),
        new_password: state['login'].get('new_password'),
        new_location: state['login'].get('new_location'),
        new_availability: state['login'].get('new_availability'),
        availability: state['login'].get('availability'),
        render_login: state['login'].get('render_login'),
        render_profile: state['login'].get('render_profile'),
        restaurant: state['rests'].get('restaurant'),
        selectedRestaurant: state['rests'].get('selectedRestaurant'),
        my_reviews: state['login'].get('my_reviews'),
        globalFilter: state['login'].get('globalFilter')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUsernameEventHandler: (e) => {
            dispatch(User_LoginActions.updateUsernameAction(e));
        },
        updatePasswordEventHandler: (e) => {
            dispatch(User_LoginActions.updatePasswordAction(e));
        },
        updateLocationEventHandler: (e) => {
            dispatch(User_LoginActions.updateLocationAction(e));
        },
        updateNewUsernameEventHandler: (e) => {
            dispatch(User_LoginActions.updateNewUsernameAction(e));
        },
        updateNewPasswordEventHandler: (e) => {
            dispatch(User_LoginActions.updateNewPasswordAction(e));
        },
        updateNewLocationEventHandler: (e) => {
            dispatch(User_LoginActions.updateNewLocationAction(e));
        },
        changeUsernameEventHandler: (new_username, username, password, location) => {
            dispatch(User_LoginActions.changeUsernameAction(new_username, username, password, location));
        },
        changePasswordEventHandler: (new_password, username, password, location) => {
            dispatch(User_LoginActions.changePasswordAction(new_password, username, password, location));
        },
        changeLocationEventHandler: (new_location, username, password, location) => {
            dispatch(User_LoginActions.changeLocationAction(new_location, username, password, location));
        },
        loginEventHandler: (username, password, location) => {
            dispatch(User_LoginActions.loginAction(username, password, location));
        },
        registerEventHandler: (username, password, location, img) => {
            dispatch(User_LoginActions.registerAction(username, password, location, img));
        },
        logoutEventHandler: (username, password, location) => {
            dispatch(User_LoginActions.logoutAction(username, password, location));
        },
        profileEventHandler: (e, username) => {
            dispatch(User_LoginActions.profileAction(e, username));
        },
        globalFilterEventHandler: (e) => {
            dispatch(User_LoginActions.globalFilterAction(e));
        },
        nameEditorEventHandler: (username, name, e) => {
            dispatch(User_LoginActions.nameAction(username, name, e));
        },
        locationEditorEventHandler: (username, name, e) => {
            dispatch(User_LoginActions.locationAction(username, name, e));
        },
        bathroom_qualityEditorEventHandler: (username, rowData, e) => {
            dispatch(User_LoginActions.bathroom_qualityAction(username, rowData, e));
        },
        staff_kindnessEditorEventHandler: (username, rowData, e) => {
            dispatch(User_LoginActions.staff_kindnessAction(username, rowData, e));
        },
        cleanlinessEditorEventHandler: (username, rowData, e) => {
            dispatch(User_LoginActions.cleanlinessAction(username, rowData, e));
        },
        drive_thruEditorEventHandler: (username, rowData, e) => {
            dispatch(User_LoginActions.drive_thruAction(username, rowData, e));
        },
        delivery_speedEditorEventHandler: (username, rowData, e) => {
            dispatch(User_LoginActions.delivery_speedAction(username, rowData, e));
        },
        food_qualityEditorEventHandler: (username, rowData, e) => {
            dispatch(User_LoginActions.food_qualityAction(username, rowData, e));
        },
        selectRestaurantEventHandler: (e) => {
            dispatch(User_LoginActions.selectRestaurantAction(e));
        },
        deleteReviewEventHandler: (username, rowData) => {
            dispatch(User_LoginActions.deleteReviewAction(username, rowData));
        },
        editImageEventHandler: (img) => {
            dispatch(User_LoginActions.editImageAction(img));
        }
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(User_Login);
