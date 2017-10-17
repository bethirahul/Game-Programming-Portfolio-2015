
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

var g_button1    = document.addEventListener( "keydown"  , keyDown     );
var g_button2    = document.addEventListener( "keyup"    , keyUp       );
var g_mouseBtnDn = document.addEventListener( "mousedown", g_MouseDown );
var g_mouseBtnDn = document.addEventListener( "mouseup"  , g_MouseUp   );

ctx.fillStyle = "black";
ctx.fillRect(0,0,canvas.width,canvas.height);

var g_redTile	   = new Image();
var g_platformTile = new Image();
var g_door 		   = new Image();
var g_redDiamonds  = new Image();
var g_diamonds	   = new Image();
var g_sphere	   = new Image();
var g_score		   = new Image();
var g_silverLine   = new Image();
var g_level		   = new Image();
var g_daves		   = new Image();
var g_life		   = new Image();
var g_go		   = new Image();
var g_gun		   = new Image();
var g_gun_text     = new Image();
var g_fire 		   = new Array(4);
var g_weed 		   = new Array(4);
var g_water		   = new Array(5);
var g_cup		   = new Array(4);
var g_num		   = new Array(10);
var g_exp_image	   = new Array(2);
g_redTile.src	   = "assets/set2/redTile.png";
g_platformTile.src = "assets/set2/platformTile.png";
g_door.src 	 	   = "assets/set2/door.png";
g_redDiamonds.src  = "assets/set2/redDiamonds.png";
g_diamonds.src	   = "assets/set2/diamonds.png";
g_sphere.src	   = "assets/set2/sphere.png";
g_score.src		   = "assets/set2/score.png";
g_silverLine.src   = "assets/set2/silverLine.png";
g_level.src		   = "assets/set2/level.png";
g_daves.src		   = "assets/set2/daves.png";
g_life.src		   = "assets/set2/life.png";
g_go.src		   = "assets/set2/go.png";
g_gun.src		   = "assets/set2/gun.png";
g_gun_text.src	   = "assets/set2/gun2.png";
g_exp_image[0]	   = new Image();
g_exp_image[1]	   = new Image();
g_exp_image[0].src = "assets/set2/explosion1.png";
g_exp_image[1].src = "assets/set2/explosion2.png";
for(var i = 0; i < 4; i++)
{
    g_fire[i]	   = new Image();
    g_weed[i]	   = new Image();
    g_cup[i]	   = new Image();
    g_fire[i].src  = "assets/set2/fire" + (i+1) + ".png";
    g_weed[i].src  = "assets/set2/weed" + (i+1) + ".png";
    g_cup[i].src   = "assets/set2/cup"  + (i+1) + ".png";
}
for(i = 0; i < 5; i++)
{
    g_water[i]	   = new Image();
    g_water[i].src = "assets/set2/water"+ (i+1) + ".png";
}
for(i = 0; i < 10; i++)
{
    g_num[i]	   = new Image();
    g_num[i].src   = "assets/set2/"     +   i   + ".png";
}

var g_weed_num     = new Array(27);
var g_fire_num     = new Array(22);
var g_water_num    = new Array(7);
var g_cup_num	   = 1;
var g_cup_flag     = 1;
var g_gun_flag	   = 0;
var g_frame_flag   = 0;
var g_frame_flag2  = 0;
var g_frame_x      = 0;
var g_frame_disp   = 0;
var g_frame_val	   = [0,480,960];
var g_score_total  = "000000";
var g_score_num	   = 0;
var g_cup_disp 	   = 0;
var g_level_num    = 2;
var g_life_num     = 3;
for(var i=0; i<27; i++)
{
    g_weed_num[i]  = Math.floor((Math.random()*4)+1);
}
for(var i=0; i<22; i++)
{
    g_fire_num[i]  = Math.floor((Math.random()*4)+1);
}
for(var i=0; i<7; i++)
{
    g_water_num[i] = Math.floor((Math.random()*4)+1);
}


var g_level_bitmap    = new Array(11);
for(i = 0; i < 11; i++)
{
    g_level_bitmap[i] = new Array(50);
}	
g_level_bitmap[0] = [0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
g_level_bitmap[1] = [1,1,1,1,1, 1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
g_level_bitmap[2] = [1,7,0,0,0, 0,0,8,0,0,0,0,0, 0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,1,1];
g_level_bitmap[3] = [1,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
g_level_bitmap[4] = [1,2,0,0,2, 0,0,0,0,0,0,0,0, 2,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,3,3,3,0,0,3,3,0,3,3,0,0];
g_level_bitmap[5] = [1,0,0,0,0, 0,0,0,2,2,2,0,0, 0,1,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,3,0,3,0,3,0,0,0,3,0,3,0];
g_level_bitmap[6] = [1,0,2,2,0, 0,0,0,0,1,0,0,0,10,1,0,2,2,2,2,2,0,1,0,0,1,1,0,9,1,0,0,0,0,1,0,0,1,3,3,3,0,3,0,0,0,3,3,0,0];
g_level_bitmap[7] = [1,0,0,0,0,11,0,0,0,1,0,2,0, 0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,1,0,1,0,1,1,3,0,0,0,3,0,0,0,3,0,3,0];
g_level_bitmap[8] = [1,0,0,0,2, 2,2,0,7,1,0,0,0, 0,1,0,8,8,8,8,8,0,1,0,1,0,1,1,0,1,0,1,1,0,0,0,0,1,3,0,0,0,0,3,3,0,3,0,3,0];
g_level_bitmap[9] = [1,0,0,0,0, 0,0,0,0,1,8,0,0, 2,1,0,0,0,0,0,0,0,1,0,0,0,1,9,0,0,0,0,1,0,0,1,9,1,0,0,0,0,0,0,0,0,0,0,0,0];
g_level_bitmap[10]= [1,1,1,5,5, 5,5,5,5,1,5,5,5, 5,1,6,6,6,6,6,6,6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,5,5,5,5,5,5,5,5];
//--------------------------------------------------------------------
function create_dave(l_state,l_x,l_y)
{
    this.state	     = l_state;
    this.x		     = l_x;
    this.y		     = l_y;
    this.j		     = det_ij(this.x);
    this.i		     = det_ij(this.y);
    this.keys	     = [2,2,2,2];
    this.key_codes   = [37,38,39];
    this.image	     = new Array(9);
    this.count0	     = 0;
    this.countR1     = 0;
    this.countR2     = 0;
    this.countL1     = 0;
    this.countL2     = 0;
    this.image_num   = 0;
    this.jump	     = 0;
    this.jump_const1 = 0;
    this.jump_const2 = 0;
    this.gun		 = 0;
    this.counter6    = -1;
    this.right	     = [1,2,1,3];
    this.left	     = [5,6,5,7];
    this.acc	     = [0,0,7,6.5,6.5,6,5.5,5,4.5,4,3.5,3,2.5,2,2,1.5,1.5,0.75,0.75,0.5,0.5,0.5,0.25,0.25,0,0];
    this.prev_x      = l_x;
    this.prev_i	     = this.i;
    this.prev_j	     = this.j;
    this.speed1	     = 3;
    this.speed2	     = 5;
    this.speed	     = this.speed1;
    this.dead	     = 0;
    for(i = 0; i < 9; i++)
    {
        this.image[i]	  = new Image();
        this.image[i].src  = "assets/set2/dave" + i + ".png";
    }
    this.move = m_move_dave;
    this.draw = m_draw_dave;
}
function m_move_dave()
{
    var l_xDir = 0;
    if(this.dead == 0)
    {
        if(g_dave.keys[0] == 1)
        {
            l_xDir = -this.speed;
        }
        if(g_dave.keys[2] == 1)
        {
            l_xDir = this.speed + l_xDir;
        }
        if(g_dave.keys[1] == 1)
        {
            if(this.jump == 0)
            {
                this.jump = 1;
                this.speed = this.speed2;
            }
        }
        if(this.jump == 1)
        {
            this.counter6++;
            this.y = this.y - this.acc[this.counter6];
            this.jump_const2 = 1;
            if(this.counter6 >= 24)
            {
                this.jump = 2;
            }
        }
        if(this.jump == 2)
        {
            this.y = this.y + 5;
        }
        this.prev_x = this.x;
        this.x = this.x + l_xDir;
        g_check_collision();
        g_dave.prev_j = g_dave.j;
        g_dave.prev_i = g_dave.i;
    }
}
function m_draw_dave()
{
    if(this.dead == 0)
    {
        if((g_gamePaused==false)&&(this.keys[0]==2)&&(this.keys[1]==2)&&(this.keys[2]==2))
        {
            if(this.count0 >= 5)
            {
                ctx.drawImage(this.image[0],this.x-g_frame_x,this.y);
            }
            if(this.count0 > 10)
            {
                this.count0 = 0;
            }
            this.count0++;
        }
        else
        {
            if(g_gamePaused == false)
            {
                if((this.x-this.prev_x) > 0)
                {
                    this.state = 1;
                    this.countL1 = 0;
                    this.countL2 = 0;
                    if(this.countR2 == 0)
                    {
                        this.image_num = this.right[this.countR1];
                        this.countR1++;
                        if(this.countR1 > 3)
                        {
                            this.countR1 = 0;
                        }
                    }
                    this.countR2++;
                    if(this.countR2 > 2)
                    {
                        this.countR2 = 0;
                    }
                }
                if((this.x-this.prev_x) < 0)
                {
                    this.state = 2;
                    this.countR1 = 0;
                    this.countR2 = 0;
                    if(this.countL2 == 0)
                    {
                        this.image_num = this.left[this.countL1];
                        this.countL1++;
                        if(this.countL1 > 3)
                        {
                            this.countL1 = 0;
                        }
                    }
                    this.countL2++;
                    if(this.countL2 > 2)
                    {
                        this.countL2 = 0;
                    }
                }
                if(this.jump == 1)
                {
                    if((this.state == 1)||(this.state == 0))
                        this.image_num = 4;
                    if(this.state == 2)
                        this.image_num = 8;
                    if(this.x-this.prev_x != 0)
                        this.jump_const1 = 1;
                }
                if(this.jump == 2)
                {
                    if((this.state == 1)||(this.state == 0))
                        this.image_num = 3;
                    if(this.state == 2)
                        this.image_num = 7;
                    if(this.x-this.prev_x != 0)
                        this.jump_const1 = 1;
                }
                if(this.jump == 3)
                {
                    if(this.x-this.prev_x != 0)
                        this.jump_const1 = 1;
                    this.jump = 0;
                    if(this.jump_const1 == 0)
                    {
                        if(this.jump_const2 == 1)
                            this.image_num = 0;
                    }
                    else
                    {
                        if(this.state == 1)
                        {
                            this.image_num = 1;
                        }
                        if(this.state == 2)
                        {
                            this.image_num = 5;
                        }
                    }
                    this.jump_const1 = 0;
                    this.jump_const2 = 0;
                }
            }
            ctx.drawImage(this.image[this.image_num],this.x-g_frame_x,this.y);
        }
    }
    else
    {
        g_explosion(0);
    }
}
//---------------------------------------------------------------------
function g_check_collision()
{
    var l_a = 0,l_b = 0,l_c = 0;
    g_dave.j = det_ij(g_dave.x);
    g_dave.i = det_ij(g_dave.y);
    if((Math.abs(g_dave.prev_j - g_dave.j) == 1)&&
       (Math.abs(g_dave.prev_i - g_dave.i) == 1))
    {
        if((g_level_bitmap[g_dave.prev_i][g_dave.prev_j] == 0)&&
           (g_level_bitmap[g_dave.i][g_dave.j] != 0))
        {
            if((g_level_bitmap[g_dave.i][g_dave.j] == 5)||
               (g_level_bitmap[g_dave.i][g_dave.j] == 6))
            {
                l_c = 1;
            }
            else if((g_level_bitmap[g_dave.i][g_dave.j] == 1)||
                    (g_level_bitmap[g_dave.i][g_dave.j] == 2))
            {
                g_dave.x = g_dave.prev_x;
                if(g_dave.jump == 1)
                {
                    g_dave.jump = 2;
                }
            }
            else if((g_level_bitmap[g_dave.i][g_dave.j] >=  7)&&
                    (g_level_bitmap[g_dave.i][g_dave.j] <= 11))
            {
                score(g_dave.i,g_dave.j);
                g_level_bitmap[g_dave.i][g_dave.j] = 0;
            }
        }
    }
    if(g_level_bitmap[g_dave.i][g_dave.j-1] != 0)			  // Left
    {
        if((g_dave.x-((g_dave.j-1)*32)) < 25)
        {
            if((g_level_bitmap[g_dave.i][g_dave.j-1] == 5)||
               (g_level_bitmap[g_dave.i][g_dave.j-1] == 6))
            {
                l_c = 1;
            }
            else if((g_level_bitmap[g_dave.i][g_dave.j-1] >=  7)&&
                    (g_level_bitmap[g_dave.i][g_dave.j-1] <= 11))
            {
                score(g_dave.i,g_dave.j-1);
                g_level_bitmap[g_dave.i][g_dave.j-1] = 0;
            }
            else
            {
                g_dave.x = g_dave.prev_x;
            }
        }
    }
    if(g_level_bitmap[g_dave.i][g_dave.j+1] != 0)			  // Right
    {
        if((((g_dave.j+1)*32)-g_dave.x) < 25)
        {
            if((g_level_bitmap[g_dave.i][g_dave.j+1] == 5)||
               (g_level_bitmap[g_dave.i][g_dave.j+1] == 6))
            {
                l_c = 1;
            }
            else if((g_level_bitmap[g_dave.i][g_dave.j+1] >=  7)&&
                    (g_level_bitmap[g_dave.i][g_dave.j+1] <= 11))
            {
                score(g_dave.i,g_dave.j+1);
                g_level_bitmap[g_dave.i][g_dave.j+1] = 0;
            }
            else if(g_level_bitmap[g_dave.i][g_dave.j+1] >=  4)
            {
                if(g_cup_disp == 1)
                    g_GameOver();
                //clearInterval(gameTimer);
            }
            else
            {
                g_dave.x = g_dave.prev_x;
            }
        }
    }
    if(g_level_bitmap[g_dave.i-1][g_dave.j] != 0)			  // Up
    {
        if((g_level_bitmap[g_dave.i-1][g_dave.j] == 1)||
           (g_level_bitmap[g_dave.i-1][g_dave.j] == 2))
        {
            l_b = 1;
        }
        else if((g_level_bitmap[g_dave.i-1][g_dave.j] >=  7)&&
                (g_level_bitmap[g_dave.i-1][g_dave.j] <= 11))
        {
            if(g_dave.y-((g_dave.i-1)*32) < 25)
            {
                score(g_dave.i-1,g_dave.j);
                g_level_bitmap[g_dave.i-1][g_dave.j] = 0;
            }
        }
    }
    if(g_level_bitmap[g_dave.i-1][g_dave.j-1] != 0)			// Up Left
    {
        if(((g_dave.x-((g_dave.j-1)*32)) < 25)&&
           ((g_dave.x-((g_dave.j-1)*32)) > 15))
        {
            if((g_level_bitmap[g_dave.i-1][g_dave.j-1] >=  7)&&
               (g_level_bitmap[g_dave.i-1][g_dave.j-1] <= 11))
            {
                score(g_dave.i-1,g_dave.j-1);
                g_level_bitmap[g_dave.i-1][g_dave.j-1] = 0;
            }
            else
                l_b = 1;
        }
    }
    if(g_level_bitmap[g_dave.i-1][g_dave.j+1] != 0)			// Up Right
    {
        if(((g_dave.x-((g_dave.j+1)*32)) < 25)&&
           ((g_dave.x-((g_dave.j+1)*32)) > 15))
        {
            if((g_level_bitmap[g_dave.i-1][g_dave.j+1] >=  7)&&
               (g_level_bitmap[g_dave.i-1][g_dave.j+1] <= 11))
            {
                score(g_dave.i-1,g_dave.j+1);
                g_level_bitmap[g_dave.i-1][g_dave.j+1] = 0;
            }
            else
                l_b = 1;
        }
    }
    if(g_level_bitmap[g_dave.i+1][g_dave.j] != 0)			  // Down
    {
        if((g_level_bitmap[g_dave.i+1][g_dave.j] == 5)||
           (g_level_bitmap[g_dave.i+1][g_dave.j] == 6))
        {
            l_c = 1;
        }
        else if((g_level_bitmap[g_dave.i+1][g_dave.j] >=  7)&&
                (g_level_bitmap[g_dave.i+1][g_dave.j] <= 11))
        {
            if(((g_dave.i-1)*32-g_dave.y) < 25)
                score(g_dave.i+1,g_dave.j);
            g_level_bitmap[g_dave.i+1][g_dave.j] = 0;
        }
        else
        {
            l_a = 1;
        }
    }
    else if(g_level_bitmap[g_dave.i+1][g_dave.j] == 0)		 // Down
    {
        if(g_dave.jump != 1)
        {
            g_dave.jump = 2;
        }
    }
    if(g_level_bitmap[g_dave.i+1][g_dave.j-1] != 0)			// Down Left
    {
        if(((g_dave.x-((g_dave.j-1)*32)) < 25)&&
           ((g_dave.x-((g_dave.j-1)*32)) > 15))
        {
            if((g_level_bitmap[g_dave.i+1][g_dave.j-1] >=  7)&&
               (g_level_bitmap[g_dave.i+1][g_dave.j-1] <= 11))
            {
                score(g_dave.i+1,g_dave.j-1);
                g_level_bitmap[g_dave.i+1][g_dave.j-1] = 0;
            }
            else
            {
                l_a = 1;
                if((((g_dave.i+1)*32)-g_dave.y) < 32)
                {
                    g_dave.x = g_dave.prev_x;
                }
            }
        }
    }
    if(g_level_bitmap[g_dave.i+1][g_dave.j+1] != 0)			// Down Right
    {
        if(((((g_dave.j+1)*32)-g_dave.x) < 25)&&
           ((((g_dave.j+1)*32)-g_dave.x) > 15))
        {
            if((g_level_bitmap[g_dave.i+1][g_dave.j+1] >=  7)&&
               (g_level_bitmap[g_dave.i+1][g_dave.j+1] <= 11))
            {
                score(g_dave.i+1,g_dave.j+1);
                g_level_bitmap[g_dave.i+1][g_dave.j+1] = 0;
            }
            else
            {
                l_a = 1;
                if((((g_dave.i+1)*32)-g_dave.y) < 32)
                {
                    g_dave.x = g_dave.prev_x;
                }
            }
        }
    }
    if(l_a == 1)
    {
        if((((g_dave.i+1)*32)-g_dave.y) <= 32)
        {
            if(g_dave.jump == 2)
            {
                g_dave.y = (g_dave.i)*32;
                g_dave.jump = 3;
                g_dave.speed = g_dave.speed1;
                g_dave.counter6  = -1;
                g_dave.countR1  = 0;
                g_dave.countR2  = 0;
                g_dave.countL1  = 0;
                g_dave.countL2  = 0;
            }
        }
    }
    if(l_b == 1)
    {
        if((g_dave.y-((g_dave.i-1)*32)) < 32)
        {
            if(g_dave.jump == 1)
            {
                g_dave.y = g_dave.i*32;
                g_dave.jump = 2;
            }
        }
    }
    if(l_c == 1)
    {
        g_dave.count0 = 0;
        g_dave.counter6 = 0;
        g_dave.countR1 = 0;
        g_dave.dead = 1;
        g_dave.y = g_dave.y + 5;
    }
}
//----------------------------------------------------------------------
function g_explosion(l_a)
{
    if(l_a == 0)
    {
        if(g_gamePaused == false)
        {
            if(g_dave.count0 == 19)
            {
                if(g_dave.countR1 == 0)
                    g_dave.countR1 = 1;
                else if(g_dave.countR1 == 1)
                    g_dave.countR1 = 0;
                g_dave.y = g_dave.y + 2;
                g_dave.counter6++;
                g_dave.count0 = 0;
            }
            g_dave.count0++;
        }
        ctx.drawImage(g_exp_image[g_dave.countR1],g_dave.x-g_frame_x,g_dave.y);
        if(g_dave.counter6 > 3)
        {
            if(g_life_num > 0)
            {
                var l_b = 0;
                g_life_num--;
                if(g_dave.gun == 1) { l_b = 1; }
                g_dave = new create_dave(0,32,288);
                if(l_b == 1) { g_dave.gun = 1; }
            }
            else
            {
                g_GameOver();
                //clearInterval(gameTimer);
            }
        }
    }
    if(l_a == 1)
    {
        if(g_gamePaused == false)
        {
            if(g_enemy.count == 19)
            {
                if(g_enemy.dcc == 0)
                    g_enemy.dcc = 1;
                else if(g_enemy.dcc == 1)
                    g_enemy.dcc = 0;
                g_enemy.y = g_enemy.y + 2;
                g_enemy.image_num++;
                g_enemy.count = 0;
            }
            g_enemy.count++;
        }
        ctx.drawImage(g_exp_image[g_enemy.dcc],g_enemy.x-g_frame_x,g_enemy.y);
        if(g_enemy.image_num>3)
        {
            g_enemy = new create_enemy(0,0);
            g_enemy.flag = 1;
            g_enemy.dead = 1;
        }
    }
}
function score(l_i,l_j)
{
    var l_a = 0, l_b;
    if((g_level_bitmap[l_i][l_j] == 7)||
       (g_level_bitmap[l_i][l_j] == 9))
    {
        g_score_num = g_score_num + 50;
    }
    else if(g_level_bitmap[l_i][l_j] == 8)
    {
        g_score_num = g_score_num + 100;
    }
    else if(g_level_bitmap[l_i][l_j] == 10)
    {
        g_score_num = g_score_num + 1000;
        g_cup_disp = 1;
    }
    else if(g_level_bitmap[l_i][l_j] == 11)
    {
        g_score_num = g_score_num + 500;
        g_dave.gun = 1;
        g_gun_flag = 1;
    }
    l_a = g_score_num + 100000;
    g_score_total = l_a.toString();
}
//------------------------------------------------------------------
function create_enemy(l_x,l_y)
{
    this.flag = 0;
    this.speed = 4;
    this.x = l_x;
    this.y = l_y;
    this.xDir = this.speed;
    this.yDir = this.speed;
    this.dcc = 0;
    this.image = new Array(2);
    this.image[0] = new Image();
    this.image[1] = new Image();
    this.image[0].src = "assets/set2/monster1.png";
    this.image[1].src = "assets/set2/monster2.png";
    this.dead = 0;
    this.count = 0;
    this.image_num = 0;
    this.move = m_move_enemy;
    this.draw = m_draw_enemy;
}
function m_move_enemy()
{
    if(this.dead == 0)
    {
        if((this.x > 512)&&(this.x < 608))
        {
            this.dcc = 0;
            this.yDir = 0;
            if(this.y > 105)
                this.xDir = this.speed;
            else
                this.xDir = -this.speed;
        }
        if(this.x >= 608)
        {
            this.yDir = -2;
            this.dcc = 0.33;
        }
        if(this.x <= 512)
        {
            this.yDir = 2;
            this.dcc = -0.33;
        }
        this.xDir = this.xDir - this.dcc;
        this.x = this.x + this.xDir;
        this.y = this.y + this.yDir;
        g_enemy_collision();
    }
}
function m_draw_enemy()
{
    if(this.dead == 0)
    {
        if((this.count == 24)||(this.count == 69))
        {
            if(this.image_num == 0)
                this.image_num = 1;
            else if(this.image_num == 1)
                this.image_num = 0;
            if(this.count == 69)
                this.count = 0;
        }
        this.count++;
        ctx.drawImage(this.image[this.image_num],this.x-g_frame_x,this.y);
    }
    else
    {
        g_explosion(1);
    }
}
//------------------------------------------------------------------
function g_enemy_collision()
{
    if(((g_enemy.x-g_dave.x) < 32)&&((g_enemy.x-g_dave.x) > -54))
    {
        if(((g_enemy.y-g_dave.y) < 32)&&((g_enemy.y-g_dave.y) > -30))
        {
            g_enemy.count     = 0;
            g_enemy.dcc       = 0;
            g_enemy.image_num = 0;
            g_enemy.dead      = 1;
            g_enemy.y         = g_enemy.y + 5;
            g_e_bullet.state  = 0;

            g_dave.count0     = 0;
            g_dave.counter6   = 0;
            g_dave.countR1    = 0;
            g_dave.dead       = 1;
            g_dave.y          = g_dave.y + 5;
        }
    }
}
//------------------------------------------------------------------
function create_bullet()
{
    this.state      = 0;
    this.speed      = 6;
    this.x          = 0;
    this.y          = 0;
    this.i          = 0;
    this.j          = 0;
    this.xDir       = 0;
    this.imageL     = new Image();
    this.imageR     = new Image();
    this.imageL.src = "assets/set2/bulletL.png";
    this.imageR.src = "assets/set2/bulletR.png";
    this.key_flag   = 0;
    this.key_code   = 18;
    this.move       = m_move_bullet;
    this.draw       = m_draw_bullet;
}
function m_move_bullet()
{
    if(g_dave.dead == 0)
    {
        if(g_dave.gun == 1)
        {
            if(this.state == 0)
            {
                this.x = 0;
                this.y = 0;
                this.xDir = 0;
                if(this.key_flag == 1)
                {
                    this.x = g_dave.x + 8;
                    this.y = g_dave.y + 13;
                    if((g_dave.state == 1)||(g_dave.state == 0))
                    {
                        this.state = 1;
                        this.xDir = this.speed;
                    }
                    else if(g_dave.state == 2)
                    {
                        this.state = 2;
                        this.xDir = -this.speed;
                    }
                }
            }
            else
            {
                this.x = this.x + this.xDir;
                g_bullet_collision();
            }
        }
    }
}
function m_draw_bullet()
{
    if(g_dave.dead == 0)
    {
        if(this.state == 1)
        {
            ctx.drawImage(this.imageR,this.x-g_frame_x,this.y)
        }
        else if(this.state == 2)
        {
            ctx.drawImage(this.imageL,this.x-g_frame_x,this.y)
        }
    }
}
//------------------------------------------------------------------
function g_bullet_collision()
{
    g_bullet.j = det_ij(g_bullet.x);
    g_bullet.i = det_ij(g_bullet.y);
    if(((g_enemy.x - g_bullet.x) < 16)&&((g_enemy.x - g_bullet.x) > -54))
    {
        if(((g_enemy.y - g_bullet.y) < 3)&&((g_enemy.y - g_bullet.y) > -30))
        {
            g_enemy.count = 0;
            g_enemy.dcc = 0;
            g_enemy.image_num = 0;
            g_enemy.dead = 1;
            g_enemy.y = g_enemy.y + 5;
            g_e_bullet.state = 0;

            g_bullet.state = 0;
        }
    }
    if(g_level_bitmap[g_bullet.i][g_bullet.j] != 0)
    {
        if((g_level_bitmap[g_bullet.i][g_bullet.j] == 1)||
           (g_level_bitmap[g_bullet.i][g_bullet.j] == 2))
        {
            g_bullet.state = 0;
        }
    }
}
//------------------------------------------------------------------
function create_e_bullet()
{
    this.state = 0;
    this.speed = 6;
    this.x = 0;
    this.y = 0;
    this.i = 0;
    this.j = 0;
    this.xDir = 0;
    this.imageL = new Array(2);
    this.imageR = new Array(2);
    this.imageL[0] = new Image();
    this.imageL[1] = new Image();
    this.imageR[0] = new Image();
    this.imageR[1] = new Image();
    this.imageL[0].src = "assets/set2/monsterBulletL1.png";
    this.imageL[1].src = "assets/set2/monsterBulletL2.png";
    this.imageR[0].src = "assets/set2/monsterBulletR1.png";
    this.imageR[1].src = "assets/set2/monsterBulletR2.png";
    this.image_num = 1;
    this.count1 = 0;
    this.count2 = 1;
    this.move = m_move_e_bullet;
    this.draw = m_draw_e_bullet;
}
function m_move_e_bullet()
{
    if(g_enemy.dead == 0)
    {
        if(this.state == 0)
        {
            this.x = 0;
            this.y = 0;
            this.xDir = 0; 
            if(this.count2 > 20)
            {
                this.x = g_enemy.x + 25;
                this.y = g_enemy.y + 13;
                if((g_dave.x - g_enemy.x) >= 0)
                {
                    this.state = 1;
                    this.xDir = this.speed;
                }
                else if((g_dave.x - g_enemy.x) < 0)
                {
                    this.state = 2;
                    this.xDir = -this.speed;
                }
            }
            this.count2++;
        }
        else
        {
            this.x = this.x + this.xDir;
            g_e_bullet_collision();
        }
    }
}
function m_draw_e_bullet()
{
    if(g_enemy.dead == 0)
    {
        if(this.count1 > 2)
        {
            this.count1 = 0;
            if(this.image_num == 0)
            {
                this.image_num = 1;
            }
            else if(this.image_num == 1)
            {
                this.image_num = 0;
            }
        }
        this.count1++;
        if(this.state == 1)
        {
            ctx.drawImage(this.imageR[this.image_num],this.x-g_frame_x,this.y);
        }
        else if(this.state == 2)
        {
            ctx.drawImage(this.imageL[this.image_num],this.x-g_frame_x,this.y);
        }
    }
}
//------------------------------------------------------------------
function g_e_bullet_collision()
{
    g_e_bullet.j = det_ij(g_e_bullet.x);
    g_e_bullet.i = det_ij(g_e_bullet.y);
    if(((g_dave.x - g_e_bullet.x) < 36)&&((g_dave.x - g_e_bullet.x) > -32))
    {
        if(((g_dave.y - g_e_bullet.y) < 6)&&((g_dave.y - g_e_bullet.y) > -32))
        {
            g_dave.count0 = 0;
            g_dave.counter6 = 0;
            g_dave.countR1 = 0;
            g_dave.dead = 1;
            g_dave.y = g_dave.y + 5;

            g_e_bullet.state = 0;
            if(g_enemy.dead == 0);
            g_e_bullet.count2 = (Math.random()*20) + 1;
        }
    }
    if(g_level_bitmap[g_e_bullet.i][g_e_bullet.j] != 0)
    {
        if((g_level_bitmap[g_e_bullet.i][g_e_bullet.j] == 1)||
           (g_level_bitmap[g_e_bullet.i][g_e_bullet.j] == 2))
        {
            g_e_bullet.state = 0;
            if(g_enemy.dead == 0);
            g_e_bullet.count2 = (Math.random()*20) + 1;
        }
    }
}
//------------------------------------------------------------------
var g_dave = new create_dave(0,32,288);
var g_enemy = new create_enemy(576,128);
var g_bullet = new create_bullet();
var g_e_bullet = new create_e_bullet();

function keyDown(e)
{
    if(e.keyCode == 18)
    {
        g_bullet.key_flag = 1;
    }
    for(var i=0;i<3;i++)
    {
        if(e.keyCode == g_dave.key_codes[i])
        {
            g_dave.keys[i] = 1;
        }
    }
}
function keyUp(e)
{
    if(e.keyCode == 18)
    {
        g_bullet.key_flag = 0;
    }
    for(var i=0;i<3;i++)
    {
        if(e.keyCode == g_dave.key_codes[i])
        {
            g_dave.keys[i] = 0;
        }
    }
}
//--------------------------------------------------------------------
function draw_level()
{
    var l_k = 0, l_l = 0,l_m = 0,l_n = 128,l_o = 512,l_t;
    for(var i=0;i<11; i++)
    {
        for(var j=0;j<50;j++)
        {
            if(g_level_bitmap[i][j] == 1)
            {
                ctx.drawImage(g_redTile,((j*32)-g_frame_x),(i*32));
            }
            else if(g_level_bitmap[i][j] == 2)
            {
                ctx.drawImage(g_platformTile,((j*32)-g_frame_x),(i*32));
            }
            else if(g_level_bitmap[i][j] == 3)
            {
                if(g_frame_flag == 3)
                {
                    g_weed_num[l_k]++;
                }
                if(g_weed_num[l_k] > 4)
                {
                    g_weed_num[l_k] = 1;
                }
                ctx.drawImage(g_weed[g_weed_num[l_k]-1],((j*32)-g_frame_x),(i*32));
                l_k++;
            }
            else if(g_level_bitmap[i][j] == 4)
            {
                ctx.drawImage(g_door,((j*32)-g_frame_x),(i*32))
            }
            else if(g_level_bitmap[i][j] == 5)
            {
                if(g_frame_flag == 3)
                {
                    g_fire_num[l_l]++;
                }
                if(g_fire_num[l_l] > 4)
                {
                    g_fire_num[l_l] = 1;
                }
                ctx.drawImage(g_fire[g_fire_num[l_l]-1],((j*32)-g_frame_x),(i*32));
                l_l++;
            }
            else if(g_level_bitmap[i][j] == 6)
            {
                if(g_frame_flag == 3)
                {
                    g_water_num[l_m]++;
                }
                if(g_water_num[l_m] > 5)
                {
                    g_water_num[l_m] = 1;
                }
                ctx.drawImage(g_water[g_water_num[l_m]-1],((j*32)-g_frame_x),(i*32));
                l_m++;
            }
            else if(g_level_bitmap[i][j] == 7)
            {
                ctx.drawImage(g_redDiamonds,((j*32)-g_frame_x),(i*32));
            }
            else if(g_level_bitmap[i][j] == 8)
            {
                ctx.drawImage(g_diamonds,((j*32)-g_frame_x),(i*32));
            }
            else if(g_level_bitmap[i][j] == 9)
            {
                ctx.drawImage(g_sphere,((j*32)-g_frame_x),(i*32));
            }
            else if(g_level_bitmap[i][j] == 10)
            {
                if(g_frame_flag2 == 2)
                {
                    g_cup_num = g_cup_num + g_cup_flag;
                }
                if(g_cup_num == 4)
                {
                    g_cup_flag = -1;
                }
                else if(g_cup_num == 1)
                {
                    g_cup_flag = 1;
                }
                ctx.drawImage(g_cup[g_cup_num-1],((j*32)-g_frame_x),(i*32), g_cup[g_cup_num-1].width, g_cup[g_cup_num-1].height);
            }
            else if(g_level_bitmap[i][j] == 11)
            {
                ctx.drawImage(g_gun,((j*32)-g_frame_x),(i*32));
            }
        }
    }
    ctx.drawImage(g_score,0,0);
    ctx.fillRect(0,332,canvas.width,100);
    for(j = 24; j < 340; j = (j + 310))
    {
        for(i = 0; i < 600; i= (i+64))
        {
            ctx.drawImage(g_silverLine,i,j);
        }
    }
    if(g_cup_disp == 1)
    {
        ctx.drawImage(g_go,148,(canvas.height-32));
    }
    if(g_gun_flag == 1)
    {
        ctx.drawImage(g_gun_text,480,(canvas.height-60));
        ctx.drawImage(g_gun,572,(canvas.height-66));
    }
    for(i = 0; i < 5; i++)
    {
        if(g_score_total[i+1] == "0")
            ctx.drawImage(g_num[0],l_n,0);
        else if(g_score_total[i+1] == "1")
            ctx.drawImage(g_num[1],l_n,0);
        else if(g_score_total[i+1] == "2")
            ctx.drawImage(g_num[2],l_n,0);
        else if(g_score_total[i+1] == "3")
            ctx.drawImage(g_num[3],l_n,0);
        else if(g_score_total[i+1] == "4")
            ctx.drawImage(g_num[4],l_n,0);
        else if(g_score_total[i+1] == "5")
            ctx.drawImage(g_num[5],l_n,0);
        else if(g_score_total[i+1] == "6")
            ctx.drawImage(g_num[6],l_n,0);
        else if(g_score_total[i+1] == "7")
            ctx.drawImage(g_num[7],l_n,0);
        else if(g_score_total[i+1] == "8")
            ctx.drawImage(g_num[8],l_n,0);
        else if(g_score_total[i+1] == "9")
            ctx.drawImage(g_num[9],l_n,0);
        l_n = l_n + 16;
    }
    ctx.drawImage(g_level,240,0);
    ctx.drawImage(g_num[0],352,0);
    ctx.drawImage(g_num[g_level_num],368,0);
    ctx.drawImage(g_daves,400,0);
    for(i = 0;i< g_life_num; i++)
    {
        ctx.drawImage(g_life,l_o,0)
        l_o = l_o + 32;
    }
    g_frame_flag++;
    g_frame_flag2++;
    if(g_frame_flag > 4)
    {
        g_frame_flag = 0;
    }
    if(g_frame_flag2 > 2)
    {
        g_frame_flag2 = 0;
    }
}

function move_frame()
{
    var l_f = 4,l_x = 0,l_a = 0;
    if(g_dave.x < 544)
    {
        l_f = 0;
    }
    if((g_dave.x >= 544)&&(g_dave.x < 1056))
    {
        l_f = 1;
    }
    if(g_dave.x >= 1056)
    {
        l_f = 2;
    }
    if((g_dave.x > 992)&&(g_dave.y <= 128))
    {
        l_f = 2;
    }
    if(g_frame_x != g_frame_val[l_f])
    {
        if(g_frame_x < g_frame_val[l_f])
        {
            l_x = 40;
        }
        else if(g_frame_x > g_frame_val[l_f])
        {
            l_x = -40;
        }
    }
    else if(g_frame_x == g_frame_val[l_f])
    {
        l_x = 0;
    }
    g_frame_x = g_frame_x + l_x;
}
//-----------------------------------------------------------------
function det_ij(l_x)
{
    var l_a = l_x/32;
    var l_r = Math.round(l_a);
    var l_b = Math.abs(l_a - l_r);
    if(l_b == 0.5)
        return (l_r-1);
    else
        return l_r;
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
function gameLoop()
{
    ctx.fillRect(0,0,canvas.width,canvas.height);
    if(g_gamePaused == false)
    {
        move_frame();
        g_dave.move();
        if(g_enemy.flag == 0)
        {
            g_enemy.move();
        }
        g_e_bullet.move();
        g_bullet.move();
    }
    draw_level();
    g_dave.draw();
    if(g_enemy.flag == 0)
    {
        g_enemy.draw();
    }
    g_e_bullet.draw();
    g_bullet.draw();

    g_MenuBG.Draw();
    g_PlayBtn.Draw();
    g_PlayAgainBtn.Draw();
    g_Credits.Draw();
}
g_StartGUIElements();
var gameTimer = setInterval(gameLoop, 33.3333);