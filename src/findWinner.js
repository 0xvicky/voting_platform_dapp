import React,{useState} from "react";
import {ethers} from 'ethers';
import {contractAddress, abi} from './constants.js';


function FindWinner(){
  const [winnerName, setWinnerName] = useState();
  const findWinner = async()=>{
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const signer = provider.getSigner();
   const contract = new ethers.Contract(contractAddress, abi, signer);

   try {
    const findWinnerCall = await contract.findWinner();
    await findWinnerCall.wait();
    const getWinner = await contract.getWinner();
    const winString = parseInt(getWinner.toString());

    const nomineeCall = await contract.nomineeList(winString);
    const nomineeName = Array.from(nomineeCall)[0];
    const winnerNameSel = document.querySelector("#winnerNom");
    winnerNameSel.innerHTML = `<span>Winner is : ${nomineeName}</span>`
    console.log(nomineeName);

    // console.log(winString);

   } catch (error) {
    console.log(`Error occured ${error}`);
    alert("Only Chairman can call");
    
   }

  }

    return(
        <>
        <button onClick = {findWinner}>Find Winner</button>
        <span id= "winnerNom">{winnerName}</span>
        </>
    );
}

export default FindWinner;