

// Create our application instance
var app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x2c3e50 // 0xffffff 
});
document.body.appendChild(app.view);
app.stage.interactive = true;


outline_color = 0x63c5da;
outline_thicknes = 3;

let graphics = new PIXI.Graphics();
graphics.interactive = true;
graphics.lineStyle(outline_thicknes, outline_color, 1);

graphics.beginFill(0xFFFFFF, 1);
let shape = [
    100, 100,
    100, 300,
    300, 300,
    300, 100
]

//graphics.drawRect(100, 100, 200, 200);
graphics.drawPolygon(shape);
graphics.endFill();
graphics.anchor = 0.5;
app.stage.addChild(graphics);



let is_inside_graphics = false; // fix later
graphics
    .on('mouseover', (event) => { is_inside_graphics = true; })
    .on('mouseout', (event) =>  {is_inside_graphics = false; })

    .on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchendoutside', onDragEnd)

    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove);



function onDragStart(event)
{
    this.alpha = 0.5;
    this.data = event.data;
    this.shift = this.data.getLocalPosition(this);
    this.dragging = true;
}

function onDragEnd()
{
    this.dragging = false;
    this.data = null;
    this.shift = null;
}

function onDragMove()
{
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x - this.shift.x;
        this.position.y = newPosition.y - this.shift.y;
    }
}



app.view.addEventListener('click', () => {
    if (is_inside_graphics){
        graphics.alpha = 0.5;
    }
    else{
        graphics.alpha = 1;
    }
});

