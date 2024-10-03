function addimg(){
    var img = document.getElementById("img").value
    var up = document.getElementById("img-raw");
    up.src = img;

}

function addimgnew(){
    let image = document.getElementById('img-raw').src
    let canvas = document.getElementById('canvas-img').src
    let listimg = localStorage.getItem("list-img") ? JSON.parse(localStorage.getItem("list-img")) : []
    listimg.push({
        raw: image,
        trans: canvas
    })
    localStorage.setItem("list-img", JSON.stringify(listimg))
    renderimg()
    }




//xuaast anh
function renderimg(){
    let listimg = localStorage.getItem("list-img") ? JSON.parse(localStorage.getItem("list-img")) : []
    let img=[]
    listimg.map((value)=>{
        img +=`
        <div class="img-raw">
            <div class="add-img-raw">
                <img id="img-raw__done" src="${value}" alt="">
            </div>
            <img id="canvas-img" src="https://i.pinimg.com/736x/2d/98/27/2d9827ad151db666c9c99baa4648e19d.jpg" alt="">
        </div>`
    })
    document.getElementById("list").innerHTML = img
}

function reload(){
    location.reload();
}

