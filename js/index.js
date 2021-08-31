console.log("Prject No. 6");

//utility functions:
// 1.Utillity function to get DOM Element from string

function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//initialize no of parameters
let addedParamsCount = 0;

//hide the parameters box intially 
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

//if the users clicks on custom params,hide request json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    let requestJsonBox = document.getElementById('requestJsonBox');
    parametersBox.style.display = 'block';
    requestJsonBox.style.display = 'none';
});



//if the users clicks on json, hide params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener('click', () => {
    parametersBox = document.getElementById('parametersBox');
    requestJsonBox.style.display = 'block';
    parametersBox.style.display = 'none';

})

//if the user click + button add more parameters

let addParam = document.getElementById('addParam');

addParam.addEventListener('click', () => {
    let params = document.getElementById("params");
    let string = `<div class="form-group row my-1">
    <label for="url" class="col-sm-2 col-form-label">Parameter${addedParamsCount + 2}</label>
    <div class="col-md-4">
    <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Key">
    </div>
    <div class="col-md-4">
    <input type="text" class="form-control" id="parameterValue${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Value">
    </div>
    <button class="btn btn-primary deleteParam col-form-label col-sm-1 my-1">-</button>
    </div>;`

    //convert the element string to DOM node
    let paramElement = getElementFromString(string);
    // console.log(paramElement);
    params.appendChild(paramElement);

    //add and event listner to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            //Todo: add a confirmation box to confirm  parameter deletion
               e.target.parentElement.remove();
        })
    }
    addedParamsCount++;

})

let submit = document.getElementById('submit');
submit.addEventListener('click',(e)=>{
//Show please wait in the response box to request patience from the user
document.getElementById("responsePrism").innerHTML = text = 'Please Wait for a Fetching response...';
//Fetch all the values user has enterd
let url = document.getElementById('url').value;
let requestType = document.querySelector("input[name= 'requestType']:checked").value;
let contentType = document.querySelector("input[name='contentType']:checked").value;

if(contentType == 'params'){
  data = {};
  for(i =0;i<addedParamsCount+1;i++){
      if(document.getElementById('parameterKey' + (i+1)) != undefined){
          let key = document.getElementById('parameterKey' + (i+1)).value;
          let value = document.getElementById('parameterValue' + (i+1)).value;
          data[key] = value;
      } 
    }
  data = JSON.stringify(data);
}else{
    data = document.getElementById('requestJsonText').value;
}

//log all the value in console for debugging
console.log(url);
console.log(requestType);
console.log(contentType);   
console.log(data)


//if the request type is get, invoke fetch api to create a post request 
//url : https://randomuser.me/api/  use it for get requestd
//url : https://jsonplaceholder.typicode.com/posts/1 use it for post request
/* data : {
  id: 1,
  title: '...',
  body: '...',
  userId: 1
}  use it as data but before use stringify it because data is object so stringify first and then put into request json box*/ 


if(requestType == 'GET'){
    fetch(url,{
        method:'GET',
    })
    .then(response=>response.text())
    .then((text)=>{
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
    })
}else{
    fetch(url,{
        method:'POST',
        body:data,
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
    })
    .then(response=>response.text())
    .then((text)=>{
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
    });
}

})

// https://jsonplaceholder.typicode.com/posts for get request