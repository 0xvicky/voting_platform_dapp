//SPDX-License-Identifier:MIT
pragma solidity ^0.8.7;

contract VotingSystem{
// 1. Prepare a smart contract (using solidity) for the voting platform which has the following
// features:
// a. Users should be able to create a topic to vote on.
// b. Users should be able to create the voting options for the topic they’ve created. E.g.
// options like “yes”, “no”, “maybe” etc.
// c. Other users should be able to vote on a particular option on a topic.
// d. In order to vote, the users have to register themselves as a voter, and the topic creator
// should have the option to either allow or reject the applicant.
// e. Only allowed users should be able to vote on a topic.
// f. Voters should be able to choose only one option for a topic.
// g. The voting topic should have a user specified expiry time. After the expiry time, no
// voting should take place.
// h. There should be a clear vote count for each option at the end of expiry time.
 struct Nominee{
     string name;
     uint256 noOfVotes;
 }
 

 struct Voter{
     address voterAddress;
     bool isRegistered;
     bool isVoted;
     bool pass;
 }

 address public chairman;
 uint256 public expiryTime;
 uint256 public winnerIndex;
 uint256 public winnerVoteCount;
 Nominee[] public nomineeList;
 Voter[] public proposedVoters;
 address[] public _rejectedVoters;

 mapping(address=>Voter) public voterList;
 event registrationStatus(address _voterAddress);
 event votingStatus(address _voterAddress, bool _isVoted);

 //Errors
 error invalidAmount(string);
 error cannotDoneTwice(string);
 error chairmanCannotVote();
 error voteIsEnded();
 error notEndedYet();
 error notEligible(string);
 //Modifiers
 modifier onlyChairman(){
     if(msg.sender != chairman){
        revert notEligible("Only chairman can call");
     }
     _;
 }
 modifier registrationRules(){
     if(voterList[msg.sender].isRegistered == true){
         revert cannotDoneTwice("You can't register twice");
     }
     if(voterList[msg.sender].pass == true){
        revert cannotDoneTwice("You can't add twice");
     }
     if(msg.sender == chairman){
        revert chairmanCannotVote();
     }
     if(block.timestamp > expiryTime){
        revert voteIsEnded();
     }
     _;
 }
 
 modifier votingRules(){
     if(msg.sender == chairman){
        revert chairmanCannotVote();
     }
     if(voterList[msg.sender].pass == false){
        revert notEligible("You don't have pass");
     }
     if(voterList[msg.sender].isVoted == true){
        revert cannotDoneTwice("You can't vote twice");
     }
     if(block.timestamp>expiryTime){
        revert voteIsEnded();
     }
     _;
 }
 constructor(uint256 _expiryTime,string[] memory _nominees){
   chairman = msg.sender;   
   for(uint i=0;i<_nominees.length;i++){
    nomineeList.push(Nominee({
        name : _nominees[i],
        noOfVotes : 0

    }));
    expiryTime = _expiryTime;//_expiryTime should be in UNIX timestamp
   }}

//Functions
 function register() external registrationRules {
   proposedVoters.push(Vote
 function rejectVoter(uint _voterIndex) public onlyChairman{
  _rejectedVoters.push(proposedVoters[_voterIndex].voterAddress);
  for(uint i=_voterIndex; i<proposedVoters.length-1; i++){
      proposedVoters[i] = proposedVoters[i+1];
  }
  proposedVoters.pop();
 }r({voterAddress:msg.sender,isRegistered:true,isVoted:false,pass:false}));
 }
 function approveVoters() public onlyChairman{
    for(uint i=0; i<proposedVoters.length;i++){
    Voter storage _voter = voterList[proposedVoters[i].voterAddress];
    _voter.voterAddress = proposedVoters[i].voterAddress;
    _voter.isRegistered = true;
    _voter.pass = true;
    emit registrationStatus(proposedVoters[i].voterAddress);
    }
    }

 function vote(uint256 _index) external votingRules{
    Voter storage _voter = voterList[msg.sender];
    _voter.isVoted = true;
    nomineeList[_index].noOfVotes+=1;
    emit votingStatus(msg.sender, true);
 }

 function findWinner() public {
    if(msg.sender != chairman){
        revert notEligible("Only Chairman can call this function");
    }
    if(block.timestamp<expiryTime){
        revert notEndedYet();
    }
    for(uint j=0; j<nomineeList.length; j++){
        if(nomineeList[j].noOfVotes > winnerVoteCount){
            winnerVoteCount = nomineeList[j].noOfVotes;
            winnerIndex = j;
        }
        else{winnerVoteCount = winnerVoteCount ;}
    }
 }




}
