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

    g_MenuBG       = new c_create_GUI( l_x, l_y, 237, 220, "white",  null,     30, "Space Invaders",       407, 325, true  );
    g_PlayBtn      = new c_create_GUI( l_x, l_y, 100,  50, "red",   "#33ff00", 30, "Play",                 483, 393, true  );
    g_PlayAgainBtn = new c_create_GUI( l_x, l_y, 170,  50, "red",   "#33ff00", 30, "Play Again",           440, 393, false );
    g_Credits      = new c_create_GUI( l_x, 450, 260,  40, "grey",   null,     20, "Credits: RAHUL BETHI", 400, 457, true  );
}

function g_StartGame()
{
    g_MenuBG.active = false;
    g_PlayBtn.active = false;
    g_PlayAgainBtn.active = false;
    g_Credits.active = false;
    
    g_gamePaused  = false;
    g_score.value = 0;
    g_lives.value = 3;
    g_ship.x = 50;
    g_ship.y = 686;
    g_ship.alive = 1;
    for(var n=0;n<4;n++)
        g_block[n] = new c_create_block((n*220)+136);
    g_enemies = new c_create_enemies();
    g_redEnemy = new c_create_redEnemy();
    for(n=0;n<20;n++)
        g_bullet[n] = new c_create_bullet(n);
    for(n=0;n<3;n++)
    {
        g_e_bullet[0][n] = new c_create_e_bullet(0,n);
        g_e_bullet[1][n] = new c_create_e_bullet(1,n);
    }
    g_counterB = 0;
    g_counterEB = Math.floor((Math.random()*8)+ 2);
    g_ship_counter = 0;
    g_explosion = new c_create_explosion();
    for(i=0;i<10;i++)
        g_e_explosion[i] = new c_create_e_explosion();
}

function g_GameOver()
{
    g_gamePaused = true;
    
    g_MenuBG.active = true;
    g_PlayAgainBtn.active = true;
    g_Credits.active = true;
}