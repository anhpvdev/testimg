let ctx;
let rawImage;
let pos = {x:0, y:0};
var d = 0;
const canvas = document.getElementById('canvas')
const image = document.getElementById('img-raw')
function save(){
    raw = tf.browser.fromPixels(rawImage, 1);
    resize = tf.image.resizeBilinear(raw, [20,20]);
    tensor = resize.expandDims(0);
    tensor.print();
}

function getPosition(e){
    pos.x = e.pageX - canvas.getBoundingClientRect().x;
    pos.y = e.pageY- canvas.getBoundingClientRect().y;
    console.log(pos.x,pos.y)
}

function pain(e){
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown',getPosition)
    canvas.addEventListener('mousemove',draw)
    
    rawImage =  document.getElementById('canvas-img')
    clear = document.getElementById('clear')
    
}

function resizecanvas(){
    canvas.height = image.height
    canvas.width = image.width
}

function draw(e){
    if(e.buttons !=1) return;

    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.lineCap= 'round';
    // ctx.style = 'white';
    ctx.strokeStyle = 'white'
    ctx.moveTo(pos.x,pos.y)
    getPosition(e);
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke();
    
    rawImage.src = canvas.toDataURL('image/png')
}
document.addEventListener('DOMContentLoaded', pain)
resizecanvas()
// clear.addEventListener('click', function(){
//     var canvas = canvas.getBoundingClientRect()[0]
//     ctx.clearRect(0,0,800, 2000)
// })