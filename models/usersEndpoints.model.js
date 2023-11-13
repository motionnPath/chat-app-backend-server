const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const endpointSchema = new Schema({
    email:{
        type:String, 
        unique:true
    },
    device_endpoint: {
        type:Object, 
        unique:true
    }
},{
    timestamps: true,
})

const Endpoint = mongoose.model('Endpoint', endpointSchema);

module.exports = Endpoint; 