import React, { useState } from 'react'

export default function Forgotten_password() {
    const [data,setdata]=useState({
        email:""
    });
    const [res,setres]=useState();
    const handlerchange=(e)=>{
        const {name, value} = e.target
        setdata({...data,[name]:value});
        console.log(data);
    }
    const handlesubmit=async (e)=>{
        e.preventDefault();
        const {email}=data
        console.log(email)
        const res = await fetch("/forgottenpassword", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email
            }),
          });
          const y = await res.json();
          setres(y);
    }
    return (
    <div>
        <form onSubmit={handlesubmit}>
            <input type='email' name='email' onChange={handlerchange}/>
            <input type='submit' name="submit" value="submit"/>
        </form>
        <div>{res}</div>
    </div>
  )
}
