import React from 'react';
import './Search_Rests.scss';
import {connect} from 'react-redux';
import {Button} from 'primereact/button';
import {RadioButton} from 'primereact/radiobutton';
import {InputText} from "primereact/inputtext";
import {AutoComplete} from "primereact/autocomplete";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dropdown} from "primereact/dropdown";
import Search_RestsActions from './actions';

class Search_Rests extends React.Component {

    
    render() {
        
        let header_average = (
            <div style={{'textAlign': 'left'}}>
                Average scores (total average: {this.props.received_restaurant.total_average})
                {/* <div  className="p-datatable-globalfilter-container" style={{'textAlign': 'left'}}>
                    <InputText type="search" onInput={(e) => this.props.globalFilterEventHandler(e.target.value)} placeholder="Global Search" size="50"/>
                </div> */}
            </div>
        );

        let header = (
            <div style={{'textAlign': 'left'}}>
                User reviews
                <div  className="p-datatable-globalfilter-container" style={{'textAlign': 'left'}}>
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

        var lst = document.createElement('ul')

        return (
            <div className="app-root">
                <div className="for-radios">
                    <div>
                        <RadioButton inputId="rb2" name="city" value={true} onChange={(e) => this.props.updateSearchTypeEventHandler(e)} checked={this.props.isBasic} />
                                    <label htmlFor="rb2" className="p-radiobutton-label">Basic Restaurant Search</label>
                        <p></p>
                        <RadioButton inputId="rb2" name="city" value={false} onChange={(e) => this.props.updateSearchTypeEventHandler(e)} checked={!this.props.isBasic} />
                                    <label htmlFor="rb2" className="p-radiobutton-label">Advanced Restaurant Search</label>
                        <p></p>
                    </div>
                    <div>
                        <RadioButton inputId="rb3" name="city" value={0} onChange={(e) => this.props.updateTimeEventHandler(e)} checked={this.props.time === 0} />
                                    <label htmlFor="rb3" className="p-radiobutton-label">Since last week</label>
                        <p></p>
                        <RadioButton inputId="rb3" name="city" value={1} onChange={(e) => this.props.updateTimeEventHandler(e)} checked={this.props.time === 1} />
                                    <label htmlFor="rb3" className="p-radiobutton-label">Since last month</label>
                        <p></p>
                        <RadioButton inputId="rb3" name="city" value={2} onChange={(e) => this.props.updateTimeEventHandler(e)} checked={this.props.time === 2} />
                                    <label htmlFor="rb3" className="p-radiobutton-label">Since last year</label>
                        <p></p>
                        <RadioButton inputId="rb3" name="city" value={3} onChange={(e) => this.props.updateTimeEventHandler(e)} checked={this.props.time === 3} />
                                    <label htmlFor="rb3" className="p-radiobutton-label">All results</label>
                        <p></p>
                    </div>
                </div>
                {this.props.isBasic &&
                    <div>
                        {/* <InputText value={this.props.restaurant} onChange={(e) => this.props.updateTagEventHandler(e.target.value)}/> */}
                        <AutoComplete value={this.props.restaurant} suggestions={this.props.filtered_rests}
                            size={30} placeholder="Restaurant Name" minLength={0} onChange={(e) => this.props.updateTagEventHandler(e.value)}
                            completeMethod={(event) => {
                                setTimeout(() => {
                                    var results = this.props.available_rests.filter((restaurant) => {
                                        return restaurant.name.toLowerCase().includes(event.query.toLowerCase());
                                    });
                                    let res = results.map((restaurant) => restaurant.name);
                                    this.props.filterRestaurantsEventHandler(res);
                                }, 250)
                            }}
                            />
                        <Button label="Basic Restaurant Search"
                            onClick={() => this.props.searchRestaurantEventHandler(this.props.restaurant, this.props.time)}/>
                    </div>}
                <p></p>
                {(!this.props.isBasic) &&
                    <div>
                        <RadioButton inputId="rb22" name="city2" value={true} onChange={(e) => this.props.updateAdvancedSearchTypeEventHandler(e)} checked={this.props.isName} />
                                <label htmlFor="rb22" className="p-radiobutton-label">Name Search</label>
                        <p></p>
                        <RadioButton inputId="rb22" name="city2" value={false} onChange={(e) => this.props.updateAdvancedSearchTypeEventHandler(e)} checked={!this.props.isName} />
                                <label htmlFor="rb22" className="p-radiobutton-label">Location Search</label>
                        <p></p>
                        {this.props.isName && 
                            <div>
                                <AutoComplete value={this.props.restaurant} suggestions={this.props.filtered_rests}
                                size={30} placeholder="Restaurant Name" minLength={0} onChange={(e) => this.props.updateTagEventHandler(e.value)}
                                completeMethod={(event) => {
                                    setTimeout(() => {
                                        var results = this.props.available_rests.filter((restaurant) => {
                                            return restaurant.name.toLowerCase().includes(event.query.toLowerCase());
                                        });
                                        let res = results.map((restaurant) => restaurant.name);
                                        this.props.filterRestaurantsEventHandler(res);
                                    }, 250)
                                }}
                                />
                                <Button label="Advanced Restaurant Search"
                                    onClick={() => this.props.searchRestaurantEventHandler(this.props.restaurant, this.props.time)}/>
                            </div>
                        }
                        {!this.props.isName && 
                            <div>
                                <AutoComplete value={this.props.location} suggestions={this.props.filtered_rests}
                                    size={30} placeholder="Restaurant Location" minLength={0} onChange={(e) => this.props.updateLocationEventHandler(e.value)}
                                    completeMethod={(event) => {
                                        setTimeout(() => {
                                            var results = this.props.available_rests.filter((restaurant) => {
                                                return restaurant.location.toLowerCase().includes(event.query.toLowerCase());
                                            });
                                            let res = results.map((restaurant) => restaurant.location);
                                        this.props.filterRestaurantsEventHandler(res);
                                        }, 250)
                                    }}
                                    />
                                <Button label="Advanced Restaurant Search"
                                    onClick={() => this.props.searchRestaurantLocationEventHandler(this.props.location)}/>
                            </div>
                        }
                    </div>
                }
                {this.props.render_results &&
                    <div>
                        {this.props.no_results &&
                            <p>No records found</p>
                        }
                    </div>
                }
                {this.props.render_results &&
                    <div>
                        {!this.props.no_results &&
                            <div id="abc">
                                <p>Restaurant name: {this.props.received_restaurant.name}</p>
                                <p>Location: {this.props.received_restaurant.location}</p>
                                {/* {this.props.images.forEach(img => {
                                    // var li = document.createElement('li');
                                    // li.innerHTML = "<img alt=\"Card\" src={img}/>";
                                    // lst.appendChild(li);
                                    // var app = document.querySelector('#abc');
                                    // app.appendChild(lst);
                                })} */}
                                <img alt="" src={this.props.images[0] !== undefined ? this.props.images[0].img : ""}/>
                                <img alt="" src={this.props.images[1] !== undefined ? this.props.images[1].img : ""}/>
                                <img alt="" src={this.props.images[2] !== undefined ? this.props.images[2].img : ""}/>
                                <img alt="" src={this.props.images[3] !== undefined ? this.props.images[3].img : ""}/>
                                <img alt="" src={this.props.images[4] !== undefined ? this.props.images[4].img : ""}/>
                                <img alt="" src={this.props.images[5] !== undefined ? this.props.images[5].img : ""}/>
                                <img alt="" src={this.props.images[6] !== undefined ? this.props.images[6].img : ""}/>
                                <img alt="" src={this.props.images[7] !== undefined ? this.props.images[7].img : ""}/>
                                <img alt="" src={this.props.images[8] !== undefined ? this.props.images[8].img : ""}/>
                                <img alt="" src={this.props.images[9] !== undefined ? this.props.images[9].img : ""}/>
                                <DataTable ref={(el2) => this.dt2 = el2} value={this.props.received_restaurant.average} header={header_average} emptyMessage="No records found" className="p-datatable-cars">
                                    <Column field="bathroom_quality" header="Bathroom Quality" style={{width: '100%'}}/>
                                    <Column field="staff_kindness" header="Staff Kindness" style={{width: '100%'}}/>
                                    <Column field="cleanliness" header="Cleanliness" style={{width: '100%'}}/>
                                    <Column field="drive_thru" header="Drive-Thru" style={{width: '100%'}}/>
                                    <Column field="delivery_speed" header="Delivery Speed" style={{width: '100%'}}/>
                                    <Column field="food_quality" header="Food Quality" style={{width: '100%'}}/>
                                </DataTable>
                                <DataTable ref={(el3) => this.dt3 = el3} value={this.props.received_restaurant.reviews} header={header} emptyMessage="No records found" className="p-datatable-cars">
                                    <Column field="username" header="Username" filter sortable style={{width: '100%'}}/>
                                    <Column field="bathroom_quality" header="Bathroom Quality" filter sortable style={{width: '100%'}}/>
                                    <Column field="staff_kindness" header="Staff Kindness" filter sortable style={{width: '100%'}}/>
                                    <Column field="cleanliness" header="Cleanliness" filter sortable style={{width: '100%'}}/>
                                    <Column field="drive_thru" header="Drive-Thru" filter sortable style={{width: '100%'}}/>
                                    <Column field="delivery_speed" header="Delivery Speed" filter sortable style={{width: '100%'}}/>
                                    <Column field="food_quality" header="Food Quality" filter sortable style={{width: '100%'}}/>
                                    <Column field="creation_date" header="Creation Date" filter sortable style={{width: '100%'}}/>
                                </DataTable>
                                {!this.props.render_login &&
                                    <div>
                                        <div className="datatable-doc-demo">
                                            <div className="content-section implementation">
                                                <DataTable ref={(el4) => this.dt4 = el4} value={this.props.default_review}
                                                        globalFilter={this.props.globalFilter} emptyMessage="No records found" className="p-datatable-cars" editable={true}>
                                                    <Column field="bathroom_quality" header="Bathroom Quality" editor={props => <Dropdown value={props.rowData["bathroom_quality"]} onChange={(e) => this.props.bathroom_qualityEditorEventHandler(props.rowData, e.target.value)} options={ratings}/>} style={{width: '100%'}}/>
                                                    <Column field="staff_kindness" header="Staff Kindness" editor={props => <Dropdown value={props.rowData["staff_kindness"]} onChange={(e) => this.props.staff_kindnessEditorEventHandler(props.rowData, e.target.value)} options={ratings}/>} style={{width: '100%'}}/>
                                                    <Column field="cleanliness" header="Cleanliness" editor={props => <Dropdown value={props.rowData["cleanliness"]} onChange={(e) => this.props.cleanlinessEditorEventHandler(props.rowData, e.target.value)} options={ratings}/>} style={{width: '100%'}}/>
                                                    <Column field="drive_thru" header="Drive-Thru" editor={props => <Dropdown value={props.rowData["drive_thru"]} onChange={(e) => this.props.drive_thruEditorEventHandler(props.rowData, e.target.value)} options={ratings}/>} style={{width: '100%'}}/>
                                                    <Column field="delivery_speed" header="Delivery Speed" editor={props => <Dropdown value={props.rowData["delivery_speed"]} onChange={(e) => this.props.delivery_speedEditorEventHandler(props.rowData, e.target.value)} options={ratings}/>} style={{width: '100%'}}/>
                                                    <Column field="food_quality" header="Food Quality" editor={props => <Dropdown value={props.rowData["food_quality"]} onChange={(e) => this.props.food_qualityEditorEventHandler(props.rowData, e.target.value)} options={ratings}/>} style={{width: '100%'}}/>
                                                    <Column field="img" header="Upload Image" body={(rowData, colum) =>
                                        <input type="file" name="search" multiple={true} accept="image/*" onChange={(e) => {
                                            // let fr = new FileReader();
                                            // fr.onloadend = () => {
                                            //     let img = fr.result;
                                            //     this.props.editImageEventHandler(img);
                                            // };
                                            // fr.readAsDataURL(e.target.files[0]);
                
                                            let x = this.props;
                                            function readmultifiles(files) {
                                                var reader = new FileReader();
                                                function readFile(index) {
                                                  if( index >= files.length ) return;
                                                  var file = files[index];
                                                  reader.onload = function(e) {  
                                                    // get file content  
                                                    var img = e.target.result;
                                                    x.uploadImagesEventHandler(img, x.restaurant, x.username);
                                                    // do sth with bin
                                                    readFile(index+1)
                                                  }
                                                  reader.readAsDataURL(file);
                                                }
                                                readFile(0);
                                              }
                
                                              readmultifiles(e.target.files);
                                        }}/>}
                                        style={{width: '100%'}} />
                                                    <Column field="add_review" header="Add Review" body={(rowData, _column) => <Button type="button" icon="pi pi-plus" onClick={_e => this.props.addReviewEventHandler(this.props.username, this.props.received_restaurant.name, this.props.received_restaurant.location, rowData)}></Button>} style={{textAlign:'center', width: '8em'}}/>
                                                </DataTable>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                </div>
                }
                {!this.props.render_results &&
                    <div>
                        {this.props.no_results &&
                            <div>
                                <p>Restaurants found at this location are:</p>
                                {this.props.arr_of_restaurant_names.toString()}
                                <p>You can view each restaurant individually by searching using the restaurant name</p>
                            </div>
                        }
                    </div>
                }
                <p></p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        username: state['login'].get('username'),
        isBasic: state['rests'].get('isBasic'),
        isName: state['rests'].get('isName'),
        restaurant: state['rests'].get('restaurant'),
        location: state['rests'].get('location'),
        images: state['rests'].get('images'),
        time: state['rests'].get('time'),
        no_results: state['rests'].get('no_results'),
        render_results: state['rests'].get('render_results'),
        available_rests: state['rests'].get('available_rests'),
        filtered_rests: state['rests'].get('filtered_rests'),
        received_restaurant: state['rests'].get('received_restaurant'),
        globalFilter: state['rests'].get('globalFilter'),
        arr_of_restaurant_names: state['rests'].get('arr_of_restaurant_names'),
        render_login: state['login'].get('render_login'),
        default_review: state['rests'].get('default_review')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateSearchTypeEventHandler: (e) => {
            dispatch(Search_RestsActions.updateSearchTypeAction(e.value));
        },
        updateAdvancedSearchTypeEventHandler: (e) => {
            dispatch(Search_RestsActions.updateAdvancedSearchTypeAction(e.value));
        },
        updateTagEventHandler: (e) => {
            dispatch(Search_RestsActions.updateTagAction(e));
        },
        updateLocationEventHandler: (e) => {
            dispatch(Search_RestsActions.updateLocationAction(e));
        },
        searchRestaurantEventHandler: (restaurant, time_choice) => {
            dispatch(Search_RestsActions.searchRestaurantAction(restaurant, time_choice));
        },
        searchRestaurantLocationEventHandler: (location) => {
            dispatch(Search_RestsActions.searchRestaurantLocationAction(location));
        },
        filterRestaurantsEventHandler: (results) => {
            dispatch(Search_RestsActions.filterRestaurantsAction(results));
        },
        globalFilterEventHandler: (e) => {
            dispatch(Search_RestsActions.globalFilterSearchRestsAction(e));
        },
        addReviewEventHandler: (username, restaurant_name, location, rowData) => {
            dispatch(Search_RestsActions.addReviewAction(username, restaurant_name, location, rowData));
        },
        bathroom_qualityEditorEventHandler: (row, e) => {
            dispatch(Search_RestsActions.bathroom_qualityReviewAction(row, e));
        },
        staff_kindnessEditorEventHandler: (row, e) => {
            dispatch(Search_RestsActions.staff_kindnessReviewAction(row, e));
        },
        cleanlinessEditorEventHandler: (row, e) => {
            dispatch(Search_RestsActions.cleanlinessReviewAction(row, e));
        },
        drive_thruEditorEventHandler: (row, e) => {
            dispatch(Search_RestsActions.drive_thruReviewAction(row, e));
        },
        delivery_speedEditorEventHandler: (row, e) => {
            dispatch(Search_RestsActions.delivery_speedReviewAction(row, e));
        },
        food_qualityEditorEventHandler: (row, e) => {
            dispatch(Search_RestsActions.food_qualityReviewAction(row, e));
        },
        uploadImagesEventHandler: (img, name, username) => {
            dispatch(Search_RestsActions.uploadImagesAction(img, name, username));
        },
        updateTimeEventHandler: (e) => {
            dispatch(Search_RestsActions.updateTimeAction(e.value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search_Rests);
