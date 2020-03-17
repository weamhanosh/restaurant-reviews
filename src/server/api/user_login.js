const express = require('express');
const router = express.Router();

let User_Login_Model = require('../model/user_login');
let AppModel = require('../model/app');

let _handleError = function(err){
    if (err) return console.log(err);
};

router.post('/before_register', (req, res) => {
    console.log('checking users array (before register)');
    const username = req.body.username;
    User_Login_Model
        .findOne({username: username})
        .then(doc => {
            if (doc === null) {
                console.log(`username ${username} is unused!`);
                res.json({"result": true});
            } else {
                console.log(`username ${username} is used!`);
                res.json({"result": false});
            }
        })
        .catch(e => {
            console.log(e)
        })
});

router.post('/register', function(req, res) {
    console.log('updating users array (register)');
    const username = req.body.username;
    const password = req.body.password;
    const location = req.body.location;
    const img = req.body.img;
    User_Login_Model
    .findOne({username: username})
        .then(doc => {
            if (doc === null) {
                User_Login_Model.create(
                    {
                        username: username,
                        password: password,
                        location: location,
                        img: img,
                        logged_in: true,
                        my_reviews: []
                    }
                )
                res.json({"result": true});
            } else {
                console.log(`username ${username} is used!`);
                res.json({"result": false});
            }
        })
        .catch(e => {
            console.log(e)
        })
});

router.post('/login', (req, res) => {
    console.log('updating users array (login)');
    const username = req.body.username;
    const password = req.body.password;
    const location = req.body.location;
    User_Login_Model
        .findOneAndUpdate({username: username, password: password, location: location, logged_in: false}, {logged_in: true}, {useFindAndModify: false}, (_err, doc) =>{
            if (doc === null)
                res.json({"result": false});
            else
                res.json({"result": true});
            
        })
});

router.post('/logout', (req, res) => {
    console.log('updating users array (logout)');
    const username = req.body.username;
    const password = req.body.password;
    const location = req.body.location;
    User_Login_Model
        .findOneAndUpdate({username: username, password: password, location: location, logged_in: true}, {logged_in: false}, {useFindAndModify: false}, (_err, doc) =>{
            if (doc === null)
                res.json({"result": false});
            else
                res.json({"result": true});
        })
});

router.post('/change_username', (req, res) => {
    console.log('updating users array (change_username)');
    const username = req.body.username;
    const password = req.body.password;
    const location = req.body.location;
    const new_data = req.body.new_data;
    User_Login_Model
        .findOneAndUpdate({username: username, password: password, location: location}, {username: new_data}, {useFindAndModify: false}, (_err, doc) =>{
            if (doc === null)
                res.json({"result": false});
            else
                res.json({"result": true});
        })
});

router.post('/change_password', (req, res) => {
    console.log('updating users array (change_password)');
    const username = req.body.username;
    const password = req.body.password;
    const location = req.body.location;
    const new_data = req.body.new_data;
    User_Login_Model
        .findOneAndUpdate({username: username, password: password, location: location}, {password: new_data}, {useFindAndModify: false}, (_err, doc) =>{
            if (doc === null)
                res.json({"result": false});
            else
                res.json({"result": true});
        })
});

router.post('/change_user_location', (req, res) => {
    console.log('updating users array (change_user_location)');
    const username = req.body.username;
    const password = req.body.password;
    const location = req.body.location;
    const new_data = req.body.new_data;
    User_Login_Model
        .findOneAndUpdate({username: username, password: password, location: location}, {location: new_data}, {useFindAndModify: false}, (_err, doc) =>{
            if (doc === null)
                res.json({"result": false});
            else
                res.json({"result": true});
        })
});

router.post('/change_name', (req, res) => {
    console.log('updating users array (change_name)');
    const username = req.body.username;
    const name = req.body.name;
    const new_data = req.body.new_data;
    User_Login_Model
        .findOne({username: username})
        .then(doc => {
            if (doc === null) {
                res.json({"result": false});
            } else {
                let my_reviews = doc.my_reviews;
                let my_reviews_new = my_reviews.filter((review) => review.name !== name);
                let new_review = my_reviews.find((review) => review.name === name);
                new_review.name = new_data;
                my_reviews_new.push(new_review);

                User_Login_Model
                .findOneAndUpdate({username: username}, {my_reviews: my_reviews_new}, {useFindAndModify: false}, (_err, doc) =>{
                    if (doc === null)
                        res.json({"result": false});
                    else
                        res.json({"result": true});
                })
            }
        })
});

router.post('/change_location', (req, res) => {
    console.log('updating users array (change_location)');
    const username = req.body.username;
    const name = req.body.name;
    const new_data = req.body.new_data;
    User_Login_Model
        .findOne({username: username})
        .then(doc => {
            if (doc === null) {
                res.json({"result": false});
            } else {
                let my_reviews = doc.my_reviews;
                let my_reviews_new = my_reviews.filter((review) => review.name !== name);
                let new_review = my_reviews.find((review) => review.name === name);
                new_review.location = new_data;
                my_reviews_new.push(new_review);
                
                User_Login_Model
                .findOneAndUpdate({username: username}, {my_reviews: my_reviews_new}, {useFindAndModify: false}, (_err, doc) =>{
                    if (doc === null)
                        res.json({"result": false});
                    else
                        res.json({"result": true});
                })
            }
        })
});

router.post('/change_bathroom_quality', (req, res) => {
    console.log('updating users array (change_bathroom_quality)');
    const username = req.body.username;
    const name = req.body.name;
    const rowData = req.body.rowData;
    const new_data = req.body.new_data;
    User_Login_Model
        .findOne({username: username})
        .then(doc => {
            if (doc === null) {
                res.json({"result": false});
            } else {
                let my_reviews = doc.my_reviews;
                let my_reviews_new = my_reviews.filter((review) => review.name !== name);
                let new_review = my_reviews.find((review) => review.name === name);
                new_review.bathroom_quality = new_data;
                my_reviews_new.push(new_review);
                User_Login_Model
                .findOneAndUpdate({username: username}, {my_reviews: my_reviews_new}, {useFindAndModify: false}, (_err, doc) =>{
                    if (doc === null){
                        res.json({"result": false});
                    } else {
                        AppModel
                        .findOne({name: name})
                        .then(doc => {
                            if (doc === null) {
                                res.json({"result": false});
                            } else {
                                ///////////////////////////////
                                let reviews = doc.reviews;
                                let reviews_new = reviews.filter((review) => review.username !== username);
                            
                                let new_review = {
                                    username: username,
                                    bathroom_quality: new_data,
                                    staff_kindness: rowData.staff_kindness,
                                    cleanliness: rowData.cleanliness,
                                    drive_thru: rowData.drive_thru,
                                    delivery_speed: rowData.delivery_speed,
                                    food_quality: rowData.food_quality,
                                };
                                reviews_new.push(new_review);

                                let sum_bathroom_quality = reviews_new.reduce((acc, curr) => acc += curr.bathroom_quality, 0);
                                let average_bathroom_quality = sum_bathroom_quality / reviews_new.length;
                                let sum_staff_kindness = reviews_new.reduce((acc, curr) => acc += curr.staff_kindness, 0);
                                let average_staff_kindness = sum_staff_kindness / reviews_new.length;
                                let sum_cleanliness = reviews_new.reduce((acc, curr) => acc += curr.cleanliness, 0);
                                let average_cleanliness = sum_cleanliness / reviews_new.length;
                                let sum_drive_thru = reviews_new.reduce((acc, curr) => acc += curr.drive_thru, 0);
                                let average_drive_thru = sum_drive_thru / reviews_new.length;
                                let sum_delivery_speed = reviews_new.reduce((acc, curr) => acc += curr.delivery_speed, 0);
                                let average_delivery_speed = sum_delivery_speed / reviews_new.length;
                                let sum_food_quality = reviews_new.reduce((acc, curr) => acc += curr.food_quality, 0);
                                let average_food_quality = sum_food_quality / reviews_new.length;

                                let average_arr = [
                                    {
                                        bathroom_quality: average_bathroom_quality,
                                        staff_kindness: average_staff_kindness,
                                        cleanliness: average_cleanliness,
                                        drive_thru: average_drive_thru,
                                        delivery_speed: average_delivery_speed,
                                        food_quality: average_food_quality
                                    }
                                ];

                                let sum_new = reviews_new.reduce((acc, curr) => acc += curr.bathroom_quality + curr.staff_kindness + curr.cleanliness + curr.drive_thru + curr.delivery_speed + curr.food_quality, 0);
                                let total_average_new = sum_new / (reviews_new.length * 6);
                                
                                if (reviews_new.length === 0){
                                    average_arr = [];
                                    total_average_new = -1;
                                }

                                AppModel
                                .findOneAndUpdate({name: name}, {reviews: reviews_new, average: average_arr, total_average: total_average_new}, {useFindAndModify: false}, (_err, doc) => {
                                    console.log('ghjkjhgfcghjkl;')
                                    console.log(doc)
                                    console.log('ghjkjhgfcghjkl;')
                                    console.log(reviews_new)
                                    if (doc === null)
                                        res.json({"result": false});
                                    else {
                                        res.json({"result": my_reviews_new});
                                    }
                                })

                            }
                        })
                        ///////////////////////////////////////////
                    }
                })
            }
        })
});

router.post('/change_staff_kindness', (req, res) => {
    console.log('updating users array (change_staff_kindness)');
    const username = req.body.username;
    const name = req.body.name;
    const rowData = req.body.rowData;
    const new_data = req.body.new_data;
    User_Login_Model
        .findOne({username: username})
        .then(doc => {
            if (doc === null) {
                res.json({"result": false});
            } else {
                let my_reviews = doc.my_reviews;
                let my_reviews_new = my_reviews.filter((review) => review.name !== name);
                let new_review = my_reviews.find((review) => review.name === name);
                new_review.staff_kindness = new_data;
                my_reviews_new.push(new_review);
                User_Login_Model
                .findOneAndUpdate({username: username}, {my_reviews: my_reviews_new}, {useFindAndModify: false}, (_err, doc) =>{
                    if (doc === null){
                        res.json({"result": false});
                    } else {
                        AppModel
                        .findOne({name: name})
                        .then(doc => {
                            if (doc === null) {
                                res.json({"result": false});
                            } else {
                                ///////////////////////////////
                                let reviews = doc.reviews;
                                let reviews_new = reviews.filter((review) => review.username !== username);
                            
                                let new_review = {
                                    username: username,
                                    bathroom_quality: rowData.bathroom_quality,
                                    staff_kindness: new_data,
                                    cleanliness: rowData.cleanliness,
                                    drive_thru: rowData.drive_thru,
                                    delivery_speed: rowData.delivery_speed,
                                    food_quality: rowData.food_quality,
                                };
                                reviews_new.push(new_review);

                                let sum_bathroom_quality = reviews_new.reduce((acc, curr) => acc += curr.bathroom_quality, 0);
                                let average_bathroom_quality = sum_bathroom_quality / reviews_new.length;
                                let sum_staff_kindness = reviews_new.reduce((acc, curr) => acc += curr.staff_kindness, 0);
                                let average_staff_kindness = sum_staff_kindness / reviews_new.length;
                                let sum_cleanliness = reviews_new.reduce((acc, curr) => acc += curr.cleanliness, 0);
                                let average_cleanliness = sum_cleanliness / reviews_new.length;
                                let sum_drive_thru = reviews_new.reduce((acc, curr) => acc += curr.drive_thru, 0);
                                let average_drive_thru = sum_drive_thru / reviews_new.length;
                                let sum_delivery_speed = reviews_new.reduce((acc, curr) => acc += curr.delivery_speed, 0);
                                let average_delivery_speed = sum_delivery_speed / reviews_new.length;
                                let sum_food_quality = reviews_new.reduce((acc, curr) => acc += curr.food_quality, 0);
                                let average_food_quality = sum_food_quality / reviews_new.length;

                                let average_arr = [
                                    {
                                        bathroom_quality: average_bathroom_quality,
                                        staff_kindness: average_staff_kindness,
                                        cleanliness: average_cleanliness,
                                        drive_thru: average_drive_thru,
                                        delivery_speed: average_delivery_speed,
                                        food_quality: average_food_quality
                                    }
                                ];

                                let sum_new = reviews_new.reduce((acc, curr) => acc += curr.bathroom_quality + curr.staff_kindness + curr.cleanliness + curr.drive_thru + curr.delivery_speed + curr.food_quality, 0);
                                let total_average_new = sum_new / (reviews_new.length * 6);
                                
                                if (reviews_new.length === 0){
                                    average_arr = [];
                                    total_average_new = -1;
                                }

                                AppModel
                                .findOneAndUpdate({name: name}, {reviews: reviews_new, average: average_arr, total_average: total_average_new}, {useFindAndModify: false}, (_err, doc) => {
                                    if (doc === null)
                                        res.json({"result": false});
                                    else {
                                        res.json({"result": my_reviews_new});
                                    }
                                })

                            }
                        })
                        ///////////////////////////////////////////
                    }
                })
            }
        })
});

router.post('/change_cleanliness', (req, res) => {
    console.log('updating users array (change_cleanliness)');
    const username = req.body.username;
    const name = req.body.name;
    const rowData = req.body.rowData;
    const new_data = req.body.new_data;
    User_Login_Model
        .findOne({username: username})
        .then(doc => {
            if (doc === null) {
                res.json({"result": false});
            } else {
                let my_reviews = doc.my_reviews;
                let my_reviews_new = my_reviews.filter((review) => review.name !== name);
                let new_review = my_reviews.find((review) => review.name === name);
                new_review.cleanliness = new_data;
                my_reviews_new.push(new_review);
                User_Login_Model
                .findOneAndUpdate({username: username}, {my_reviews: my_reviews_new}, {useFindAndModify: false}, (_err, doc) =>{
                    if (doc === null){
                        res.json({"result": false});
                    } else {
                        AppModel
                        .findOne({name: name})
                        .then(doc => {
                            if (doc === null) {
                                res.json({"result": false});
                            } else {
                                ///////////////////////////////
                                let reviews = doc.reviews;
                                let reviews_new = reviews.filter((review) => review.username !== username);
                            
                                let new_review = {
                                    username: username,
                                    bathroom_quality: rowData.bathroom_quality,
                                    staff_kindness: rowData.staff_kindness,
                                    cleanliness: new_data,
                                    drive_thru: rowData.drive_thru,
                                    delivery_speed: rowData.delivery_speed,
                                    food_quality: rowData.food_quality,
                                };
                                reviews_new.push(new_review);

                                let sum_bathroom_quality = reviews_new.reduce((acc, curr) => acc += curr.bathroom_quality, 0);
                                let average_bathroom_quality = sum_bathroom_quality / reviews_new.length;
                                let sum_staff_kindness = reviews_new.reduce((acc, curr) => acc += curr.staff_kindness, 0);
                                let average_staff_kindness = sum_staff_kindness / reviews_new.length;
                                let sum_cleanliness = reviews_new.reduce((acc, curr) => acc += curr.cleanliness, 0);
                                let average_cleanliness = sum_cleanliness / reviews_new.length;
                                let sum_drive_thru = reviews_new.reduce((acc, curr) => acc += curr.drive_thru, 0);
                                let average_drive_thru = sum_drive_thru / reviews_new.length;
                                let sum_delivery_speed = reviews_new.reduce((acc, curr) => acc += curr.delivery_speed, 0);
                                let average_delivery_speed = sum_delivery_speed / reviews_new.length;
                                let sum_food_quality = reviews_new.reduce((acc, curr) => acc += curr.food_quality, 0);
                                let average_food_quality = sum_food_quality / reviews_new.length;

                                let average_arr = [
                                    {
                                        bathroom_quality: average_bathroom_quality,
                                        staff_kindness: average_staff_kindness,
                                        cleanliness: average_cleanliness,
                                        drive_thru: average_drive_thru,
                                        delivery_speed: average_delivery_speed,
                                        food_quality: average_food_quality
                                    }
                                ];

                                let sum_new = reviews_new.reduce((acc, curr) => acc += curr.bathroom_quality + curr.staff_kindness + curr.cleanliness + curr.drive_thru + curr.delivery_speed + curr.food_quality, 0);
                                let total_average_new = sum_new / (reviews_new.length * 6);
                                
                                if (reviews_new.length === 0){
                                    average_arr = [];
                                    total_average_new = -1;
                                }

                                AppModel
                                .findOneAndUpdate({name: name}, {reviews: reviews_new, average: average_arr, total_average: total_average_new}, {useFindAndModify: false}, (_err, doc) => {
                                    if (doc === null)
                                        res.json({"result": false});
                                    else {
                                        res.json({"result": my_reviews_new});
                                    }
                                })

                            }
                        })
                        ///////////////////////////////////////////
                    }
                })
            }
        })
});

router.post('/change_drive_thru', (req, res) => {
    console.log('updating users array (change_drive_thru)');
    const username = req.body.username;
    const name = req.body.name;
    const rowData = req.body.rowData;
    const new_data = req.body.new_data;
    User_Login_Model
        .findOne({username: username})
        .then(doc => {
            if (doc === null) {
                res.json({"result": false});
            } else {
                let my_reviews = doc.my_reviews;
                let my_reviews_new = my_reviews.filter((review) => review.name !== name);
                let new_review = my_reviews.find((review) => review.name === name);
                new_review.drive_thru = new_data;
                my_reviews_new.push(new_review);
                User_Login_Model
                .findOneAndUpdate({username: username}, {my_reviews: my_reviews_new}, {useFindAndModify: false}, (_err, doc) =>{
                    if (doc === null){
                        res.json({"result": false});
                    } else {
                        AppModel
                        .findOne({name: name})
                        .then(doc => {
                            if (doc === null) {
                                res.json({"result": false});
                            } else {
                                ///////////////////////////////
                                let reviews = doc.reviews;
                                let reviews_new = reviews.filter((review) => review.username !== username);
                            
                                let new_review = {
                                    username: username,
                                    bathroom_quality: rowData.bathroom_quality,
                                    staff_kindness: rowData.staff_kindness,
                                    cleanliness: rowData.cleanliness,
                                    drive_thru: new_data,
                                    delivery_speed: rowData.delivery_speed,
                                    food_quality: rowData.food_quality,
                                };
                                reviews_new.push(new_review);

                                let sum_bathroom_quality = reviews_new.reduce((acc, curr) => acc += curr.bathroom_quality, 0);
                                let average_bathroom_quality = sum_bathroom_quality / reviews_new.length;
                                let sum_staff_kindness = reviews_new.reduce((acc, curr) => acc += curr.staff_kindness, 0);
                                let average_staff_kindness = sum_staff_kindness / reviews_new.length;
                                let sum_cleanliness = reviews_new.reduce((acc, curr) => acc += curr.cleanliness, 0);
                                let average_cleanliness = sum_cleanliness / reviews_new.length;
                                let sum_drive_thru = reviews_new.reduce((acc, curr) => acc += curr.drive_thru, 0);
                                let average_drive_thru = sum_drive_thru / reviews_new.length;
                                let sum_delivery_speed = reviews_new.reduce((acc, curr) => acc += curr.delivery_speed, 0);
                                let average_delivery_speed = sum_delivery_speed / reviews_new.length;
                                let sum_food_quality = reviews_new.reduce((acc, curr) => acc += curr.food_quality, 0);
                                let average_food_quality = sum_food_quality / reviews_new.length;

                                let average_arr = [
                                    {
                                        bathroom_quality: average_bathroom_quality,
                                        staff_kindness: average_staff_kindness,
                                        cleanliness: average_cleanliness,
                                        drive_thru: average_drive_thru,
                                        delivery_speed: average_delivery_speed,
                                        food_quality: average_food_quality
                                    }
                                ];

                                let sum_new = reviews_new.reduce((acc, curr) => acc += curr.bathroom_quality + curr.staff_kindness + curr.cleanliness + curr.drive_thru + curr.delivery_speed + curr.food_quality, 0);
                                let total_average_new = sum_new / (reviews_new.length * 6);
                                
                                if (reviews_new.length === 0){
                                    average_arr = [];
                                    total_average_new = -1;
                                }

                                AppModel
                                .findOneAndUpdate({name: name}, {reviews: reviews_new, average: average_arr, total_average: total_average_new}, {useFindAndModify: false}, (_err, doc) => {
                                    if (doc === null)
                                        res.json({"result": false});
                                    else {
                                        res.json({"result": my_reviews_new});
                                    }
                                })

                            }
                        })
                        ///////////////////////////////////////////
                    }
                })
            }
        })
});

router.post('/change_delivery_speed', (req, res) => {
    console.log('updating users array (change_delivery_speed)');
    const username = req.body.username;
    const name = req.body.name;
    const rowData = req.body.rowData;
    const new_data = req.body.new_data;
    User_Login_Model
        .findOne({username: username})
        .then(doc => {
            if (doc === null) {
                res.json({"result": false});
            } else {
                let my_reviews = doc.my_reviews;
                let my_reviews_new = my_reviews.filter((review) => review.name !== name);
                let new_review = my_reviews.find((review) => review.name === name);
                new_review.delivery_speed = new_data;
                my_reviews_new.push(new_review);
                User_Login_Model
                .findOneAndUpdate({username: username}, {my_reviews: my_reviews_new}, {useFindAndModify: false}, (_err, doc) =>{
                    if (doc === null){
                        res.json({"result": false});
                    } else {
                        AppModel
                        .findOne({name: name})
                        .then(doc => {
                            if (doc === null) {
                                res.json({"result": false});
                            } else {
                                ///////////////////////////////
                                let reviews = doc.reviews;
                                let reviews_new = reviews.filter((review) => review.username !== username);
                            
                                let new_review = {
                                    username: username,
                                    bathroom_quality: rowData.bathroom_quality,
                                    staff_kindness: rowData.staff_kindness,
                                    cleanliness: rowData.cleanliness,
                                    drive_thru: rowData.drive_thru,
                                    delivery_speed: new_data,
                                    food_quality: rowData.food_quality,
                                };
                                reviews_new.push(new_review);

                                let sum_bathroom_quality = reviews_new.reduce((acc, curr) => acc += curr.bathroom_quality, 0);
                                let average_bathroom_quality = sum_bathroom_quality / reviews_new.length;
                                let sum_staff_kindness = reviews_new.reduce((acc, curr) => acc += curr.staff_kindness, 0);
                                let average_staff_kindness = sum_staff_kindness / reviews_new.length;
                                let sum_cleanliness = reviews_new.reduce((acc, curr) => acc += curr.cleanliness, 0);
                                let average_cleanliness = sum_cleanliness / reviews_new.length;
                                let sum_drive_thru = reviews_new.reduce((acc, curr) => acc += curr.drive_thru, 0);
                                let average_drive_thru = sum_drive_thru / reviews_new.length;
                                let sum_delivery_speed = reviews_new.reduce((acc, curr) => acc += curr.delivery_speed, 0);
                                let average_delivery_speed = sum_delivery_speed / reviews_new.length;
                                let sum_food_quality = reviews_new.reduce((acc, curr) => acc += curr.food_quality, 0);
                                let average_food_quality = sum_food_quality / reviews_new.length;

                                let average_arr = [
                                    {
                                        bathroom_quality: average_bathroom_quality,
                                        staff_kindness: average_staff_kindness,
                                        cleanliness: average_cleanliness,
                                        drive_thru: average_drive_thru,
                                        delivery_speed: average_delivery_speed,
                                        food_quality: average_food_quality
                                    }
                                ];

                                let sum_new = reviews_new.reduce((acc, curr) => acc += curr.bathroom_quality + curr.staff_kindness + curr.cleanliness + curr.drive_thru + curr.delivery_speed + curr.food_quality, 0);
                                let total_average_new = sum_new / (reviews_new.length * 6);
                                
                                if (reviews_new.length === 0){
                                    average_arr = [];
                                    total_average_new = -1;
                                }

                                AppModel
                                .findOneAndUpdate({name: name}, {reviews: reviews_new, average: average_arr, total_average: total_average_new}, {useFindAndModify: false}, (_err, doc) => {
                                    if (doc === null)
                                        res.json({"result": false});
                                    else {
                                        res.json({"result": my_reviews_new});
                                    }
                                })

                            }
                        })
                        ///////////////////////////////////////////
                    }
                })
            }
        })
});

router.post('/change_food_quality', (req, res) => {
    console.log('updating users array (change_food_quality)');
    const username = req.body.username;
    const name = req.body.name;
    const rowData = req.body.rowData;
    const new_data = req.body.new_data;
    User_Login_Model
        .findOne({username: username})
        .then(doc => {
            if (doc === null) {
                res.json({"result": false});
            } else {
                let my_reviews = doc.my_reviews;
                let my_reviews_new = my_reviews.filter((review) => review.name !== name);
                let new_review = my_reviews.find((review) => review.name === name);
                new_review.food_quality = new_data;
                my_reviews_new.push(new_review);
                User_Login_Model
                .findOneAndUpdate({username: username}, {my_reviews: my_reviews_new}, {useFindAndModify: false}, (_err, doc) =>{
                    if (doc === null){
                        res.json({"result": false});
                    } else {
                        AppModel
                        .findOne({name: name})
                        .then(doc => {
                            if (doc === null) {
                                res.json({"result": false});
                            } else {
                                ///////////////////////////////
                                let reviews = doc.reviews;
                                let reviews_new = reviews.filter((review) => review.username !== username);
                            
                                let new_review = {
                                    username: username,
                                    bathroom_quality: rowData.bathroom_quality,
                                    staff_kindness: rowData.staff_kindness,
                                    cleanliness: rowData.cleanliness,
                                    drive_thru: rowData.drive_thru,
                                    delivery_speed: rowData.delivery_speed,
                                    food_quality: new_data,
                                };
                                reviews_new.push(new_review);

                                let sum_bathroom_quality = reviews_new.reduce((acc, curr) => acc += curr.bathroom_quality, 0);
                                let average_bathroom_quality = sum_bathroom_quality / reviews_new.length;
                                let sum_staff_kindness = reviews_new.reduce((acc, curr) => acc += curr.staff_kindness, 0);
                                let average_staff_kindness = sum_staff_kindness / reviews_new.length;
                                let sum_cleanliness = reviews_new.reduce((acc, curr) => acc += curr.cleanliness, 0);
                                let average_cleanliness = sum_cleanliness / reviews_new.length;
                                let sum_drive_thru = reviews_new.reduce((acc, curr) => acc += curr.drive_thru, 0);
                                let average_drive_thru = sum_drive_thru / reviews_new.length;
                                let sum_delivery_speed = reviews_new.reduce((acc, curr) => acc += curr.delivery_speed, 0);
                                let average_delivery_speed = sum_delivery_speed / reviews_new.length;
                                let sum_food_quality = reviews_new.reduce((acc, curr) => acc += curr.food_quality, 0);
                                let average_food_quality = sum_food_quality / reviews_new.length;

                                let average_arr = [
                                    {
                                        bathroom_quality: average_bathroom_quality,
                                        staff_kindness: average_staff_kindness,
                                        cleanliness: average_cleanliness,
                                        drive_thru: average_drive_thru,
                                        delivery_speed: average_delivery_speed,
                                        food_quality: average_food_quality
                                    }
                                ];

                                let sum_new = reviews_new.reduce((acc, curr) => acc += curr.bathroom_quality + curr.staff_kindness + curr.cleanliness + curr.drive_thru + curr.delivery_speed + curr.food_quality, 0);
                                let total_average_new = sum_new / (reviews_new.length * 6);
                                
                                if (reviews_new.length === 0){
                                    average_arr = [];
                                    total_average_new = -1;
                                }

                                AppModel
                                .findOneAndUpdate({name: name}, {reviews: reviews_new, average: average_arr, total_average: total_average_new}, {useFindAndModify: false}, (_err, doc) => {
                                    if (doc === null)
                                        res.json({"result": false});
                                    else {
                                        res.json({"result": my_reviews_new});
                                    }
                                })

                            }
                        })
                        ///////////////////////////////////////////
                    }
                })
            }
        })
});

router.post('/delete_review', (req, res) => {
    console.log('updating users array (delete_review)');
    const username = req.body.username;
    const rowData = req.body.rowData;
    User_Login_Model
        .findOne({username: username})
        .then(doc => {
            if (doc === null) {
                res.json({"result": false});
            } else {
                let my_reviews = doc.my_reviews;
                let my_reviews_new = my_reviews.filter((review) => review.name !== rowData.name);
                
                User_Login_Model
                .findOneAndUpdate({username: username}, {my_reviews: my_reviews_new}, {useFindAndModify: false}, (_err, doc) =>{
                    if (doc === null)
                        res.json({"result": false});
                    else {
                        AppModel
                        .findOne({name: rowData.name})
                        .then(doc => {
                            if (doc === null) {
                                res.json({"result": false});
                            } else {
                                let reviews = doc.reviews;
                                let reviews_new = reviews.filter((review) => review.username !== username);
                                
                                let images = doc.images;
                                let images_new = images.filter((img) => img.username !== username);

                                console.log(images.length)

                                let sum_bathroom_quality = reviews_new.reduce((acc, curr) => acc += curr.bathroom_quality, 0);
                                let average_bathroom_quality = sum_bathroom_quality / reviews_new.length;
                                let sum_staff_kindness = reviews_new.reduce((acc, curr) => acc += curr.staff_kindness, 0);
                                let average_staff_kindness = sum_staff_kindness / reviews_new.length;
                                let sum_cleanliness = reviews_new.reduce((acc, curr) => acc += curr.cleanliness, 0);
                                let average_cleanliness = sum_cleanliness / reviews_new.length;
                                let sum_drive_thru = reviews_new.reduce((acc, curr) => acc += curr.drive_thru, 0);
                                let average_drive_thru = sum_drive_thru / reviews_new.length;
                                let sum_delivery_speed = reviews_new.reduce((acc, curr) => acc += curr.delivery_speed, 0);
                                let average_delivery_speed = sum_delivery_speed / reviews_new.length;
                                let sum_food_quality = reviews_new.reduce((acc, curr) => acc += curr.food_quality, 0);
                                let average_food_quality = sum_food_quality / reviews_new.length;

                                let average_arr = [
                                    {
                                        bathroom_quality: average_bathroom_quality,
                                        staff_kindness: average_staff_kindness,
                                        cleanliness: average_cleanliness,
                                        drive_thru: average_drive_thru,
                                        delivery_speed: average_delivery_speed,
                                        food_quality: average_food_quality
                                    }
                                ];

                                let sum_new = reviews_new.reduce((acc, curr) => acc += curr.bathroom_quality + curr.staff_kindness + curr.cleanliness + curr.drive_thru + curr.delivery_speed + curr.food_quality, 0);
                                let total_average_new = sum_new / (reviews_new.length * 6);
                                
                                if (reviews_new.length === 0){
                                    average_arr = [];
                                    total_average_new = -1;
                                }
                                AppModel
                                .findOneAndUpdate({name: rowData.name}, {reviews: reviews_new, average: average_arr, total_average: total_average_new, images: images_new}, {useFindAndModify: false}, (_err, doc) =>{
                                    if (doc === null)
                                        res.json({"result": false});
                                    else {
                                        res.json({"result_my_reviews": my_reviews_new, "result_reviews_new": reviews_new, "result_total_average_new": total_average_new, "result_average_new": average_arr});
                                    }
                                })

                            }
                        })
                    }
                })
            }
        })
});

router.post('/search_users', (req, res) => {
    console.log('updating users array (search_users)');
    const username = req.body.data;
    User_Login_Model
        .findOne({username: username})
        .then(doc => {
            if (doc === null) {
                res.json({"result": false});
            } else {
                res.json({"result": doc});
            }
        })
        .catch(e => {
            console.log(e)
        })
    });
    
    router.post('/search_users_location', (req, res) => {
        console.log('updating users array (search_users_location)');
        const location = req.body.data;
        User_Login_Model
        .find({location: location})
        .then(doc => {
            if (doc.length < 1) {
                res.json({"result": false});
            } else {
                res.json({"result": doc});
            }
        })
        .catch(e => {
            console.log(e)
        })
    });

    router.post('/profile_data', (req, res) => {
        console.log('updating users array (profile_data)');
        const username = req.body.username;
        console.log(username)
        User_Login_Model
        .findOne({username: username})
        .then(doc => {
            if (doc === null) {
                res.json({"result": false});
            } else {
                res.json({"img": doc.img, "reviews": doc.my_reviews});
            }
        })
        .catch(e => {
            console.log(e)
        })
    });

module.exports = router;