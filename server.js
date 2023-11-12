const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');



require('dotenv').config();

const app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
    origin: 'https://chat-app-frontend-yevs.onrender.com',
    credentials: true,
  };
//setting the middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))


//starting connection to mongodb
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{ useNewUrlParser:true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB database connection established successfully');
})

//tell the server to use the files of mongoDB
const userRouter = require('./routes/users')
app.use('/users', userRouter);

const endpointRouter = require('./routes/endpoints')
app.use('/endpoints', endpointRouter);

const conversationRouter = require('./routes/conversations')
app.use('/conversations', conversationRouter);

const server_port = process.env.SERVER_PORT || 4000;

app.listen(server_port, ()=>{
    console.log('Server is running on port: ',server_port)
})