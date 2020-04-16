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

const user = require( './db/models/user.js' );
const goal = require( './db/models/goals')


// NODE ENDPOINTS
app.post( '/api/createUser', async ( req, res ) => {
    console.log( 'receving body: ', req.body );
    const userData = req.body

    const dbUser = new user ( userData );
    dbUser.save( (err, user )=>{
        if( err ){ console.log(err)};
        console.log(dbUser);
    } );

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

app.post( '/api/createGoal', (req, res) => {
    const newGoal = req.body;
    console.log( 'newGoal', newGoal );

    const dbGoal = new goal ( newGoal.goal );
    dbGoal.save( async (err, goal )=>{
        if( err ){ console.log(err)};
        console.log('new goal', goal);
        // adding id to user goals array
        const pushGoalId = mongoose.Types.ObjectId(goal._id);
        console.log( '[Pushing into goal into user goals: ]', pushGoalId );

        const pushGoalArray = await user.updateOne({email:`${newGoal.email}`}, { $push: { goals: pushGoalId } });
        console.log('user with new goal', pushGoalArray );
    } );
    res.send()
})
app.post( '/api/getUserGoals', async ( req, res )=> {
    const obj = req.body;
    console.log('get user goals for', obj.email );
    const userGoals = await user.findOne({ email: `${obj.email}` }).populate('goals');
    console.log( 'user goals:', userGoals );
    res.send( JSON.stringify( userGoals ));
})

//LISTENING
app.listen( PORT, function(){
    console.log( `RUNNING, http://localhost:${PORT}` ); });