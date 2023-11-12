const webpush = require('web-push');
require('dotenv').config();


const vapidKeys = webpush.generateVAPIDKeys();

const publicVapiKey = "BOGHw5Hs6L97UJypiTH6T9XCcY6TOH9TZ9lwTSri-rmbGqzZWb7MHwnI0j3vVl0Njw7vUlEz7S0P9kP6JKsvxtU";

const privateVapiKey = "lYNaqhcRo3f20ievMiOV2aLWyAMiwEg4WnK-2pKQ1JU";


webpush.setVapidDetails(
    'mailto:getthebox8@gmail.com', 
    publicVapiKey, 
    privateVapiKey
);

const subscribeToPush = async (req,res) => {

    const subscription = req.body;
   

    console.log("subscription = ",subscription)

    res.status(201).json({})
    
    //create payload
    const payload = JSON.stringify({"title":"Push test"});

    webpush.sendNotification(subscription, payload).catch(e => console.log(e))

}

module.exports = {subscribeToPush}

