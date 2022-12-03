import React,{useState} from "react";
import {ethers} from 'ethers';
import {contractAddress, abi} from './constants.js';

function NomineeList(){
    const [nominee, setNominee] = useState();

    const callNomineeList = async()=>{
      if(!nominee) return;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, provider);
    
      try {
        const data = await (contract.nomineeList(nominee));
        console.log(data)
       const nomSel= document.querySelector("#nomineeName");
       nomSel.innerHTML = `<span>${data}</span`
    
      } catch (error) {
        console.log(`error ${error}`)
      }
    }
    

    return(
        <>
   <div>
        <button onClick = {callNomineeList}>Nominee Name</button>
        <input onChange =  {e=> setNominee(e.target.value)} placeholder = "Nominee index"/>
        <span id = "nomineeName" ></span>
        </div>
        </>
    )
}

export default NomineeList;