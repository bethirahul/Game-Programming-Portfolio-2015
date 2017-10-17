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

var g_buttonDown = document.addEventListener("keydown"  ,g_keyDown  );
var g_buttonUp   = document.addEventListener("keyup"    ,g_keyUp    );
var g_mouseBtnDn = document.addEventListener("mousedown",g_MouseDown);
var g_mouseBtnDn = document.addEventListener("mouseup"  ,g_MouseUp  );

function g_update_playArea()
{
    var l_a = 0,l_b,l_d,l_e,l_f=2,l_h,k = 0;
    var l_i = new Array();
    g_ship.update();
    g_enemies.update();
    g_redEnemy.update();
    if(g_counterB == 0)
    {
        if(g_ship.key[0] == 1)
        {
            if(g_ship.alive == 1)
            {
                for(i=0;i<20;i++)
                {
                    if(g_bullet[i].active == 0)
                    {
                        g_bullet[i].active = 1;
                        i = 20;
                        g_counterB = 4;
                    }
                }
            }
        }
    }
    if(g_counterB > 0)
    {
        g_counterB--;
    }
    for(i=0;i<20;i++)
    {
        g_bullet[i].update();
    }
    for(i=0;i<5;i++)
        for(j=0;j<11;j++)
            if(g_enemies.bitmap[i][j] != 0)
            {
                l_i[k] = new Array(2);
                l_i[k][0] = i;
                l_i[k][1] = j;
                k++;
            } 
    if(g_counterEB == 0)
    {
        g_counterEB = Math.floor((Math.random()*8)+ 2);
        if(k != 0)
        {
            if(k<7)
            {
                l_f = Math.floor(Math.random()*3);
            }
            if(l_f == 2)
            {
                l_b = Math.floor(Math.random()*3);
                if((l_b == 0)||(l_b == 1))
                    l_b = 0;
                else
                    l_b = 1;
                for(var p=0;p<3;p++)
                {
                    if(g_e_bullet[l_b][p].active == 0)
                    {
                        g_e_bullet[l_b][p].active = 1;
                        l_d = Math.floor(Math.random()*k);
                        l_e = g_enemies.x + (l_i[l_d][1]*60) + 24;
                        l_f = g_enemies.y + (l_i[l_d][0]*60) + 24;
                        g_e_bullet[l_b][p].x = l_e;
                        g_e_bullet[l_b][p].y = l_f;
                        p = 3;
                    }
                }
            }
        }
    }
    for(i=0;i<3;i++)
    {
        g_e_bullet[0][i].update();
        g_e_bullet[1][i].update();
    }
    if(g_ship.alive == 0)
    {
        g_ship_counter++;
    }
}
function g_draw_playArea()
{
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    g_ship.draw();
    for(var i=0;i<4;i++)
        g_block[i].draw();
    g_enemies.draw();
    g_redEnemy.draw();
    for(i=0;i<20;i++)
        g_bullet[i].draw();
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,41);
    g_score.draw();
    g_lives.draw();
    for(i=0;i<3;i++)
    {
        g_e_bullet[0][i].draw();
        g_e_bullet[1][i].draw();
    }
    if(g_ship.alive == 0)
        g_explosion.draw();
    for(i=0;i<10;i++)
        g_e_explosion[i].draw();
    ctx.fillStyle = "black";
    ctx.fillRect(0,(canvas.height-5),canvas.width,5);
    ctx.fillStyle = "#33ff00";
    ctx.fillRect(15,(canvas.height-5),993,4);
    g_MenuBG.Draw();
    g_Credits.Draw();
    g_PlayBtn.Draw();
    g_PlayAgainBtn.Draw();
}

function g_keyDown(e)
{
    if(e.keyCode == g_ship.key_code[0])
    {
        g_ship.key[0] = 1;
    }
    else if(e.keyCode == g_ship.key_code[1])
    {
        g_ship.key[1] = 1;
    }
    else if(e.keyCode == g_ship.key_code[2])
    {
        g_ship.key[2] = 1;
    }
}
function g_keyUp(e)
{
    if(e.keyCode == g_ship.key_code[0])
    {
        g_ship.key[0] = 0;
    }
    else if(e.keyCode == g_ship.key_code[1])
    {
        g_ship.key[1] = 0;
    }
    else if(e.keyCode == g_ship.key_code[2])
    {
        g_ship.key[2] = 0;
    }
}
function g_MouseDown( event )
{
    var coords = canvas.adjustedMouseCoords(event);
    
    g_mousePosX = coords.x;//event.pageX - canvas.offsetLeft;
    g_mousePosY = coords.y;//event.pageY - canvas.offsetTop;
    g_PlayBtn.Down();
    g_PlayAgainBtn.Down();
}
function g_MouseUp( event )
{
    var coords = canvas.adjustedMouseCoords(event);
    
    g_mousePosX = coords.x;//event.pageX - canvas.offsetLeft;
    g_mousePosY = coords.y;//event.pageY - canvas.offsetTop;
    g_PlayBtn.Up();
    g_PlayAgainBtn.Up();
}

//------------------------------MAIN------------------------------//

var g_score = new c_create_score();
var g_ship  = new c_create_ship(50);
var g_lives = new c_create_lives();
var g_block = new Array(4);
for(var n=0;n<4;n++)
    g_block[n] = new c_create_block((n*220)+136);
var g_enemies = new c_create_enemies();
var g_redEnemy = new c_create_redEnemy();
var g_bullet = new Array(20);
for(n=0;n<20;n++)
    g_bullet[n] = new c_create_bullet(n);
var g_e_bullet = new Array(2);
g_e_bullet[0] = new Array(3);
g_e_bullet[1] = new Array(3);
//var l_a;
for(n=0;n<3;n++)
{
    g_e_bullet[0][n] = new c_create_e_bullet(0,n);
    g_e_bullet[1][n] = new c_create_e_bullet(1,n);
}
var g_counterB = 0;
var g_counterEB = Math.floor((Math.random()*8)+ 2);
var g_ship_counter = 0;
var g_explosion = new c_create_explosion();
var g_e_explosion = new Array(10);
for(i=0;i<10;i++)
    g_e_explosion[i] = new c_create_e_explosion();
var g_gamePaused = true;

g_StartGUIElements();

function g_gameLoop()
{
    if(g_gamePaused == false)
        g_update_playArea();
    g_draw_playArea();
}

var g_gameTimer = setInterval(g_gameLoop,33.3333);

//-----------------------------------------------------------------//