import React,{useState} from "react";
import {ethers} from 'ethers';
import {contractAddress, abi} from './constants.js';


function RejectVoter(){
    const [rejectVoterIndex, setRejectVoteInd] = useState();
    const rejectVoter = async()=>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            const data = contract.rejectVoter(rejectVoterIndex);
            await data.wait();
            console.log(data);
            
        } catch (error) {
            console.log(`Error occured ${error}`)
        }
    }



    return(
        <>
        <button onClick = {rejectVoter}>Reject Voter</button>
        <input onChange = {e=>setRejectVoteInd(e.target.value)} placeholder = "VoterIndex" />
        </>
    );
}

export default RejectVoter;