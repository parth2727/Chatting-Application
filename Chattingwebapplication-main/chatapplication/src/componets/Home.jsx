import React, { useState, useContext } from "react";
import { useEffect } from "react";
import Friend from "./Friend";
import Showchat from "./Showchat";
import AuthContext from "./AuthContext";
import "./home.css";
import Chat from "./Chat";
import Viewprofile from "./Viewprofile";

export default function Home() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("loginuser"))
  );

  const [chat, setchat] = useState();
  const friendclick = (e) => {
    console.log(e.target.id);

    setchat(e.target.id);
    console.log(chat);
  };
  const [friends, setfriends] = useState(
    data.friends.map((element) => {
      const last_mes = "how are you?";
      // console.log(element)
      // const k=<div id={element} onClick={friendclick}>{element}</div>
      // return <Friend username={element} onClick={friendclick}/>
      return (
        <div className="friend">
          <div>
            <img src="./user.png" alt="not find" />
          </div>
          <div id={element} onClick={friendclick} class="keyur">
            {element}
          </div>
        </div>
      );
    })
  );
  useEffect(() => {
    setfriends(
      data.friends.map((element) => {
        // console.log(element)
        // const k=<div id={element} onClick={friendclick}>{element}</div>
        // return <Friend username={element} onClick={friendclick}/>
        return (
          <div
            id={element}
            className="friend"
            onClick={friendclick}
            style={{ height: "70px", display: "flex" }}
          >
            <div
              style={{ margin: "auto 10px", width: "85px", marginLeft: "10px" }}
            >
              <img
                style={{ borderRadius: "96px", height: "50px" }}
                src="https://www.clipartkey.com/mpngs/m/71-714421_blank-profile-logo.png"
                alt="not find"
              />
            </div>
            <div id={element} style={{ marginTop: "13px" }} class="keyur">
              {element}
            </div>
          </div>
        );
      })
    );
  }, [data]);
  // data=JSON.parse(data)
  const [chatShowingnow, setchatnow] = useState(<div>no one here</div>);
  const Logoutnow = () => {
    localStorage.removeItem("loginuser");
    setData();
    window.location.href = "/";
  };
  const chatstart = async (e) => {
    e.preventDefault();
    const reciver = e.target.id;
    const sender = data.username;
    const res = await fetch("/newchat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender,
        reciver,
      }),
    });
    const y = await res.json();
    localStorage.removeItem("loginuser");
    localStorage.setItem("loginuser", JSON.stringify(y));
    setData(y);
    friendclick(e);
    console.log(y);
  };
  const addfrined = async (e) => {
    e.preventDefault();
    const res = await fetch("/allusers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const y = await res.json();
    console.log(y);
    const k = y.map((element) => {
      const k1 = element.username;
      console.log(k1);
      if (k1 !== data.username && !data.friends.includes(k1)) {
        // console.log(element)
        // const k=<div id={element} onClick={friendclick}>{element}</div>
        // return <Friend username={element} onClick={friendclick}/>
        <div
          id={element.username}
          onClick={chatstart}
          style={{ margin: "30px", color: "green" }}
        >
          {element.username}
        </div>;
        return (
          <div
            id={element.username}
            className="friend"
            onClick={chatstart}
            style={{ height: "60px", display: "flex" }}
          >
            <div id={element} class="keyur">
              {element.username}
            </div>
          </div>
        );
      }
    });
    setfriends(k);
  };
  useEffect(() => {
    setchatnow(<Showchat sender={data.username} reciver={chat} />);
  }, [chat]);
  // console.log(data.email);
  // console.log(friends)
  const deletechat = async (e) => {
    e.preventDefault();
    console.log(e.target.id);
    const message_id = e.target.id;
    console.log(message_id);
    const sender = data.username;
    const reciver = chat;
    const res = await fetch("/deletemsg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender,
        reciver,
        message_id,
      }),
    });
    const y = await res.json();
    console.log(y);
  };
  /*
  return (
    <div className="container" style={{ backgroundcolor: "white" }}>
      {console.log("keyur")}
      <div className="row">
        <div className="col-md-4">
          <div style={{ backgroundColor: "white" }}>{friends}</div>
          <div>
            <button onClick={addfrined}>Add Friends</button>
          </div>
        </div>
        <div className="col-md-8">
          <Showchat sender={data.username} reciver={chat} />
          <Chat sender={data.username} reciver={chat} />
        </div>
        <div>
          <button onClick={Logoutnow}>LogOut</button>
        </div>
      </div>
    </div>
  );
  */
  return (
    <div
      className="container"
      style={{
        height: "600px",
        width: "1200px",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      <div
        className="userinterface"
        style={{ backgroundColor: "white", height: "70px" }}
      >
        <div className="user" style={{ fontsize: "35px" }}>
          {data.username}
        </div>
        <div style={{ display: "flex", marginLeft: "700px" }}>
          <div style={{ marginLeft: "80px" }}>
            <button className="btn btn-warning" onClick={addfrined}>
              Add Friend
            </button>
          </div>
          <div style={{ marginLeft: "30px" }}>
            <button className="btn btn-danger" onClick={Logoutnow}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="row" style={{ height: "480px" }}>
        <div
          className="col-md-4"
          style={{
            backgroundColor: "white",
            height: "480px",
            paddingLeft: "0px",
          }}
        >
          <div
            className="frinedlist .overflow-scroll"
            style={{
              backgroundColor: "rgb(246 203 210)",
              overflowY: "scroll",
              height: "480px",
            }}
          >
            {friends}
          </div>
        </div>
        <div
          className="col-md-8"
          style={{
            backgroundColor: "#dbadd7",
            height: "480px",
            bordercolor: "black",
          }}
        >
          <div className="sendmsgs">
            {chat === undefined ? (
              ""
            ) : (
              <Showchat sender={data.username} reciver={chat} />
            )}
          </div>
          <div>
            {chat === undefined ? (
              ""
            ) : (
              <Chat sender={data.username} reciver={chat} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
