const webpush = require('web-push');
require('dotenv').config();


//const vapidKeys = webpush.generateVAPIDKeys();

const publicVapiKey = process.env.PUBLIC_VAPI_KEY;

const privateVapiKey = process.env.PRIVATE_VAPI_KEY;


webpush.setVapidDetails(
    'mailto:getthebox8@gmail.com', 
    publicVapiKey, 
    privateVapiKey
);

const subscribeToPush = async (req,res) => {

    const { subscription }  = req.body;
   

    console.log("subscription = ",subscription)

    res.status(201).json({})
    
    //create payload
    const payload = JSON.stringify({"title":"Push test"});

    webpush.sendNotification(subscription, payload).catch(e => console.log(e))

}

module.exports = {subscribeToPush}

