import React from "react";

function CoverPhoto( props ){

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
    function setPic(){
        if ( props.profilePic === ''){
            return( 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png' );
        }else {
            return( props.profilePic );
        }
    }
    
    return(
        <div class="jumbotron jumbotron-fluid fill" style={style}>
            <div class="container">
                <div class="d-flex justify-content-between" style={avatarPosition}>
                <div class="avatar">
                    <img src={setPic()} alt="Circle Image" style={avatarStyle} />
                </div>
                </div>
            </div>
        </div>
    )

}

export default CoverPhoto;