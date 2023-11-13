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

    console.log("sender ===", sender)
    console.log("recipient ===", recipient)
    console.log("new_msg ===", new_msg)
    
    //find user with that recipient name in users 
    const user = await User.findOne({username:recipient})

    if (user) {

        console.log("user ==", user)

        const target_device = await Endpoint.findOne({email:user.email})


        if(!target_device)return

        console.log("target_device ==", target_device)

        const subscription = target_device.device_endpoint

        console.log("subscription ==", subscription)

        const payload = JSON.stringify({
            "title": `New message from ${sender} `, 
            "body" :`${new_msg}` 
        });


        webpush.sendNotification(subscription, payload).catch(e => console.log(e))

        console.log(' Notification sent success !!')
    }

}

module.exports = {newMsgPush}

