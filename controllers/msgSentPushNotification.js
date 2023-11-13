const webpush = require('web-push');
require('dotenv').config();
const Endpoint = require('../models/usersEndpoints.model');
const User = require('../models/user.model');


//const vapidKeys = webpush.generateVAPIDKeys();

const publicVapiKey = process.env.PUBLIC_VAPI_KEY;

const privateVapiKey = process.env.PRIVATE_VAPI_KEY;


webpush.setVapidDetails(
    'mailto:getthebox8@gmail.com', 
    publicVapiKey, 
    privateVapiKey
);

const newMsgPush = async (req,res) => {

    const { sender, recipient, new_msg }  = req.body;
   

    res.status(201).json({})
    
    //find user with that recipient name in users 
    const user = await User.findOne({username:recipient})

    if (user) {
        const target_device = await Endpoint.findOne({email:user.email})
        if(!target_device)return

        const subscription = target_device.device_endpoint
        const payload = JSON.stringify({
            "title": `New message from ${sender} `, 
            "body" :`${new_msg}` 
        });


        webpush.sendNotification(subscription, payload).catch(e => console.log(e))
    }

}

module.exports = {newMsgPush}

