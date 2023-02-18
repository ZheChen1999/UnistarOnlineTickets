import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import QRCode from 'qrcode.react';
import moment from "moment"


export default function Home() {

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    let difference = +new Date(`05/15/${year}`) - +new Date();
  
    let timeLeft = {};
  
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  }


  const [user, setUser] = useState({});
  const [timer, setTimer] = useState('00:00:00')
  const [refresh, setRefresh] = useState({})
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  
    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRefresh((r) => r+1);
      setTimer(moment(new Date().getTime()).format("HH:mm:ss"))  
    },1000)

    return (()=>{
      clearTimeout(timeoutId)
    })

  }, [refresh])

  useEffect(() => {
    // get token from local storage
    const auth_token = localStorage.getItem("auth_token");
    const auth_token_type = localStorage.getItem("auth_token_type");
    const token = auth_token_type + " " + auth_token;

    //  fetch data from get user api
    axios
      .get("http://3.10.144.166:8888/users/", {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response);
        setUser(response.data.result);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClickHandler = (event) => {
    event.preventDefault();

    // remove token form local storage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_token_type");

    // notif
    toast("See You !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // reload page
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };


  const onClickRefresh = (event) => {
    event.preventDefault();
    window.location.reload();
    // reload page
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };


  return (
    <div >
      <div style={{display:"flex",justifyContent:"center"}}>
        <img
            alt="profile"
            //src={user.profile}
            src={require('./asset/background-top.jpg')}
          />
      </div>
      
      <div style={{margin:"11%"}}>
        <QRCode
          id="qrCode"
          level="Q"
          value={user}
          size={210} // 二维码的大小
          fgColor="#000000" // 二维码的颜色
          style={{ margin: 'auto' }}
          
        /> 
      </div>
      <div style={{display:"flex",justifyContent:"center"}}>
        <img
            alt="profile"
            //src={user.profile}
            src={require('./asset/middle.gif')}
          />
      </div>

      <div style={{textAlign:"center", margin:"3% 0"}}>
        <span style={{fontSize:"160%",fontWeight:"670",fontFamily:"",opacity:"80%"}}>
          {timer}
        </span>
      </div>

      <div style={{borderTop:"0.2px solid rgba(192,192,192,70%)", borderBottom:"0.2px solid rgba(192,192,192,70%)", margin:"5% 3% 0", padding:"3% 0"}}>
        {
          timerComponents.length ? 
          <div style={{display:"flex",justifyContent:"center"}}>
            <div style={{textAlign:"center"}}>
              <h1 style={{lineHeight:"100%",fontSize:"160%",fontWeight:"670",fontFamily:"",opacity:"80%"}}>{timeLeft.days}</h1>
              <h1 style={{fontWeight:"300", fontSize:"80%"}}>days</h1>
            </div>

            <div style={{lineHeight:"100%",margin:"0 3%", fontSize:"180%",fontWeight:"670",fontFamily:"",opacity:"80%"}}>:</div>

            <div style={{textAlign:"center"}}>
              <h1 style={{lineHeight:"100%",fontSize:"160%",fontWeight:"670",fontFamily:"",opacity:"80%"}}>{timeLeft.hours>=10?timeLeft.hours:<span>0{timeLeft.hours}</span>}</h1>
              <h1 style={{fontWeight:"300", fontSize:"80%"}}>hrs</h1>
            </div>
            
            <div style={{lineHeight:"100%",margin:"0 3%",fontSize:"180%",fontWeight:"670",fontFamily:"",opacity:"80%"}}>:</div>

            <div style={{textAlign:"center"}}>
              <h1 style={{lineHeight:"100%",fontSize:"160%",fontWeight:"670",fontFamily:"",opacity:"80%"}}>{timeLeft.minutes>=10?timeLeft.minutes:<span>0{timeLeft.minutes}</span>}</h1>
              <h1 style={{fontWeight:"300", fontSize:"80%"}}>mins</h1>
            </div>

            <div style={{lineHeight:"100%",margin:"0 3%",fontSize:"180%",fontWeight:"670",fontFamily:"",opacity:"80%"}}>:</div>

            <div style={{textAlign:"center"}}>
              <h1 style={{lineHeight:"100%",fontSize:"160%",fontWeight:"670",fontFamily:"",opacity:"80%"}}>{timeLeft.seconds>=10?timeLeft.seconds:<span>0{timeLeft.seconds}</span>}</h1>
              <h1 style={{fontWeight:"300", fontSize:"80%"}}>seconds</h1>
            </div>

            
          </div> : 
          <span>Time's up!</span>
          }
      </div>

      <div style={{padding:"3%"}}>
        <h1 style={{fontSize:"70%", fontWeight:"700", opacity:"80%"}}>90 day</h1>
        <h1 style={{fontSize:"70%", opacity:"80%"}}>Travel in the Southampton Zone for up to 90 days from activation</h1>
        <h1 style={{fontSize:"70%", opacity:"80%"}}>Expires 00:00, Fri 29th December</h1>
      </div>


      <div className="flex p-2">
          <div className="w-full text-center">
            <button
              onClick={(event) => {
                onClickRefresh(event);
              }}
              className="py-3 w-64 text-xl text-black outline-none bg-gray-50 hover:bg-gray-100 active:bg-gray-200"
            >
              Refresh
            </button>
          </div>
      </div>

      <div className="flex p-2">
          <div className="w-full text-center">
            <button
              onClick={(event) => {
                onClickHandler(event);
              }}
              className="py-3 w-64 text-xl text-black outline-none bg-gray-50 hover:bg-gray-100 active:bg-gray-200"
            >
              Log out
            </button>
          </div>
      </div>
      
    </div>
  );
}