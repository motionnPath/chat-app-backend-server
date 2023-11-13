const subToPush = require('../controllers/subscribeToPushNotification')
const newPush = require('../controllers/msgSentPushNotification')
const router = require('express').Router();



// subscribe to notification Route 
router.post('/subscribe-to-push-notification',subToPush.subscribeToPush)
// new msg notification Route 
router.post('/new-msg-notification',newPush.newMsgPush)




module.exports = router;