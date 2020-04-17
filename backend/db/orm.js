const mongoose = require('mongoose');
//mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/goalTracker', {useNewUrlParser: true, useUnifiedTopology: true,});
mongoose.set('useCreateIndex', true);

// include mongoose models (it will include each file in the models directory)
const User = require( './models/user' );

function saveUser(data){
    const user = {
        firstName :  data.firstName,
        lastName : data.lastName ,
        email : data.email ,
        password : data.password ,
        goals : []
    }
    const dbUser = new User( user );
    return dbUser.save();
}

async function findUserByEmail(data){
    console.log('[Email Received for verification]',data)
    const result = await User.findOne({ email: data.email})
    console.log(`[User Found]`,result);
    return result;
}
async function addGoal(data)
{
    console.log(`[user Information received]`,data);
    const result = await  User.updateOne({_id:`${data.id}`}, { $push: { goals: data.goals} });
    console.log(`[Work done]`,result);
}

async function findUserById(id){
    const result = await User.findOne({ _id: id})
    console.log(`[User Found]`,result);
    return result;
}
function allUsers(){
    const result= User.find();
    return result;
}

function finduser(name)
{
    console.log(`[name Received]`,name)
    const result = User.find({firstName:`${name}`});
    console.log(`[User Found]`,result);
    return result
}
async function addFollowing(data){
    console.log(`[info about adding following]`,data);
    const result = await  User.updateOne({_id:`${data.userid}`}, { $push: { following: data.id} });
    const result2 = await User.updateOne({_id:`${data.id}`}, { $push: { followers: data.userid} });
    const obj = {
        r1:result,
        r2:result2
    }
    console.log('[modified]',obj);
    return obj
}

module.exports = {
    saveUser,
    findUserByEmail,
    addGoal,
    findUserById,
    allUsers,
    finduser,
    addFollowing
    
}