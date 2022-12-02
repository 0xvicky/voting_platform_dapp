import React, {useState} from "react";

const ConnButton = () => {
  const [connButtonText, setButtonText] = useState("Connect Wallet")
  const [defaultAccount, setAccount] = useState("0");
  

  const connButtonHandler= async ()=>{
    if (window.ethereum !== undefined) {
    console.log("Connecting to wallet...");
    try {
      await window.ethereum.request({method: "eth_requestAccounts"}).then(result =>{
        accountAddrHandler(result[0]);//This is how account array is grabbed
      })
      console.log("Wallet connected!");
      setButtonText("Connected")


    } catch (error) {
      console.log(`Error occured ${error}`);
    }
    }
    else{
      console.log("NO METAMASK WALLET PRESENT");
      setButtonText("Install Metamask")
    }
  }
  const accountAddrHandler = (newAccount)=>{
   setAccount(newAccount);
  }
  ;
  return (
  <>
  {/* <button id="cntBtn" onClick = {connButtonHandler}>{connButtonText}</button> */}
  <div>
  <button type="button" class="btn btn-success" onClick = {connButtonHandler}>
      {connButtonText}
        </button>
  <h3>Wallet Address: {defaultAccount}</h3>

  </div>
  </>
  );
};

export default ConnButton;
