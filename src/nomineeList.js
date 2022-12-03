import React from "react";
import { ethers } from "ethers";
import { contractAddress, abi } from "./constants.js";
// import Vote from "./vote.js";


function NomineeList() {
  const updateNomineeTable = async()=>{
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    
    try {
      const data = await contract.getNomineeListLen();
    const dataLen = data.toString();
    console.log(dataLen);
    let nomBodSel = document.querySelector("#nomBod");
    for(let i=0 ;i<dataLen ; i++){
       const index = await contract.nomineeList(i);
       const arrIndexName = Array.from(index)[0];
       const arrIndexVote = Array.from(index)[1];
       nomBodSel.innerHTML += `<tr>
       <th scope="row">${i}</th>
       <td>${arrIndexName}</td>
       <td>${arrIndexVote}</td>
       </tr>`
    }
   } catch (error) {
    console.log(`Error occured ${error}`)
   }
  }
  
  window.onload = updateNomineeTable;
  
 const reload = ()=>{
  window.location.reload();
 }
  return (
    <>
      <div>
      
        <span id="nomineeName"></span>  
        <button type="button" onClick={reload}>Get Vote Counts</button>
      </div>

      <div>
      <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Votes</th>
    </tr>
  </thead>
  <tbody id ="nomBod">
   
  </tbody>
</table>
      </div>
      
    </>
  );

}

export default NomineeList;