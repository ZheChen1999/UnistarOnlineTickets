import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import QRCode from 'qrcode.react';

export default function Home() {
  
  const [user, setUser] = useState({});

  
  

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
        console.log(token)
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
      <div>
        <img
            alt="profile"
            //src={user.profile}
            src={require('./asset/background-top.jpg')}
          />
      </div>
      
      <div style={{margin:"15%"}}>
        <QRCode
          id="qrCode"
          level="H"
          value={user}
          size={230} // 二维码的大小
          fgColor="#000000" // 二维码的颜色
          style={{ margin: 'auto' }}
          
        /> 
      </div>
      <div>
        <img
            alt="profile"
            //src={user.profile}
            src={require('./asset/middle.gif')}
          />
      </div>
      <div>
        <img
            alt="profile"
            //src={user.profile}
            src={require('./asset/bottom.jpg')}
          />
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