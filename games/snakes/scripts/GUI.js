// Javascript Document

function ConstructGUIElement( l_x, l_y, l_sizeX, l_sizeY, l_color1, l_color2, l_fontSize, l_text, l_textX, l_textY, l_active )
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
    this.active   = l_active;
    this.down     = false;
    
    this.Down     = ButtonDown;
    this.Up       = ButtonUp;
    this.Draw     = DrawGUIElement;
}

function ButtonDown()
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

function ButtonUp()
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
                    StartGame();
                }
            }
        }
        if(this.down) { this.down = false; }
    }
}

function DrawGUIElement()
{
    if(this.active)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect( (this.x - (this.sizeX/2)), (this.y - (this.sizeY/2)),
                       this.sizeX,                this.sizeY                );
        ctx.font = this.fontSize + "px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(this.text, this.textX, this.textY);
    }
}

function StartGUIElements()
{
    var tfX = canvas.width /2;
    var tfY = canvas.height/2;
    
    g_MenuBackGround  = new ConstructGUIElement( tfX, tfY, 225, 225, "blue",      null,   30, "Snake Game",           272, 300, true  );
    g_PlayButton      = new ConstructGUIElement( tfX, tfY, 100,  50, "red",      "green", 30, "Play",                 330, 370, true  );
    g_PlayAgainButton = new ConstructGUIElement( tfX, tfY, 170,  50, "red",      "green", 30, "Play Again",           290, 370, false );
    g_CreditsBG       = new ConstructGUIElement( tfX, 430, 260,  40, "darkblue",  null,   20, "Credits: RAHUL BETHI", 250, 437, true  );
    g_Snake1Wins      = new ConstructGUIElement( tfX, 500, 260,  40, "darkgreen", null,   20, "Snake 1 Wins",         295, 507, false );
    g_Snake2Wins      = new ConstructGUIElement( tfX, 500, 260,  40, "darkgreen", null,   20, "Snake 2 Wins",         295, 507, false );
    g_BothLoose       = new ConstructGUIElement( tfX, 500, 260,  40, "red",       null,   20, "Both Loose!",          305, 507, false );
}