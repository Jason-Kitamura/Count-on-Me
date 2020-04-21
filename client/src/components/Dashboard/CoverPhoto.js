import React,{useState} from "react";
import axios from 'axios';

function CoverPhoto( ){
    const [profileLink,setProfileLink] = useState('');
    const style = {
        backgroundImage: `url(https://peakvisor.com/img/news/mount_fuji.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        height: '30vh'
    }

    const avatarPosition = {
        maxHeight:'20vh', 
        position:"absolute",
        left: "0px",
        bottom: "0px",
    }

    const avatarStyle = {

        maxWidth: '20vh',
        height: 'auto',
        borderRadius: '50%',
        verticalAlign: 'left',
        boxShadow: '0 5px 15px -8px rgba(0,0,0,.24), 0 8px 10px -5px rgba(0,0,0,.2)',
        border: '3px solid white'

    } 
    if(sessionStorage.getItem('userEmail') !== null){
        getProfilePic()
    }
async function getProfilePic(){
    const userFromSessionStorage = JSON.parse(sessionStorage.getItem('userEmail'));
    console.log('[user mail id:]',userFromSessionStorage.email);
    const user = await axios.get( `/api/userData/${userFromSessionStorage.email}`);
    console.log(`[Profile picture Link ]`,user.data.profilePic)
    setProfileLink(`${user.data.profilePic}`)
}
    
    return(
        <div class="jumbotron jumbotron-fluid fill" style={style}>
            <div class="container">
                <div class="d-flex justify-content-between" style={avatarPosition}>
                <div class="avatar">
                { { profileLink } === "" ?<img class="rounded-circle img-thumbnail" src="https://i.stack.imgur.com/34AD2.jpg" 
                            alt="avatar"
                            style={{
                                borderRadius:'50%',
                                width:'160px',
                                height:'150px',
                                padding:'0px'
                               
                            }}/> : <img  class="rounded-circle img-thumbnail" src={profileLink}
                            alt="avatar"
                            style={{
                                borderRadius:'50%',
                                width:'160px',
                                height:'150px',
                                padding:'0px'
                               }} />
                            }</div>
                </div>
            </div>
        </div>
    )

}

export default CoverPhoto;