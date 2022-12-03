import React from "react";
import {ethers} from 'ethers';
import {contractAddress, abi} from './constants.js';


function FindWinner(){
  const findWinner = async()=>{
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const signer = provider.getSigner();
   const contract = new ethers.Contract(contractAddress, abi, signer);

   try {
    const data = await contract.findWinner();
    console.log(data);
   } catch (error) {
    console.log(`Error occured ${error}`);
   }

  }

    return(
        <>
        <button onClick = {findWinner}>Find Winner</button>
        </>
    );
}

export default FindWinner;