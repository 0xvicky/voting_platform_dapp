import React,{useState} from "react";
import {ethers} from "ethers";
import {contractAddress, abi} from "./constants.js";


function VoterList() {
  
  const [voterIndex, setVoterIndex] = useState(null) ;


  const callVoterList = async()=>{
    if(!voterIndex) return;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(contractAddress,abi, provider);

  try {
    const data = await contract.proposedVoters(voterIndex);
    const arrData = (Array.from(data))[0];
    console.log(arrData);
    const voterInfoSel = document.querySelector("#voterInfoId");
    voterInfoSel.innerHTML = `<span>${arrData}</span>`; 
  } catch (error) {
    console.log(`Error occured ${error}`)
  }
  }
 

  return (
    <>
    <button onClick = {callVoterList}>callVoter</button>
    <input onChange = {e=>setVoterIndex(e.target.value)} placeholder = "VoterIndex" />
    <span id = "voterInfoId"></span>
    </>
  );
}

export default VoterList;
