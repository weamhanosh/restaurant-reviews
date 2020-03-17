let AppModel = require('../model/app');
let User_Login_Model = require('../model/user_login');

const express = require('express');
const router = express.Router();

let _handleError = function(err){
    if (err) return console.log(err);
};

router.post('/search_restaurant', (req, res) => {
    console.log('checking users array (search_restaurant)');
    const name = req.body.name;
    const time_choice = req.body.time_choice;
    console.log(time_choice)
    AppModel
        .findOne({name: name})
        .then(doc => {
            if (doc === null) {
                res.json({"result": false});
            } else {
                let current_date = Date.now();
                let reviews_new = doc.reviews;
                let x = reviews_new.filter((review) => {
                    // console.log(current_date)
                    // console.log(review.creation_date.getTime())
                    let diff = current_date - review.creation_date.getTime();
                    console.log(diff);
                    switch (time_choice) {
                        case 0:
                            if (diff <= 604800000)
                                return true;
                            break;
                        case 1:
                            if (diff <= 2628000000)
                                return true;
                            break;
                        case 2:
                            if (diff <= 31540000000)
                                return true;
                            break;
                        default:
                            return true;
                    }
                    return false;
                })
                doc.reviews = x;
                console.log(x);

                res.json({"result": doc});
            }
        })
        .catch(e => {
            console.log(e)
        })
});

router.post('/search_restaurant_location', (req, res) => {
    console.log('checking users array (search_restaurant_location)');
    const location = req.body.location;
    AppModel
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



router.post('/add_review', (req, res) => {
    console.log('checking users array (add_review)');
    const username = req.body.username;
    const restaurant_name = req.body.restaurant_name;
    const location = req.body.location;
    const rowData = req.body.rowData;
    User_Login_Model
        .findOne({username: username})
        .then(doc => {
            if (doc === null) {
                res.json({"result": false});
            } else {
                let my_reviews_new = doc.my_reviews;
                let check_duplicate = my_reviews_new.filter((review) => review.name === restaurant_name)
                if (check_duplicate.length < 1){
                    my_reviews_new.push(
                        {
                            "name": restaurant_name,
                            "location": location,
                            "creation_date": Date.now(),
                            "bathroom_quality": rowData.bathroom_quality,
                            "staff_kindness": rowData.staff_kindness,
                            "cleanliness": rowData.cleanliness,
                            "drive_thru": rowData.drive_thru,
                            "delivery_speed": rowData.delivery_speed,
                            "food_quality": rowData.food_quality
                        })
                }
                
                User_Login_Model
                .findOneAndUpdate({username: username}, {my_reviews: my_reviews_new}, {useFindAndModify: false}, (_err, doc) =>{
                    if (doc === null)
                        res.json({"result": false});
                    else {
                        AppModel
                        .findOne({name: restaurant_name})
                        .then(doc => {
                            if (doc === null) {
                                res.json({"result": false});
                            } else {
                                let reviews_new = doc.reviews;
                                let check_duplicate = reviews_new.filter((review) => review.username === username)
                                if (check_duplicate.length < 1){
                                    reviews_new.push(
                                    {
                                        "username": username,
                                        "creation_date": Date.now(),
                                        "bathroom_quality": rowData.bathroom_quality,
                                        "staff_kindness": rowData.staff_kindness,
                                        "cleanliness": rowData.cleanliness,
                                        "drive_thru": rowData.drive_thru,
                                        "delivery_speed": rowData.delivery_speed,
                                        "food_quality": rowData.food_quality
                                        })
                                }
                                
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

                                AppModel
                                .findOneAndUpdate({name: restaurant_name}, {reviews: reviews_new, average: average_arr, total_average: total_average_new}, {useFindAndModify: false}, (_err, doc) =>{
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

router.post('/upload_image', (req, res) => {
    console.log('checking users array (upload_image)');
    const img = req.body.img;
    const name = req.body.name;
    const username = req.body.username;
    console.log(username)
    AppModel
        .findOne({name: name})
        .then(doc => {
            if (doc === null) {
                res.json({"result": false});
            } else {
                let images_new = doc.images;
                images_new.push({
                    img: img,
                    username: username
                });
                console.log(images_new.length)

                AppModel
                    .findOneAndUpdate({name: name}, {images: images_new}, {useFindAndModify: false})
                    .then(doc => {
                        if (doc === null) {
                            res.json({"result": false});
                        } else {
                            res.json({"result": images_new});
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
                // res.json({"result": doc});
            }
        })
        .catch(e => {
            console.log(e)
        })
});

module.exports = router;
