require('dotenv').config();
const express = require('express');
const cors = require('cors');
const orm = require('./backend/db/orm');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('client/build/'));
app.use(express.urlencoded({ extended: false }));
// NODE ENDPOINTS
app.post( '/api/createUser', async ( req, res ) => {
    console.log( 'receving body: ', req.body );
    const Result = await orm.saveUser(req.body);
    res.send( 'user data received! ')
});

app.post( '/api/checkUser', async ( req, res ) => {
    console.log('received login info:', req.body );
    const loginCredentrials = req.body;

    const findByEmail =  await orm.findUserByEmail(req.body);
    console.log('userdata retreived:', findByEmail );
    
    if ( findByEmail.password === loginCredentrials.password ){
        res.send( {
            status : 'success',
            id : findByEmail._id
        } );
    } else {
        res.send( 'error' );
    };
    
})

app.post( '/api/createGoal',async  (req, res) => {
    const newGoal = req.body;
    console.log( 'newGoal', newGoal );
    const result= await orm.addGoal(newGoal);
    console.log(`[work done to add goal]`,result);
    res.send()
})

app.post( '/api/getUserGoals', async ( req, res )=> {
    const obj = req.body;
    console.log('get user goals for', obj.email );
    const userGoals = await orm.getUserGoals(obj);

    res.send( JSON.stringify( userGoals ));
});
app.post( '/api/getCompletedGoals', async ( req, res )=> {
    const obj = req.body;
    console.log('get user goals for', obj.email );
    const userGoals = await orm.getCompletedGoals(obj);
    const completedGoals = userGoals.goals.map((goal)=>{
        if(goal.completed === true){
            return goal
        }
    });

    res.send( JSON.stringify( completedGoals ));
});



app.post( '/api/completeGoal', async ( req, res )=> {
    const obj = req.body;
    const updateGoal = await orm.completeGoal(obj);
    console.log(`[Goal set to Completed]`,updateGoal);
    res.send('updated goal')

})
app.post( '/api/undoGoal', async ( req, res )=> {
    const obj = req.body;
    const updateGoal = orm.undoGoal(obj);
    console.log(`[Goal updated]`,updateGoal)
    res.send('updated goal')

})


app.get( '/api/userData/:emailId', async ( req, res ) => {
    console.log('received userid: ', req.params.emailId );
    const id = req.params.emailId
    const findById =  await orm.getUserByEmailId(id);
    console.log(`find by id`,findById);
    res.send(findById)
})


app.post('/api/addFollowing', async (req, res) => {
    console.log('received goal: ', req.body);
    const data = req.body;
    const result = await orm.addFollowing(data);
    res.send(result)
});

app.get('/api/user/:name', async (req, res) => {
    console.log('received name: ', req.params.name);
    const result= await orm.finduser(req.params.name);
    res.send(result);
});


app.get('/api/allusers', async (req, res) => {
    const result= await orm.allUsers();
    res.send(result);
});
app.post( '/api/getPosts', async ( req, res ) => {
    const userEmail = req.body;
    console.log('going to lookup users following for', userEmail );
    const userData = await orm.findFolloweesAndPopulate( userEmail );
    console.log( 'found user data', userData );
    res.send( userData.following )
})
app.post( '/api/postComment', async ( req, res ) => {
    const obj = req.body;
    const userData = await orm.findUserByEmail( obj);
    console.log( 'data for', obj.email, userData );
    const commentData = {
        postEmail : obj.postEmail,
        name : userData.firstName,
        body : obj.comment
    }
    const createComment = await orm.createComment( commentData );
    res.send();
})
app.post( '/api/getComments', async ( req, res ) => {
    const userEmail = req.body;
    const userData = await orm.findUserAndPopulateComments( userEmail );
    console.log( 'comments user data', userData );
    res.send( userData.comments );
})
//LISTENING
app.listen( PORT, function(){
    console.log( `RUNNING, http://localhost:${PORT}` ); });