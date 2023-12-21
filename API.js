/*==============API===============*/
function fetchAPI(){

    let xhr = new XMLHttpRequest();
    xhr.open('GET','https://jsonplaceholder.typicode.com/photos');
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send();
   
    xhr.onload = function () {

        if (xhr.status === 200 && xhr.readyState === 4 ) {
          photos = xhr.responseText;
          sessionStorage.setItem("Photos", photos);
          console.log("API fetched ");
        } else {
            console.log("API failed");

        }

    }
  
};
 