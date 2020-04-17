import React, { useState, useRef } from "react";
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';
import axios from 'axios';

function SearchPage(props) {
  const [result, setResult] = useState('');
  const [display,setDisplay] = useState(false);
  const [forsearch,setForsearch] = useState('');
  const [alert,setAlert] =useState('');
  const btn = useRef();
  const alertStyle={
    backgroundColor:'white'
  }
  const btnStyle={
    width:'20%',
    padding:'0px'
  }
  const inputtag = {
    width:'70%'
  }
  const liStyle ={
    width:'70%'
  }
  const form = {
    display:'flex',
    flexDirection:'row',
    marginTop:'10px'
  }
  const ulStyle = {
    padding:'0px',
    margin:'0px'
  }
  
  const [input, setInput] = useState('');
  const [namesList, setnamesList] = useState([]);
  
  async function handleChange(e) {
    const i = e.target.value;
    console.log(i);
    
    // const input = e.target.value;
    const userInfo = await axios.get('/api/allusers')
    const userdata = userInfo.data;
    console.log(userdata);
    if (i.length >= 1 && i.length <= 2) {
      userdata.forEach(function (item) {
        console.log(`[name received]`,item.firstName);
        namesList.push(item.firstName);
      });
    }
    console.log(namesList);
    
    if (i.length > 1 ){
      console.log(`entering this loop`)
      const newList = namesList.filter(name => name.indexOf(i)==0);
      console.log('[new list received ]',newList)
      setInput(i);
      setForsearch(i);
      setnamesList(newList)
    } else {
      setInput(i);
      setnamesList([]);
    }

  }


  async function search() {
    console.log(`[input Received]`,input);
    const userResult = await axios.get(`/api/user/${input}`)
    console.log(`[user received ]`,userResult);
    setDisplay(true);
    setResult(userResult.data[0].firstName);
    setForsearch(userResult.data[0]._id);
    setnamesList([]);
    setInput('');
  }
 async  function addFollower(){
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('[input Received]',forsearch);  
  
   const  object ={
      id:forsearch,
      userid:user._id
    }
    console.log(`[object to be posted]`,object);
    const apiResult = axios.post('/api/addFollowing',object);
    console.log('[Added to following]',apiResult);
    
    
  }

if (display){
  return (
    <>
      <div>
    
        <form style={form}>
          <input  type="text" style={inputtag} onChange={handleChange} placeholder="Search" value={input} aria-label="Search" />
          <button class="btn btn-primary"  style={btnStyle}  onClick={search} type="button">Search</button>
        </form>
        <ul>{namesList.map(name => <li class="list-group-item" style={liStyle} onClick={() => setInput(name)}>{name}</li>)}</ul>
        <div>
          <SearchResult result={result} btn={btn} addFollower={addFollower} />
        </div>
      </div>
    </>
  )
}
else{

  return (
    <>
      <div >
        <form style={form}>
          <input class="form-control"  style={inputtag} type="text" onChange={handleChange} placeholder="Search" value={input} aria-label="Search" />
          <button class="btn btn-primary" onClick={search} style={btnStyle} type="button">Search</button>
        </form>
        <ul style={ulStyle}>{namesList.map(name => <li class="list-group-item" style={liStyle} onClick={() => setInput(name)}>{name}</li>)}</ul>
      </div>
    </>
  )
  }
}
export default SearchPage;