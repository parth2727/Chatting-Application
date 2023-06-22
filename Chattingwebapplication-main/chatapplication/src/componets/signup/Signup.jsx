import React,{useEffect, useState} from "react";
import "./style.css";
import {NavLink} from 'react-router-dom'
export default function Signup() {
const [data,setData]=useState({
    user_id:"",
    username:"",
    email:"",
    password:"",
    confirm_password:"",
    PhoneNumber:"",
    profile_url:"",
    friends:[]

});
const [error,seterror]=useState({
  username:"",
  email:"",
  password:"",
  confirm_password:"",
  PhoneNumber:""
})
const [mainerror,setmainerror]=useState();
const handlechange= e =>{
  const {name, value} = e.target
  setData({...data,[name]:value})
}
useEffect(()=>{
  if(!data.password){
    console.log("password is null");
    const p="password is null";
    const name="password"
    seterror({...error,[name]:p});
  }else if(data.password.length<4){
    console.log("password length must be greater than 4")
    seterror({...error,["password"]:"password length must be greater than 4"})
  }else if(data.password.match(/[a-z]/)===null){
    seterror({...error,["password"]:"password must contain one lowercase alphabet"})
  }else if(data.password.match(/[A-Z]/)===null){
    seterror({...error,["password"]:"password must contain one uppercase alphabet"})
  }else if(data.password.match(/[0-9]/)===null){
    seterror({...error,["password"]:"password must contain one digit"})
  }else if(data.password.match(/[!@#\$%\^&\*]/)===null){
    seterror({...error,["password"]:"password must contain one special character"})
  }else{
    seterror({...error,["password"]:""})
  }
},[data.password])
useEffect(()=>{
  // const reg;
  // const test=reg.test(data.password);
  if(!data.confirm_password){
    console.log("password is null");
    const p="password is null";
    const name="confirm_password"
    seterror({...error,[name]:p});
  }else if(data.confirm_password.length<4){
    console.log("password length must be greater than 4")
    seterror({...error,["confirm_password"]:"password length must be greater than 4"})
  }else if(data.confirm_password.match(/[a-z]/)===null){
    seterror({...error,["confirm_password"]:"password must contain one lowercase alphabet"})
  }else if(data.confirm_password.match(/[A-Z]/)===null){
    seterror({...error,["confirm_password"]:"password must contain one uppercase alphabet"})
  }else if(data.confirm_password.match(/[0-9]/)===null){
    seterror({...error,["confirm_password"]:"password must contain one digit"})
  }else if(data.confirm_password.match(/[!@#\$%\^&\*]/)===null){
    seterror({...error,["confirm_password"]:"password must contain one special character"})
  }else if(data.confirm_password!==data.password){
    seterror({...error,["confirm_password"]:"password and confirm password must be match"})
  }else{
    seterror({...error,["confirm_password"]:""})
  }
},[data.confirm_password])
useEffect(()=>{
  console.log(data.PhoneNumber)
  var k=data.PhoneNumber;
  if(isNaN(k)){
    seterror({...error,["phoneNumber"]:"phone number must not have any alphabets"})
  }
  if(!data.PhoneNumber){
    seterror({...error,["phoneNumber"]:"Phone Number Can not be empty"})
  }else if(data.PhoneNumber.length<10 || data.PhoneNumber.length>10){
    seterror({...error,["phoneNumber"]:"PhoneNumber length must be equal to 10"})
  }else if(data.PhoneNumber.match(/[a-z]/)!==null){
    seterror({...error,["phoneNumber"]:"phone number must not have any alphabets"})
  }
 else{
    seterror({...error,["phoneNumber"]:""})
  }
},[data.PhoneNumber])
useEffect(()=>{
  if(!data.email){
    seterror({...error,["email"]:"Email Can not be empty"})
  }else if(data.email.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/)!==null){
    seterror({...error,["email"]:"Please enter valid email address"})
  }else{
    seterror({...error,["email"]:""})
  }
},[data.email])
const handlesignup=async (e)=>{
  e.preventDefault();
  const {username,password,email ,PhoneNumber}=data;
    const res=await fetch("/register",{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
          username,email,password,PhoneNumber
      })
  }); 
  console.log(res);
  const y= await res.json();
  if(y.message==="PhoneNumber")
  {
    setmainerror("user with "+ PhoneNumber +" PhoneNumber is already exits")
    setData({...data,['Phonenumber']:""})
  }else if(y.message==="email")
  {
    setmainerror("user with "+ email +" Email is already exits")
  }else if(y.message==="username")
  {
    setmainerror("user with "+ username +" Username is already exits")
  }
  else
  {
    localStorage.setItem("loginuser",JSON.stringify(y));
    setData(y);
    // console.log(data);
    window.location.href="/";
  }
}
  return (
    <div class="main">
      <section class="signup">
       
        <div class="container" style={{    marginBottom: '35px',marginTop: '35px',width: '660px'}}>
          <div class="signup-content">
            <form method="POST" id="signup-form" class="signup-form" onSubmit={handlesignup}>
              <h2 class="form-title">Create account</h2>
              <div class="form-group">
                <input
                  type="text"
                  onChange={handlechange}
                  value={data.username}
                  class="form-input"
                  name="username"
                  id="name"
                  placeholder="Your User Name"
                  required
                />
                <div style={{color:'red'}}>{error.username}</div>
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-input"
                  onChange={handlechange}
                  value={data.PhoneNumber}
                  name="PhoneNumber"
                  id="PhoneNumber"
                  placeholder="Your Phone Number"
                  max="9999999999"
                  required
                />
                <div style={{color:'red'}}>{error.PhoneNumber}</div>
              </div>
              <div class="form-group">
                <input
                  type="email"
                  class="form-input"
                  onChange={handlechange}
                  value={data.email}
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  required
                />
                <div style={{color:'red'}}>{error.email}</div>
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-input"
                  onChange={handlechange}
                  value={data.password}
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                />
                <div style={{color:'red'}}>{error.password}</div>
                <span
                  toggle="#password"
                  class="zmdi zmdi-eye field-icon toggle-password"
                ></span>
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-input"
                  onChange={handlechange}
                  value={data.confirm_password}
                  name="confirm_password"
                  id="re_password"
                  placeholder="Repeat your password"
                  required
                />
                <div style={{color:'red'}}>{error.confirm_password}</div>
              </div>

              <div class="form-group">
                <input
                style={{backgroundImage: 'linear-gradient(to left, rgb(207 212 235), rgb(101 44 145))'}}
                  type="submit"
                  name="submit"
                  id="submit"
                  class="form-submit"
                  value="Sign up"
                />
                <div style={{color:'red'}}>{mainerror}</div>
              </div>
            </form>
            <p class="loginhere">
              Have already an account ?{" "}
              <NavLink to="/login">
                Login here
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
