const webpush = require('web-push');
require('dotenv').config();


const vapidKeys = webpush.generateVAPIDKeys();

const publicVapiKey = "debe4d3e753ee783208b71b840ee8b0580e5e35417cd5cb0ff67bffa4d2e9a2da68b22572e337d15707159d89e873f113ddafeba4bb6cc9be69c38244a653a53";

const privateVapiKey = "4f28bbdfad153213c29cd7bcde58749716e0d612d823c495e2b6be7c8335fdb09878a7b1d2ba10fdfa6fe85cb47cec90f9eeee9c9d07f1b0ea4dd2891f12a46a";

console.log(publicVapiKey.length)
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

