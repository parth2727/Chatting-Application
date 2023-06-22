import React,{useState,useEffect} from 'react'
import './chat.css'
function Showchat(props) {
    const [message1,setData]=useState({
        sender:props.sender,
        reciver:props.reciver,
        message:[]
    });
    // const [all_chat,setchat]=useState([]);
    // console.log(message);
    // let now='';
    const handalshowchat=async ()=>{
    const {sender,reciver}=props;
    const message=message1.message;
    console.log(sender)
    console.log(reciver)
    const res=await fetch("/chat",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            sender,reciver
        })
    });
   const y= await res.json();
   if(!y)
  {
    console.log("erorrrrrr1");
    message1.message=[{
        text:"no messages"
    }]
    setData({...message1})
  }
  else{
    // setmessage(y);
    console.log(y.all_messages)
    message1.message=y.all_messages;
    setData({...message1,["message"]:y.all_messages})
    console.log(message1)
    /*
    const now=y.map(
        (element) => {
            return (
                <>
                    <li style={{ 
                        fontWeight: 'bold', 
                        color: 'red' }}
                    >
                        {element.sender}
                    </li>
                    <li>{element.message}</li>
                </>
            )
        }
    )
    */
    // console.log(now)
//   navigate("/login");
    }
}
useEffect(()=>{
    setData({...message1,["reciver"]:props.reciver});
    console.log(message1.reciver)
    handalshowchat();
},[props.reciver])
const handalchange= e =>{
    const {name, value} = e.target
    setData({...message1,[name]:value})
  }
  
const Deleteallchat= async (e)=>{
    console.log(message1);
    const {sender,reciver}=props;
    const res=await fetch("/deleteallmsg",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            sender,reciver
        })
    });
   const y= await res.json();
   console.log(y);
   setData({...message1,['message']:y.all_messages});
}
useEffect(()=>{
 setTimeout(()=>{
    handalshowchat()
 },4000)   
},[message1.message])
const deletechat= async (e)=>{
    e.preventDefault();
    console.log(e.target.key)
    const message_id=e.target.id;
    console.log(message_id);
    const {sender,reciver}=props;
    const res=await fetch("/deletemsg",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            sender,reciver,message_id
        })
    });
   const y= await res.json();
   console.log(y);
   setData({...message1,['message']:y.all_messages});
    
}
const now1=message1.message.map(
    (element) => {
        const sendermsg1=<div className="sendermsg">
            <div  onClick={deletechat}><span id={element.message_id}  class="material-symbols-outlined">Delete</span></div>
        <div class="message-orange">
        <p class="message-content">{element.text}</p>
        <div class="message-timestamp-right">{element.hour}:{element.minute}</div>
    </div>
    </div>
    const recivermsg=<div class="message-blue">
    <p class="message-content" style={{color:'white'}}>{element.text}</p>
    <div class="message-timestamp-right">{element.hour}:{element.minute}</div>
    </div>
        
        const k=element.sender===message1.sender?sendermsg1:recivermsg
        return(
            <div>{k}</div>
        )
    })
const now=message1.message.length===0?"":now1;
    
  return (
    <div>  
        <div class="friendname" style={{    backgroundColor: '#662e93'}}>
                    <div style={{  marginLeft: '20px',  width: '100px'}}><img style={{ borderRadius: '50%'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkS8v2vSpIzK2HCPWDdfZP3vbvQhEm5fxuwkNENSNSswbBoWScLb0h3GjVFqgZB9FEpSg&usqp=CAU"/></div>
                      <div style={{    display: 'flex',flexWrap: 'nowrap',fontSize: '20px',fontWeight: 'bolder',    marginLeft: '40px'}}>
                        <div style={{color:'white'}}>{props.reciver}</div>
                        <div style={{marginLeft: '430px'}}><button className="btn btn-primary" style={{backgroundColor: '#525252',  border:'none'}} onClick={Deleteallchat}>clear-chat</button></div>
                      </div>
                    </div>
       <div className='sendmsgs' style={{overflowY: 'scroll',height: '320px',margin: '0px',padding: '0px'}}>
        {now}
      </div> 
    </div>
  )
}
export default Showchat