const webpush = require('web-push');
require('dotenv').config();
const Endpoint = require('../models/usersEndpoints.model');


//const vapidKeys = webpush.generateVAPIDKeys();

const publicVapiKey = process.env.PUBLIC_VAPI_KEY;

const privateVapiKey = process.env.PRIVATE_VAPI_KEY;


webpush.setVapidDetails(
    'mailto:getthebox8@gmail.com', 
    publicVapiKey, 
    privateVapiKey
);

const subscribeToPush = async (req,res) => {

    const { subscription, username, email }  = req.body;
   

    res.status(201).json({})
    
    //create payload
    const payload = JSON.stringify({
        "title": "Your ChatCat Team", 
        "body":`Welcome ${username} ❤️ Enjoy connecting with the community` 
    });

    

    // saving recieved data to endpoints model
    const endpoint = await Endpoint.findOne({email})

    if(endpoint) {
        webpush.sendNotification(subscription, payload).catch(e => console.log(e))
    }
    
}

module.exports = {subscribeToPush}

