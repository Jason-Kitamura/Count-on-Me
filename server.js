//require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const orm = require('./backend/db/orm');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
//app.use(express.static(path.join(__dirname, "build")));
app.use(express.static('client/build/'));
app.use(express.urlencoded({ extended: false }));
// NODE ENDPOINTS
app.post('/api/createUser', async (req, res) => {
    console.log('receving body: ', req.body);
    const userData = req.body;
    const dbUser = await orm.saveUser(userData);
    res.send('user data received! ')
});

app.post('/api/checkUser/', async function (req, res) {
    let email = req.body;
    console.log('[Email Received]', email)
    const Result = await orm.findUserByEmail(email)
    console.log('[User Found in server]', Result);
    res.send(Result);
});
app.post('/api/enterUserGoals', async (req, res) => {
    console.log('received goal: ', req.body);
    const goal = req.body;
    const dbUser = await orm.addGoal(goal);
    res.send('Goal Received ')
});
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
//LISTENING
app.listen(PORT, function () {
    console.log(`RUNNING, http://localhost:${PORT}`);
});