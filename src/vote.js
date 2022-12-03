import React,{useState} from "react";
import {ethers} from 'ethers';
import {contractAddress, abi} from './constants.js';


function Vote(){
    const [nomineeIndex, setNomineeIndex] = useState();
    const vote = async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
        const data = contract.vote(nomineeIndex);
        await  data.wait();
        console.log(data);
    } catch (error) {
        console.log(`Error Occured ${error}`)
    }

    }

    return(
        <>
        <button onClick = {vote}>Vote</button>
        <input onChange = {e=>setNomineeIndex(e.target.value)} placeholder = "Nominee Index" />;
        </>
    );

}

export default Vote;