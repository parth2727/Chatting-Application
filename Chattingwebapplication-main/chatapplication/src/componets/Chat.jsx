import React,{useState} from 'react'
import { useEffect } from 'react';

function Chat(props) {
    const [message1,setData]=useState({
        sender:props.sender,
        reciver:props.reciver,
        text:"",
    });
    // console.log(message1.reciver);
    const handalchange=e =>{
      const {name, value} = e.target
      setData({...message1,[name]:value})
  }


  const handalsendchat=async (e)=>{
    e.preventDefault();
const {sender,reciver}=props;
const text=message1.text;
console.log("----------------");
console.log(reciver);
console.log("----------------");
const res=await fetch("/send",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        sender,reciver,text
    })
});
const y= await res.json();
if(!y)
{
console.log("erorrrrrr");
}
else{
console.log(y);
//   navigate("/login");
}

}
  return (
    <div className='sendmsgs' style={{height: '60px',    backgroundColor: 'rgb(219 173 215)'}}>
        <form onSubmit={handalsendchat} style={{    display: 'flex', alignItems: 'center',justifyContent: 'space-evenly',alignContent: 'center'}}>
            {/* {localStorage.getItem("loginuser")} */}
        <div style={{  marginTop: '6px',  padding: '10px',backgroundColor:'white',
    borderRadius: '30px',
    width: '600px'}}><input name="text" style={{width: '580px',    borderColor: 'white',
    borderStyle: 'none'}} type="text" placeholder="Message" onChange={handalchange}></input></div>
        <div style={{    marginTop: '6px'}}><button name="submit" style={{  background: 'rgb(102 46 147)',color: 'white',border: 'none'}}type="submit" className='btn btn-primary'>Send</button></div>
        </form>
    </div>
  )
}
export default Chat
