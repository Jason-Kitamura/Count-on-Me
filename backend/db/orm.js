const mongoose = require('mongoose');
// mongoose.connect( process.env.MONGODB_URI , {useNewUrlParser: true, useUnifiedTopology:true});
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/goalTracker', {useNewUrlParser: true, useUnifiedTopology: true,});
mongoose.set('useCreateIndex', true);

// include mongoose models (it will include each file in the models directory)
const User = require( './models/user' );
const Goal = require('./models/goals');
const Comment = require('./models/comment');
const Habit = require('./models/habit')

function saveUser(data){
    
    const dbUser = new User( data );
    return dbUser.save();
}

async function findUserByEmail(data){
    console.log('[Email Received for verification]',data)
    const result = await User.findOne({ email: data.email});
    console.log(`[User Found]`,result);
    return result;
}
async function addGoal(data)
{
    console.log(`[Goal Received ]`,data);
    const dbGoal = new Goal ( data.goal );
    dbGoal.save(async (err,goal) => {
        if( err ){ console.log(err)};
        console.log('new goal', goal);
        const pushGoalId = mongoose.Types.ObjectId(goal._id);
        const result = await  User.updateOne({email:`${data.email}`}, { $push: { goals: pushGoalId } });
        console.log(`[Work done]`,result);
    })

}

async function getUserGoals(obj){
    const userGoals =  User.findOne({ email: `${obj.email}` }).populate('habits').populate('goals');
    console.log( 'user goals:', userGoals );
    return userGoals
}

async function getFriendGoals(obj){
    const userGoals = await User.findById({ _id: `${obj.id}` }).populate('habits').populate('goals');
    console.log( 'friend goals:', userGoals );
    return userGoals
}
async function getUserFollowers(obj){
    const userFollowers = await User.findOne({ email: `${obj.email}` });
    console.log( 'user followers:', userFollowers.followers);
    return userFollowers.followers

}
async function getUserFollowersById(obj){
    const userFollowers = await User.findById({ _id: `${obj.id}` });
    console.log( 'user followers:', userFollowers.followers);
    return userFollowers.followers

}
async function getUserFollowing(obj){
    const userFollowing = await User.findOne({ email: `${obj.email}` });
    console.log( 'user following:', userFollowing.following);
    return userFollowing.following

}
async function getUserFollowingById(obj){
    const userFollowing = await User.findById({ _id: `${obj.id}` });
    console.log( 'user following:', userFollowing.following);
    return userFollowing.following

}

async function getCompletedGoals(data){
    const userGoals = await User.findOne({ email: `${obj.email}` }).populate('goals');
    // console.log( 'user goals:', userGoals );
    return userGoals
}

async function completeGoal(obj){
    const GoalId = mongoose.Types.ObjectId(obj.id);
    const updateGoal = await Goal.updateOne({ _id : String(GoalId) }, { $set : { completed : true} } );
    console.log(`updated goal ${GoalId} to true: ${updateGoal}`);
    return updateGoal
}
async function undoGoal(obj){
    const GoalId = mongoose.Types.ObjectId(obj.id);
    const updateGoal = await Goal.updateOne({ _id : String(GoalId) }, { $set : { completed : false} } );
    console.log(`updated goal ${GoalId} to false: ${updateGoal}`)
    return updateGoal
}
async function getUserByEmailId(id){
    const result = await User.findOne({ email: id });
    // console.log(`[user found]`,result);
    return result
}
async function getUserById(id){
    const result = await User.findById({ _id: id });
    // console.log(`[user found]`,result);
    return result
}
async function findUserById(id){
    const result = await User.findOne({ _id: id})
    // console.log(`[User Found]`,result);
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
function findUser(id)
{
    console.log(`[id Received]`,id)
    const result = User.find({_id:id});
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
async function findFolloweesAndPopulate( data ){
    console.log( 'populating followees for', data.email)
    const userData = await User.findOne({ email: data.email })
        .populate({
            path :'following', 
            populate: [{  path: 'goals' },{  path: 'comments' }]
         })
    return userData;
}
//-----------------multer--------------------------------
async function updateAvatar( userId, imageUrl ){
    const dbResult = await User.findOneAndUpdate({_id: userId}, {$set :{profilePic : imageUrl}});
    return dbResult
}


async function createComment( data ){
    console.log( 'orm recceived data ', data );
    const obj = {
        name : data.name,
        body : data.body,
        profilePic : data.profilePic
    }

    const dbcomment = new Comment( obj );
    return dbcomment.save(async (err, comment) => {
        if( err ){ console.log(err)};
        console.log('new comment', comment);
        const pushCommentId = mongoose.Types.ObjectId(comment._id);
        const result = await  User.updateOne({email:`${data.postEmail}`}, { $push: { comments: pushCommentId } });
        console.log(`[comment added to user]`, result);
    });
}
async function findUserAndPopulateComments( data ){
    console.log('looking for user and populationg comments', data.email);
    const userData = await User.findOne({ email: data.email }).populate('comments');
    return( userData );
}
async function createNewHabit ( data ){
    console.log('habit data', data)
    const obj = {
        title : data.habit
    }
    const dbHabit = new Habit( obj )
    dbHabit.save(async (err, habit) => {
        if( err ){ console.log(err)};
        console.log('new habit', habit);
        const pushHabitId = mongoose.Types.ObjectId(habit._id);
        const result = await  User.updateOne({email:`${data.email}`}, { $push: { habits: pushHabitId } });
    })
   
}

module.exports = {
    saveUser,
    findUserByEmail,
    addGoal,
    findUserById,
    allUsers,
    finduser,
    addFollowing,
    getUserGoals,
    getUserById,
    getUserFollowers,
    getUserFollowing,
    getUserFollowersById, 
    getUserFollowingById,
    getFriendGoals,
    getCompletedGoals,
    completeGoal,
    undoGoal,
    getUserByEmailId,
    findFolloweesAndPopulate,
    createComment,
    findUserAndPopulateComments,
    updateAvatar,
    findUser,
    createNewHabit
    
}