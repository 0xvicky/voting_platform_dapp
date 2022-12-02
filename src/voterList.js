import React,{useState} from "react";

function VoterList() {
  
  const [nomineeName, setNomineeName] = useState(null) ;


  const addNominees = ()=>{
  
  }
 

  return (
    <>
    <div>
      <table class="table table-dark table-striped ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Votes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>alex</td>
            <td>5</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td >Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
    <form class="row g-3">
  <div class="col-auto">
    <input type="text" class="form-control" id="inputPassword2" placeholder="NomineeName"></input>
  </div>
  <div class="col-auto">
    <button type="submit" class="btn btn-primary mb-3">Add Nominee</button>
  </div>
</form>
    </div>
    </>
  );
}

export default VoterList;
