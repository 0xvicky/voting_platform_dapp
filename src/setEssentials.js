import React, { useState} from "react";
import { ethers } from "ethers";
import { contractAddress,abi} from "./constants.js";
// import VotingSystem from "./artifacts/contracts/voting.sol/VotingSystem.json";


function SetEssentials(){
    const [expiryYear,setExpiryYear] = useState();
    const [expiryMonth,setExpiryMonth] = useState();
    const [expiryDate,setExpiryDate] = useState();
    const [expiryHour,setExpiryHour] = useState();
    const [expiryMinute,setExpiryMinute] = useState();
    const [expirySeconds,setExpirySeconds] = useState();

   const setExpiry = async ()=>{
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const signer =provider.getSigner();
   const contract = new ethers.Contract(contractAddress, abi, signer);

   try {
    const dateStr = `${expiryYear}-${expiryMonth}-${expiryDate}`;
     const date = new Date(dateStr);
    // console.log(date);
    const timeStrHour= parseInt(expiryHour)*3600;
    console.log(timeStrHour) // 👉️ Wed Jun 22 2022
    const timeStrMinute = parseInt(expiryMinute)*60;
    const timeStrSeconds = parseInt(expirySeconds) // 👉️ Wed Jun 22 2022
    const timestampInMs = date.getTime();//00:00:00
const unixTimestamp = Math.floor(timestampInMs/ 1000);
const finalUnix = unixTimestamp+timeStrHour+timeStrMinute+timeStrSeconds-19800;
console.log(finalUnix)
// console.log(Math.round(((Date.now())/1000)));
    const data  =await contract.setExpiryTime(finalUnix);
    
     console.log(data);
   } catch (error) {
    console.log(`Error occured ${error}`)
   }
   }





    return(
        <>
        <h3>Set Ending Time</h3>
        <button type="button" class = "btn btn-primary" onClick = {setExpiry}>Set Expiry</button>
        <input type="text" onChange ={e=>setExpiryYear(e.target.value)} placeholder ="Year"></input>
        <input type="text" onChange ={e=>setExpiryMonth(e.target.value)} placeholder ="Month"></input>
        <input type="text" onChange ={e=>setExpiryDate(e.target.value)} placeholder ="Date"></input>
        <input type="text" onChange ={e=>setExpiryHour(e.target.value)} placeholder ="Hour"></input>
        <input type="text" onChange ={e=>setExpiryMinute(e.target.value)} placeholder ="Minute"></input>
        <input type="text" onChange ={e=>setExpirySeconds(e.target.value)} placeholder ="Seconds"></input>
        </>
    );
}

export default SetEssentials;