import React from 'react';
import './Search_Users.scss';
import {connect} from 'react-redux';
import {Button} from 'primereact/button';
import {RadioButton} from 'primereact/radiobutton';
import {InputText} from "primereact/inputtext";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import Search_UsersActions from './actions';

class Search_Users extends React.Component {

    render() { 
        
        let header = (
            // <div style={{'textAlign': 'left'}}>
                // User's reviews
                <div  className="p-datatable-globalfilter-container" style={{'textAlign': 'left'}}>
                    <InputText type="search" onInput={(e) => this.props.globalFilterEventHandler(e.target.value)} placeholder="Global Search" size="50"/>
                </div>
            // </div>
        );

        return (
            <div className="app-root">
                <RadioButton inputId="rb2" name="city" value={true} onChange={(e) => this.props.updateSearchTypeEventHandler(e)} checked={this.props.is_username} />
                            <label htmlFor="rb2" className="p-radiobutton-label">Username</label>
                <p></p>
                <RadioButton inputId="rb2" name="city" value={false} onChange={(e) => this.props.updateSearchTypeEventHandler(e)} checked={!this.props.is_username} />
                            <label htmlFor="rb2" className="p-radiobutton-label">Location</label>
                <p></p>
                <InputText value={this.props.user} placeholder={this.props.is_username ? "Username" : "User Location"} onChange={(e) => this.props.updateTagEventHandler(e.target.value)}/>
                {this.props.is_username &&
                    <Button label="Search username" onClick={() => this.props.searchUsersEventHandler(this.props.user)}/>
                }
                {!this.props.is_username &&
                    <Button label="Search user locations" onClick={() => this.props.searchUsersLocationEventHandler(this.props.user)}/>
                }
                <p></p>
                {this.props.no_results &&
                    <div>
                        {this.props.render_results &&
                            <p>No records found</p>
                        }
                    </div>}
                {this.props.render_results &&
                    <div>
                         {!this.props.no_results &&
                            <div>
                                <p>Username: {this.props.received_username}</p>
                                <p>User's location: {this.props.location}</p>
                                <p>User's reviews:</p>
                                <DataTable ref={(el1) => this.dt1 = el1} value={this.props.user_reviews} paginator={true} rows={10} header={header}
                                        globalFilter={this.props.globalFilter} emptyMessage="No records found" className="p-datatable-cars">
                                    <Column field="name" header="Name" filter sortable style={{width: '100%'}}/>
                                    <Column field="location" header="Location" filter sortable style={{width: '100%'}}/>
                                    <Column field="bathroom_quality" header="Bathroom Quality" filter sortable style={{width: '100%'}}/>
                                    <Column field="staff_kindness" header="Staff Kindness" filter sortable style={{width: '100%'}}/>
                                    <Column field="cleanliness" header="Cleanliness" filter sortable style={{width: '100%'}}/>
                                    <Column field="drive_thru" header="Drive-Thru" filter sortable style={{width: '100%'}}/>
                                    <Column field="delivery_speed" header="Delivery Speed" filter sortable style={{width: '100%'}}/>
                                    <Column field="food_quality" header="Food Quality" filter sortable style={{width: '100%'}}/>
                                </DataTable>
                            </div>
                        }
                    </div>
                }
                {!this.props.render_results &&
                    <div>
                        {this.props.no_results &&
                            <div>
                                <p>Usernames found are:</p>
                                {this.props.arr_of_usernames.toString()}
                                <p>You can view each user's profile individually by searching using username</p>
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        is_username: state['users'].get('is_username'),
        user: state['users'].get('user'),
        location: state['users'].get('location'),
        received_username: state['users'].get('received_username'),
        available_users: state['users'].get('available_users'),
        arr_of_usernames: state['users'].get('arr_of_usernames'),
        render_results: state['users'].get('render_results'),
        no_results: state['users'].get('no_results'),
        user_reviews: state['users'].get('user_reviews'),
        globalFilter: state['users'].get('globalFilter')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateSearchTypeEventHandler: (e) => {
            dispatch(Search_UsersActions.updateSearchTypeAction(e.value));
        },
        updateTagEventHandler: (e) => {
            dispatch(Search_UsersActions.updateTagAction(e));
        },
        searchUsersEventHandler: (e) => {
            dispatch(Search_UsersActions.search_UsersAction(e));
        },
        searchUsersLocationEventHandler: (e) => {
            dispatch(Search_UsersActions.search_UsersLocationAction(e));
        },
        globalFilterEventHandler: (e) => {
            dispatch(Search_UsersActions.globalFilterSearchAction(e));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search_Users);
