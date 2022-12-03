import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, abi } from "./constants.js";

function GetConstructors() {

  const getChairman = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const chairSel = document.querySelector("#chairAddr");

    try {
      const callChair = await contract.getChairman();
      console.log(callChair);
      chairSel.innerHTML = `<span>${callChair}</span>`;
    } catch (error) {
      console.log(`Error Occured ${error}`);
    }
  };

  const getExpiryTime = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const expTimeSel = document.querySelector("#expTime");

    try {
      const callExpiry = await contract.getExpiryTime();
      const callExpNum = callExpiry.toString();
      console.log(callExpNum);
      expTimeSel.innerHTML = `<span>${callExpNum}</span>`;
    } catch (error) {
      console.log(`Error Occured ${error}`);
    }
  };
  // setInterval(getCurrentTime,1000);

  const [currentTime, setTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(async()=>{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
          try {
              const callExpiry = await contract.getExpiryTime();
              const _currentTime = Math.round(((Date.now())/1000));
              const _timeLeft = setTime(`${callExpiry-_currentTime}`);
              const currTimeSel = document.querySelector("#currTime");
              currTimeSel.innerHTML = `<span>${_timeLeft}</span>`;
              
  
          } catch (error) {
              console.log(`Error occured ${error}`)
             
          }
    }, 1000);
    if(currentTime <0){
      setTime(0);
    }
    return ()=> clearInterval(interval);
  }, [currentTime]);
  // const getCurrentTime = async()=>{

  // }
  return (
    <>
      <button type="button" onClick={getChairman} class="btn btn-primary">
        Chairman
      </button>
      <span id="chairAddr"></span>
      <button type="button" onClick={getExpiryTime} class="btn btn-danger">
        Ending Time
      </button>
      <span id="expTime"></span>
      <button type="button" class="btn btn-success">
       Time Left
      </button>
      <span id="currTime">{currentTime}</span>
    </>
  );
}
export default GetConstructors;
