require('dotenv').config();
const bodyParser = require('body-parser');
var fs = require('fs');
const path = require('path');
const cors = require('cors');
const express = require('express');

const orm = require('./backend/db/orm');



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
//app.use(express.static('client/build/'));
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true}));
//multer operations
const multer = require('multer');

//end point for multer picture-----------------/////////////////
const upload = require('multer')({ dest: 'client/build/uploads/' });

app.put( '/api/upload/:userid', upload.single('myFile'), async function( req, res ){
  let userId = req.params.userid;
  const filePath = req.file.path;
  const originalName = req.file.originalname;
 
  const fileExt = originalName.toLowerCase().substr((originalName.lastIndexOf('.'))).replace('jpeg','jpg');
    fs.renameSync( `${__dirname}/${filePath}`, `${__dirname}/${filePath}${fileExt}` );
  const imageUrl = req.file.path.replace(/\\/g, '/').replace('client/build/','/')+fileExt;
  const imgUploadDb = await orm.updateAvatar( userId, imageUrl );
  res.send( imgUploadDb );
});

//------------------------------------------------------------


// NODE ENDPOINTS
app.post( '/api/createUser', async ( req, res ) => {
    console.log( 'receving body: ', req.body );
    const Result = await orm.saveUser(req.body);
    res.send( 'user data received! ',Result)
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
app.get('/api/getUser/:id', async (req, res) => {
    console.log('received name: ', req.params.id);
    const result= await orm.findUser(req.params.id);
    res.send(result);
});
app.post('/api/uploadImage', async  (req, res) => {
  const data = await orm.uploadImage(req.body);
  console.log(`result uploaded`,data);
  res.send(data);
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


//LISTENING
var server = app.listen( PORT, function(){ console.log( `RUNNING, http://localhost:${PORT}` ); });


/*-- m.p. started the socket --*/
/*-- m.p. initialization --*/
var users = {};
const io = require('socket.io')(server);
io.on('connection', function(socket){
    console.log("[inside connection]");
  
    socket.on('Login', function(data, cb){
      console.log("[inside socket:'login']");
      if (data in users){ console.log(`${data} already is in pool.`); cb(false);
      } else { 
        console.log(`${data} added into pool.`); cb(true); 
        // keep it in object, 'key' is nickname 
        socket.nickname = data;
        users[socket.nickname]=socket; 
      }
    });

    socket.on('message-sent', function(data, callback){
        console.log("inside message-sent in server!");
        // console.log("from user : " + data.A);
        // console.log("to user : " + data.B);
        // console.log("message : " + data.T);

        // here to save it into mongo DB!
        // ..............
        console.log("Message saved in DB! ");

        console.log("<<Check whether user stills logged in...>>");
        if (!users[data.B]) return; // means when it is not logged in or already disconnected
        console.log("<<Check passed...>>" + data.B + " is still logged in");

        console.log("<<Check whether A and B are same!>>");
        console.log("from user : " + data.A);
        console.log("to user : " + data.B);
        if (users[data.A]==users[data.B]) return; // means when it is not logged in or already disconnected
        console.log("<<Check passed...>>" + data.A + " is sending to " + data.B);

        // users[socket.nickname].emit('whisp', {msg:data.T, fromUser:data.A, toUser:'Ali'});
        users[data.B].emit('whisp', {msg:data.T, fromUser:data.A, toUser:data.B});
   
    });

    socket.on('Logout', function(data, callback){
      console.log(`Force Logout for ${data} !`)
      socket.disconnect();  
      return;
    });    

  
    socket.on('disconnect', function(data){
      console.log("[inside disconnect]", (socket.nickname)? socket.nickname + ' left!' : '');
      if (!socket.nickname) return;
      delete users[socket.nickname];
    });
  

  });

  app.get('/*', function( req,res ){
    console.log("redirect to index page!");
    res.sendFile( path.join(__dirname, 'build', 'index.html') );
  });

//LISTENING
// app.listen( PORT, function(){
//     console.log( `RUNNING, http://localhost:${PORT}` ); 
// });
