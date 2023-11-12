const webpush = require('web-push');



const publicVapiKey = 'BOjpnuXHKS_GaIOUrapvs1N7OmWry2ZMHftsKp0utbRhIG6gO43rTXEPFi8AQbgTVQbEcBasewHfuHb1Kk6_bIw';

const privateVapiKey = '_puuJdvJkIc5RB4-zdKr3sViuamrUSCFaVXOMcTRKvo';


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

