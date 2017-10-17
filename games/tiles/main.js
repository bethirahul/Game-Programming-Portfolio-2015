var canvas = document.getElementById("myCanvas");
var ctx    = canvas.getContext("2d");

function adjustedMouseCoords(l_mouseCoords)
{
    var totalOffsetX   = 0;
    var totalOffsetY   = 0;
    var canvasX        = 0;
    var canvasY        = 0;
    var currentElement = this;

    do
    {
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while(currentElement = currentElement.offsetParent)
    {
        canvasX = l_mouseCoords.pageX - totalOffsetX;
        canvasY = l_mouseCoords.pageY - totalOffsetY;
    }
    return { x:canvasX, y:canvasY }
}

HTMLCanvasElement.prototype.adjustedMouseCoords = adjustedMouseCoords;

var button = document.addEventListener("click",update_tiles);

var g_sec        = 0;
var g_min        = 0;
var g_msec       = 0;
var g_str_msec   = "000";
var g_str_min    = "00";
var g_str_sec    = "00";
var g_frame_rate = 120;
var g_f          = 0;

var g_default_color = "grey";
var g_empty_color   = "white";
var g_font_main     = "black";
var g_font_tiles    = "white";
var g_gameover_font = "blue";
var g_size          = 95;
var g_empty_tile    = 14;
var g_moves         = 0;
var g_char          = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O",""];
var g_tile          = new Array(16);

function create_tile(l_value,l_color,l_matrix_num)
{
    this.value = l_value;
    this.color = l_color;
    this.matrix_num = l_matrix_num;
    this.xPos = (l_matrix_num[1]*100)+100;
    this.yPos = (l_matrix_num[0]*100)+100;

    this.draw = draw_tile;
}

function draw_tile()
{
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xPos,this.yPos,g_size,g_size);

    ctx.fillStyle = g_font_tiles;
    ctx.fillText(this.value,this.xPos+34,this.yPos+61);
}

function slide_tile(l_j)
{
    var l_v;

    g_tile[g_empty_tile].color = g_default_color;
    g_tile[l_j].color = g_empty_color;
    l_v = g_tile[l_j].value;
    g_tile[g_empty_tile].value = l_v;
    g_tile[l_j].value = "";
    g_empty_tile = l_j;
}

function locate_tile(l_i)
{
    var l_h = -1;

    if(g_tile[g_empty_tile].matrix_num[0]-1 >= 0)
    {
        if((g_tile[l_i].matrix_num[0] == g_tile[g_empty_tile].matrix_num[0]-1)&&(g_tile[l_i].matrix_num[1] == g_tile[g_empty_tile].matrix_num[1]))
        {
            l_h = l_i;
        }
    }
    if(g_tile[g_empty_tile].matrix_num[0]+1 <= 3)
    {
        if((g_tile[l_i].matrix_num[0] == g_tile[g_empty_tile].matrix_num[0]+1)&&(g_tile[l_i].matrix_num[1] == g_tile[g_empty_tile].matrix_num[1]))
        {
            l_h = l_i;
        }
    }
    if(g_tile[g_empty_tile].matrix_num[1]-1 >= 0)
    {
        if((g_tile[l_i].matrix_num[0] == g_tile[g_empty_tile].matrix_num[0])&&(g_tile[l_i].matrix_num[1] == g_tile[g_empty_tile].matrix_num[1]-1))
        {
            l_h = l_i;
        }
    }
    if(g_tile[g_empty_tile].matrix_num[1]+1 <= 3)
    {
        if((g_tile[l_i].matrix_num[0] == g_tile[g_empty_tile].matrix_num[0])&&(g_tile[l_i].matrix_num[1] == g_tile[g_empty_tile].matrix_num[1]+1))
        {
            l_h = l_i;
        }
    }
    return l_h;
}

function update_tiles(e)
{
    var coords = canvas.adjustedMouseCoords(e);
    
    var l_mouse_x = coords.x;//e.clientX - canvas.offsetLeft;
    var l_mouse_y = coords.y;//e.clientY - canvas.offsetTop;
    var l_b;

    for(var i=0;i<16;i++)
    {
        if(((l_mouse_x >= (g_tile[i].xPos))&&(l_mouse_x <= (g_tile[i].xPos+g_size)))&&((l_mouse_y >= (g_tile[i].yPos))&&(l_mouse_y<= (g_tile[i].yPos+g_size))))
        {
            l_b = locate_tile(i);
            if(l_b != -1)
            {
                slide_tile(l_b);
                g_moves++;
            }
        }
    }
}

function check_gameover()
{
    var l_b = 0;

    for(var i=0;i<16;i++)
    {
        if(g_tile[i].value != g_char[i])
        {
            l_b = 1;
        }
    }
    if(l_b == 0)
    {
        clearInterval(a);
        ctx.fillStyle = "black";
        ctx.fillRect(73,245,450,85);
        ctx.clearRect(78,250,440,75);
        ctx.fillStyle = g_gameover_font;
        ctx.font = "85px Tahoma";
        ctx.fillText("You did it!",105,320);
    }
}

function time_update()
{
    ctx.fillStyle = g_font_tiles;
    ctx.font = "40px Tahoma";
    g_f++;
    if(g_f > g_frame_rate-1)
    {
        g_sec++;
        g_f = 0;
    }
    if(g_sec > 59)
    {
        g_min++;
        g_sec = 0;
    }
    g_msec = Math.floor(g_f*(1000/g_frame_rate));
    g_str_min = g_min.toString();
    g_str_sec = g_sec.toString();
    g_str_msec = g_msec.toString();
    if(g_sec < 10)
    {
        g_str_sec = "0" + g_str_sec;
    }
    if(g_min < 10)
    {
        g_str_min = "0" + g_str_min;
    }
    if(g_msec < 100)
    {
        g_str_msec = "0" + g_str_msec;
    }
    else if(g_msec < 10)
    {
        g_str_msec = "0" + g_str_msec;
    }
    ctx.fillText("Time " + g_str_min + ":" + g_str_sec + ":" + g_str_msec ,160,50);
}

function total_moves()
{
    ctx.fillStyle = g_font_tiles;
    ctx.font="40px Tahoma";
    ctx.fillText("Moves : " + g_moves ,190,575);
}

function randomize()
{
    var l_z = new Array();
    var l_j;
    var l_r;
    var l_v;
    var l_b;

    for(var k=0;k<100;k++)
    {
        l_j = 0;
        for(var i=0;i<16;i++)
        {
            l_b = locate_tile(i);
            if(l_b != -1)
            {
                l_z[l_j] = l_b;
                l_j++;
            }
        }
        l_r = Math.floor(Math.random()*(l_z.length));
        slide_tile(l_z[l_r]);
    }
}

function initialize()
{
    var l_c;
    var l_m1 = 0;
    var l_m2 = 0;

    for(var i=0;i<16;i++)
    {
        l_c = g_default_color;
        if(g_char[i] == "")
        {
            g_empty_tile = i;
            l_c = g_empty_color;
        }
        g_tile[i] = new create_tile(g_char[i],l_c,[l_m1,l_m2]);
        l_m2++;
        if(l_m2 > 3)
        {
            l_m2 = 0;
            l_m1++;
        }
    }
}

function gameloop()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    time_update();
    ctx.fillStyle = g_font_main;
    ctx.fillRect(95,95,405,405);
    for(var i=0;i<16;i++)
    {
        g_tile[i].draw();
    }
    total_moves();
    check_gameover();
}

initialize();
randomize();
var a = setInterval(gameloop,1000/g_frame_rate);