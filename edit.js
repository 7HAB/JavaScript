let editC = document.getElementById('editForm');
function fetchAPIEdit(id){
    
    let xhr = new XMLHttpRequest();
        xhr.open('GET','https://jsonplaceholder.typicode.com/photos/'+id);
        console.log('https://jsonplaceholder.typicode.com/photos/'+id);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.send();
       
        xhr.onload = function () {
    
            if (xhr.status === 200) {
              card = xhr.responseText;
                sessionStorage.setItem("cardEdit", card);
                console.log("API fetched ");
                editForms();
            } else {
                console.log("API failed");
    
            }
    
        }};
     
function editForms(){
     const editCard = JSON.parse(sessionStorage.getItem("cardEdit"));
        console.log("    inside edit forms  ");

  editForm.innerHTML = editForm.innerHTML +
    `<div class="card-edit">
        <img class="card-img-edit" src="${editCard.url}">
            <div>
                <h3>ID:${editCard.id}</h3>
                <form>
                     <label for="albumId">Album ID</label><br>
                     <input type="text" id="albumId" placeholder="${editCard.albumId}"><br>
                     <label for="title">Title</label><br>
                     <input  type="text" id="title" placeholder="${editCard.title}"><br>
                </form>
                <button class="edit-btn" onclick="submit()">submit</button>
                <button class="edit-btn" onclick="returnToLandingPage()">cancel</button>
            </div>
        </div>`;

            
};

function submit(){
    
    const editCard = JSON.parse(sessionStorage.getItem("cardEdit"));
    const newTitle = document.getElementById('title').value;
    const newAlbumId = document.getElementById('albumId').value ;
    if( newTitle != editCard.title || newAlbumId  != editCard.albumId){
        
        const photos = JSON.parse(sessionStorage.getItem("Photos"));
        const index = photos.findIndex((photo) => photo.id === editCard.id); 

        let xml = new XMLHttpRequest()
        xml.open('PUT','https://jsonplaceholder.typicode.com/photos/'+editCard.id, JSON.stringify(photos[index]));
        xml.send()
        xml.onload=()=>{
            if (xml.status === 200) {
               console.log('edit success')
               if (newAlbumId !== "")
                {photos[index].albumId = newAlbumId;}
                if (newTitle !== "") 
                {photos[index].title = newTitle;} 
                sessionStorage.setItem("Photos",  JSON.stringify(photos) );
                returnToLandingPage();
            }
            else{
                console.log("Error editing array")
            }
}}
};

(function loadPageEdit() {
  
    const id = JSON.parse(sessionStorage.getItem("card-id"));
    fetchAPIEdit(id);  
}());
