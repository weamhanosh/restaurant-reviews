let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let user_loginSchema = new Schema({
    username: String,
    password: String,
    location: String,
    img: String,
    logged_in: Boolean,
    my_reviews: Array
});

module.exports = mongoose.model('user_logins', user_loginSchema);
