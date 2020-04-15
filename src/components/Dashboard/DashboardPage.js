import React, {useRef} from "react";
import UserOptions from './UserOptions';
import TodoLists from './TodoLists';
import Followers from './Followers';
import Following from './Following';
import CoverPhoto from './CoverPhoto'
import "./style.css";

function HomePage(){
   const home = {
       width:'100%',
       height:'50px',
       textAlign:'center',
       backgroundColor:'rgb(230, 126, 34)',
       color:'white',
       fontFamily: "'Noto Sans', sans-serif",
       borderStyle:'groove', 
       paddingTop: '5px'
   }
   const liveData = {
       flex:1,
       flexDirection:'row',
       padding:'10px',
       margin:'0px'
       
   }
   const columns = {
       padding:'0',
       margin:'4px'
   }

   const scroll = {
    scrollBehavior: 'smooth'
   }


   const followers = useRef(null)
   const following = useRef(null)

   function executeScrollToFollowers(){
    console.log(`Calling scroll function`, followers)
    
    window.scrollTo(0, followers.current.offsetTop)  
   }

   function executeScrollToFollowing (){
    console.log(`Calling scroll function`, following)
    
    window.scrollTo(0, following.current.offsetTop)  
   }

    return (
        <div style={scroll}>
            <div>
                <h3  style={home}>User Name</h3>
            </div>
            <div class='row' style={liveData}>
                <div class='col-12 col-md-8' style={columns}>
                    <CoverPhoto />
                </div>
                <div class='col-12 col-md-3'style={columns} >
                    <UserOptions executeScrollToFollowers={executeScrollToFollowers} executeScrollToFollowing={executeScrollToFollowing}/>
                </div>
            </div>
            <div class='row' style={liveData}>
                <TodoLists />
            </div>
            <div class='row' ref={followers} style={liveData}>
                <Followers />
            </div>
            <div class='row' ref={following} style={liveData}>
                <Following />
            </div>
        </div>
    );

    // const userNameURL = location.hash.substr(1);
    // const userNameLocalStorage = createUserName( userCredentials.emailAddress );

    // function createUserName ( email ){

    //     const user = email;
    //     const iend = user.indexOf("@");
    //     const userName = user.substring(0 , iend);

    //     return userName; }

    //     if ( userNameURL === userNameLocalStorage ){
    //         // $('#editInfoIcon').removeAttr('style','display : none');
    //         $('.fa-edit').removeAttr('style','display : none');
    //     } 

    // }  check if profile is the user profile 

}

export default HomePage;