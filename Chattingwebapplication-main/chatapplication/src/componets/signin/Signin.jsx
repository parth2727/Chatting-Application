import React,{useState} from 'react'
import {NavLink} from 'react-router-dom'
export default function Signin() {
    const [user_login, setData] = useState({
        PhoneNumber: "",
        password: "",
      });
    const [user_error,setUser]=useState();
      const handlechange = (e) => {
        const { name, value } = e.target;
        setData({ ...user_login, [name]: value });
      };
      const handlersubmit = async (e) => {
        e.preventDefault();
        const { PhoneNumber, password } = user_login;
        const res = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            PhoneNumber,
            password,
          }),
        });
        const y = await res.json();
        if(y.error){
          setUser(y.error);
        } 
        else {
          localStorage.setItem("loginuser", JSON.stringify(y));
          console.log(y);
          window.location.href = "/";
          //   navigate("/login");
        }
      };
  return (
    <div class="main">

    <section className="signup">
        <div class="container"  style={{zIndex:'10',    marginTop: '90px',width: '660px'}}>
            <div class="signup-content">
                <form method="POST" id="signup-form" className="signup-form" onSubmit={handlersubmit}>
                    <h2 class="form-title">Login</h2>
                    
                    <div class="form-group">
                        <input type="number"  class="form-input" name="PhoneNumber" id="PhoneNumber" placeholder="Your Phone Number" onChange={handlechange} max="9999999999" required />
                    </div>
                    
                    <div class="form-group">
                        <input type="password" class="form-input" name="password" id="password" placeholder="Password" onChange={handlechange} required />
                        <span toggle="#password" class="zmdi zmdi-eye field-icon toggle-password"></span>
                    </div>
                    

                    <div class="form-group">
                        <input type="submit" style={{backgroundImage: 'linear-gradient(to left, rgb(207 212 235), rgb(101 44 145))'}} name="submit" id="submit" class="form-submit" value="Login" />
                    </div>
                    <div class="form-group">
                        <div style={{color:'red'}}>{user_error}</div>
                    </div>
                </form>
                <p class="loginhere">
                     <NavLink to="/signup">Sign Up here</NavLink>
                </p>
            </div>
        </div>
    </section>

</div>

  )
}
