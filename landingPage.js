let card = document.getElementById('cards');
function createCards(photos){

    for( i = 0 ; i < 52; i++) {
        let
            card = {
                albumID : photos[i].albumId,
                ID : photos[i].id,
                title : photos[i].title,
                url : photos[i].url,
                thumbnail : photos[i].thumbnailUrl,
                };
                showCard(card);

            }

}

function showCard(card){
    
    cards.innerHTML = cards.innerHTML +
    `<div class="card">
        <img class="card-img" src="${card.thumbnail}">
            <div class="container-card">
                <h2>Album ID: ${card.albumID}</h5>
                <h3>ID: ${card.ID}</h3>
                <p>${card.title}</p>
            </div>
            <div class="btns-flex">
            <button class="btns" onclick="loadEdit(${card.ID})"><svg width="60px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#0F0F0F"/>
            </svg>
            </button>
            <button class="btns" onclick="deleteCard(${card.ID})"><svg width="60px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </button>
            
            </div>
        </div>`;

  };

  function deleteCard(id){
    const reponse = confirm("Are you sure you want to delete card #" +id);

    if (reponse){
        const photos = JSON.parse(sessionStorage.getItem("Photos"));
        let xhr = new XMLHttpRequest();     
        xhr.open('DELETE','https://jsonplaceholder.typicode.com/photos/'+id);
        console.log('https://jsonplaceholder.typicode.com/photos/'+id);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.send();

    xhr.onload = function () {

        if (xhr.status === 200) {
        card = xhr.responseText;
    
        const index = photos.findIndex((photo) => photo.id === id);    
        if(photos[index].id === id)
     {
         photos.splice(index, 1);
         sessionStorage.setItem("Photos", JSON.stringify(photos));
         location.reload();
     }
     
    } 
    else {
        console.log("Delete Failed");

    }}      
    
    }
    
  };

(function loadPage() {

        fetchAPI();
        const photos = JSON.parse(sessionStorage.getItem("Photos"));
        createCards(photos);

}());
