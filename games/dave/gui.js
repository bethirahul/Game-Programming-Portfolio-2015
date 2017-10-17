// Javascript Document

var g_PlayBtn, g_PlayAgainBtn, g_MenuBG, g_Credits, g_mousePosX, g_mousePosY;

function c_create_GUI( l_x, l_y, l_sizeX, l_sizeY, l_color1, l_color2, l_fontSize, l_text, l_textX, l_textY, l_active )
{
    this.x        = l_x;
    this.y        = l_y;
    this.sizeX    = l_sizeX;
    this.sizeY    = l_sizeY;
    this.color    = l_color1;
    this.color1   = l_color1;
    this.color2   = l_color2;
    this.fontSize = l_fontSize;
    this.text     = l_text;
    this.textX    = l_textX;
    this.textY    = l_textY;
    this.down     = false;
    this.active   = l_active;

    this.Down     = m_GUIButtonDown;
    this.Up       = m_GUIButtonUp;
    this.Draw     = m_DrawGUIElement;
}

function m_GUIButtonDown()
{
    if(this.active)
    {
        if( g_mousePosX >= (this.x - (this.sizeX/2)) &&
           g_mousePosX <= (this.x + (this.sizeX/2))    )
        {
            if( g_mousePosY >= (this.y - (this.sizeY/2)) &&
               g_mousePosY <= (this.y + (this.sizeY/2))    )
            {
                this.color = this.color2;
                this.down  = true;
            }
        }
    }
}

function m_GUIButtonUp()
{
    if(this.active)
    {
        this.color = this.color1;
        if( g_mousePosX >= (this.x - (this.sizeX/2)) &&
           g_mousePosX <= (this.x + (this.sizeX/2))    )
        {
            if( g_mousePosY >= (this.y - (this.sizeY/2)) &&
               g_mousePosY <= (this.y + (this.sizeY/2))    )
            {
                if(this.down)
                {
                    g_StartGame();
                }
            }
        }
        if(this.down) { this.down = false; }
    }
}

function m_DrawGUIElement()
{
    if(this.active)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect( (this.x - (this.sizeX/2)), (this.y - (this.sizeY/2)),
                     this.sizeX,                this.sizeY      );
        ctx.font      = this.fontSize + "px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(this.text, this.textX, this.textY);
    }
}

function g_StartGUIElements()
{
    var l_x = canvas.width /2;
    var l_y = canvas.height/2;

    g_MenuBG       = new c_create_GUI( l_x, l_y, 247, 220, "white",  null,   30, "Dangerous Dave",       207, 140, true  );
    g_PlayBtn      = new c_create_GUI( l_x, l_y, 100,  50, "red",   "green", 30, "Play",                 291, 210, false );
    g_PlayAgainBtn = new c_create_GUI( l_x, l_y, 170,  50, "red",   "green", 30, "Play Again",           250, 210, true  );
    g_Credits      = new c_create_GUI( l_x, 270, 260,  40, "grey",   null,   20, "Credits: RAHUL BETHI", 208, 277, true  );
}

function g_StartGame()
{
    g_MenuBG.active = false;
    g_PlayBtn.active = false;
    g_PlayAgainBtn.active = false;
    g_Credits.active = false;

    g_gamePaused = false;
    
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
    g_dave      = new create_dave(0,32,288);
    g_enemy     = new create_enemy(576,128);
    g_bullet    = new create_bullet();
    g_e_bullet  = new create_e_bullet();
    g_life_num  = 3;
    g_cup_disp  = 0;
    g_cup_num   = 1;
    g_cup_flag  = 1;
    g_gun_flag  = 0;
    g_score_num = 0;
}

function g_GameOver()
{
    g_gamePaused = true;

    g_MenuBG.active = true;
    g_PlayAgainBtn.active = true;
    g_Credits.active = true;
}