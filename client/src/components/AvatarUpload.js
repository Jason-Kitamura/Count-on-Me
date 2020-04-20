import React, {useState} from 'react'

function AvatarUpload(props) {
    const form ={
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    }
    const inp ={
        width:'100%'
    }
    const btn ={
        backgroundColor: 'Transparent',
    backgroundRepeat:'no-repeat',
    border: 'none',
    cursor:'pointer',
    overflow: 'hidden',
    outline:'none',
    color:'white'
    }
    const userid = localStorage.id;
    const [ myPic, setMyPic] = useState ( '' )

    function handleChange(e){
        const file = e.target.files[0];
        // console.log(file);
        setMyPic(file)
    }

    
    async function handleUpload(e){
        e.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('userEmail'))
        let myForm = document.getElementById('myForm');
        let formData = new FormData(myForm);
        const uploadPic = await fetch(`/api/upload/${user.id}`, 
            {
                method: 'PUT',
                body: formData
            }
        ).then( result=>result.json())
        props.changeProfilePicture(e);
    }
    return (
        <div>            
            <form id='myForm' role="form" encType="multipart/form-data" style={form}> 
               <input type="file" name="myFile" onChange={handleChange} style={inp} />
               <button class='btn btn-light' onClick={handleUpload} style={btn}>Upload</button> 
            </form>
        </div>
    )
}

export default AvatarUpload