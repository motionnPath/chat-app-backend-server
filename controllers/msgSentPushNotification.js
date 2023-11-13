const webpush = require('web-push');
require('dotenv').config();
const Endpoint = require('../models/usersEndpoint.model');


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
   

    console.log("subscription = ",subscription)

    res.status(201).json({})
    
    //create payload
    const payload = JSON.stringify({
        "title": "Your ChatCat Team", 
        "body":`Welcome ${username} ❤️ Enjoy connecting with the community` 
    });

    webpush.sendNotification(subscription, payload).catch(e => console.log(e))

    // saving recieved data to endpoints model
    const endpoint = await Endpoint.findOne({email})

    if(endpoint) {
        // update subscription of endpoint hier maybe he is logged in
        // from a new device
        await Endpoint.updateOne(
            {email:endpoint.email},
            { $set: { device_endpoint: subscription } }
        )
    }

    try {
        const newEndpoint = new Endpoint({
            email, 
            device_endpoint:subscription
        })
        await newEndpoint.save()
    }catch (err){
        console.error('new Endoint could not be saved in mongodb',err)
    }
}

module.exports = {subscribeToPush}

