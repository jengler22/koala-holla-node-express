console.log( 'js' );

function getKoalas(){
  console.log( 'in getKoalas' );
  // axios call to server to get koalas
  axios.get('/koalas').then((response) => {
    console.log(response);
    let koalasFromServer = response.data;
    let contentDiv = document.querySelector("#viewKoalas");
    contentDiv.innerHTML = '';
  // let i = 0;
    for(let koala of koalasFromServer) {
      //TODO make toggle for 'ready to transfer'
      if ( koala.readyForTransfer === true ) {
        contentDiv.innerHTML += `
          <tr>
              <td>${koala.name}</td>
              <td>${koala.age}</td>
              <td>${koala.gender}</td>
              <td>${koala.readyForTransfer}</td>
              <td>${koala.notes}</td>
              <td><button id="deleteButton" onclick="deleteKoala(${koala.id})">Delete</button></td>
          </tr>
          `;
      } else if ( koala.readyForTransfer === false ) {
          contentDiv.innerHTML += `
          <tr>
              <td>${koala.name}</td>
              <td>${koala.age}</td>
              <td>${koala.gender}</td>
              <td><button id="readyForTransferButton" onclick="toggleTransfer(${koala.id})">Ready For Transfer</button></td>
              <td>${koala.notes}</td>
              <td><button id="deleteButton" onclick="deleteKoala(${koala.id})">Delete</button></td>
          </tr>
          `;
      }
     // i += 1;
    }
  }).catch((error)=> {
    console.log(error);
    alert('koala escaped! also, something is wrong.');
  });
  
} // end getKoalas

//TODO possible database question??????????? 
/*
function saveKoala(){
  console.log( 'in saveKoala' );
  // axios call to server to get koalas
 
}
*/

getKoalas();

//* addKoala() function. Taking all inputs and storing into object
function addKoala(event) {
  let koalaName = document.querySelector('#nameIn').value;
  let koalaAge = document.querySelector('#ageIn').value;
  let koalaGender = document.querySelector('#genderIn').value;
  let koalaTransfer = document.querySelector('#readyForTransferIn').value;
  let koalaNotes = document.querySelector('#notesIn').value;
  
  let koalaForServer = {
      name: koalaName,
      age: koalaAge,
      gender: koalaGender,
      readyForTransfer: koalaTransfer,
      notes: koalaNotes
  };

  console.log( koalaForServer.readyForTransfer );
  if(koalaForServer.readyForTransfer != 'true' && koalaForServer.readyForTransfer != 'false') {
    alert( 'Ready to transfer must be true or false' );
    return;
  }

  axios.post( '/koalas', koalaForServer ).then((response) => {
      console.log( response );
      getKoalas();  
  }).catch((error) => {
      console.log( error );
      alert( 'Something went wrong.' );
  })

};

function deleteKoala(index) {
    console.log(`Deleting koala ${index}`);
    axios.delete(`/koalas/${index}`).then((response) => {
      console.log(response);
      getKoalas();
    }).catch((error) =>{
      console.log(error);
      alert('Whoops. Is that even a koala?!');
    })
};

// Failed attempt at making toggle transfer button work :(
function toggleTransfer(index) {
    console.log( `Changing ready for transfer for ${index}` );
    axios.put(`/koalas/${index}`, {readyForTransfer: 'true'}).then((response) => {
    getKoalas();
    }).catch((error) => {
      console.log( `Toggle transfer error ${error}` );
    })
};
