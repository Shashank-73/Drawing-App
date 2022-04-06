const canva=document.getElementById('canva');
canva.width=innerWidth-60;
canva.height=innerHeight-200;
const context=canva.getContext('2d');
let bg_color="white"
context.fillStyle=bg_color;
context.fillRect(0,0,canva.width,canva.height)

// drawing properties
let draw_color='black';
let pen_size='2';
let is_drawing=false;

// stack for undo, redo functionality
let stack=[]
let index=-1;

// start method for drawing area selection
let start=(event)=>{
    is_drawing=true;
    context.beginPath();
    context.moveTo(event.clientX - canva.offsetLeft, event.clientY - canva.offsetTop);
    event.preventDefault();
}

// draw method for starting a drawing
let draw=(event)=>{
    if(is_drawing)
    {
        context.lineTo(event.clientX - canva.offsetLeft, event.clientY - canva.offsetTop);
        context.strokeStyle= draw_color;
        context.lineWidth= pen_size;
        context.lineCap= 'round'
        context.lineJoin= 'round'
        context.stroke();
    }
}

// stop method for stopping a darwing
let stop=(event)=>{
    if(is_drawing)
    {
        context.stroke();
        context.closePath();
        is_drawing=false;
    }
    event.preventDefault();
    if(event.type != 'mouseout')
    {
        let imgdata=context.getImageData(0,0,canva.width,canva.height)
        stack.push(imgdata);
        index+=1;
    }
}

// method for canvas clear
let clearBtn=document.getElementById('clear');
let clearCanva=()=>{
    context.fillStyle=bg_color;
    context.clearRect(0,0,canva.width,canva.height)
    context.fillRect(0,0,canva.width,canva.height)

    stack=[]
    index=-1;
}

// method for undo functionality
let undo=()=>{
    if(index <=0)
    {
        clearCanva();
    }
    else
    {
        index-=1;
        stack.pop();
        context.putImageData(stack[index],0,0);
    }
}
// events for start , draw  and stop drawing

canva.addEventListener('touchstart',start);
canva.addEventListener('touchmove',draw);
canva.addEventListener('mousedown',start);
canva.addEventListener('mousemove',draw);

canva.addEventListener('touchend',stop);
canva.addEventListener('mouseout',stop);
canva.addEventListener('mouseup',stop);

clearBtn.addEventListener('click',clearCanva);