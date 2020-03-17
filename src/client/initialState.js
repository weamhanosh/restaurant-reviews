const {List, Map} = require('immutable');

export default {
    app: Map({
        render_rests: true,
        render_users: true,
        render_login: true,
        render_hot_search: true
    }),
    rests: Map({
        isBasic: true,
        isName: true,
        restaurant: "",
        location: "",
        images: [],
        selectedRestaurant: {},
        time: 3,
        available_rests: [{
            name:"BBB",
            location:"Beer Sheva",
            total_average: -1,
            average: [],
            reviews: []
        },
        {
            name: "Agadir",
            location: "Tel Aviv",
            total_average: -1,
            average: [],
            reviews: []
        },
        {
            name:"Fish & Bread",
            location:"Akko",
            total_average: -1,
            average: [],
            reviews: []
        }],
        filtered_rests: [],
        received_restaurant: {},
        no_results: false,
        render_results: false,
        globalFilter: "",
        arr_of_restaurant_names: [],
        render_add_review: false,
        default_review: [{
            bathroom_quality: 0,
            staff_kindness: 0,
            cleanliness: 0,
            drive_thru: 0,
            delivery_speed: 0,
            food_quality: 0
        }]
    }),
    users: Map({
        is_username: true,
        user: "",
        received_username: "",
        location: "",
        available_users: [],
        render_results: false,
        no_results: false,
        arr_of_usernames: [],
        user_reviews: [],
        globalFilter: ""
    }),
    login: Map({
        render_login: true,
        render_profile: false,
        username: "",
        password: "",
        location: "",
        img: "",
        new_username: "",
        new_password: "",
        new_location: "",
        new_availability: true,
        availability: true,
        logged_in: false,
        globalFilter: "",
        my_reviews: []
    }),
    hot_search: List()
};
