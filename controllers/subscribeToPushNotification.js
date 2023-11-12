const webpush = require('web-push');
require('dotenv').config();



const publicVapiKey = webpush.generateVAPIDKeys().publicKey;

const privateVapiKey = webpush.generateVAPIDKeys().privateKey;


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

