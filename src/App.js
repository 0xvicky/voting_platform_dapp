import "./App.css";
import React from "react";
import ConnButton from "./connButn.js";
import NomineeList from "./nomineeList.js";
import VoterList from "./voterList.js";
import RegisterVoter from "./registerVoter.js";
import RejectVoter from "./rejectVoter.js";
import ApproveVoters from "./approveVoter.js";
import Vote from "./vote.js";
import FindWinner from "./findWinner.js";
import GetConstructors from "./constructors.js";
import SetEssentials from "./setEssentials.js";
function App() {

 return (
    <>
      <div className="text-center item-center">
        <h2>Decentralised Voting Platform</h2>
        <hr></hr>
        <ConnButton />
        <hr></hr>
        <SetEssentials /><br></br>
        <GetConstructors />
        <hr></hr>
        <NomineeList />
        <hr></hr>
        <h2>Voter Section</h2>
        <RegisterVoter />
        <Vote />
        <hr></hr>
        <h2>Chairman Dashboard</h2>
        <VoterList /><br></br>
        <RejectVoter /><br></br>
        <ApproveVoters /><br></br>
        <FindWinner />
      </div>
    </>
  );
}
export default App;
