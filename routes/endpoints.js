const subToPush = require('../controllers/subscribeToPushNotification')
const router = require('express').Router();



// subscribe to notification Route 
router.post('/subscribe-to-push-notification',subToPush.subscribeToPush)




module.exports = router;