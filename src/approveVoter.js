import React from "react";
import {ethers} from 'ethers';
import {contractAddress, abi} from './constants.js';



function ApproveVoters(){


    const approveVoter=async()=>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            const data = await contract.approveVoters();
            console.log(data);
        } catch (error) {
            console.log(`Error occured ${error}`);
            alert("Only chairman can call");
        }
    }


    return(

        <>
        <button onClick = {approveVoter}>Approve Voters</button>
        </>
    );

}

export default ApproveVoters;