const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

//MONGOOSE CONECTION AND STUFF
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/goalTracker', {useNewUrlParser: true, useUnifiedTopology: true,});
mongoose.set('useCreateIndex', true);

const connection = mongoose.connection;
connection.once( 'open', () => {
    console.log('MongoDB connection established successfully')
})

const user = require( './db/models/user.js' )


// NODE ENDPOINTS
app.post( '/api/createUser', async ( req, res ) => {
    console.log( 'receving body: ', req.body );
    const userData = req.body

    const dbUser = new user ( userData );
    dbUser.save(  );

    res.send( 'user data received! ')
});

app.post( '/api/checkUser', async ( req, res ) => {
    console.log('received login info:', req.body );
    const loginCredentrials = req.body;

    const findByEmail =  await user.findOne({ email: loginCredentrials.email }, (err, data) => {
        if(err){
          return ('err');
        }
        return (data);
      });
    console.log('userdata retreived:', findByEmail );
    
    if ( findByEmail.password === loginCredentrials.password ){
        res.send( 'success' );
    } else {
        res.send( 'error' );
    };
    
})

//LISTENING
app.listen( PORT, function(){
    console.log( `RUNNING, http://localhost:${PORT}` ); });