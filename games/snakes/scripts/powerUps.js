// Javascript Document

function ConstructPowerUp( l_ID, l_size, l_delay, l_color)
{
    this.ID     = l_ID
    this.x      = 0;
    this.y      = 0;
    this.size   = l_size;
    this.color  = l_color;
    this.delay  = l_delay;
    this.count  = 0;
    this.active = false;
    
    this.Update = UpdatePowerUps;
    this.Draw   = DrawPowerUps;
}

function InitPowerUps()
{
    var i;
    g_powerUpCount++;
    //console.log(g_powerUpCount);
    if(g_powerUpCount > g_powerUpDelay)
    {
        g_powerUpCount = 0;
        i = Math.floor(Math.random()*g_PowerUp.length);
        if(g_PowerUp[i].active == true)
        { i = Math.floor(Math.random()*g_PowerUp.length); }
        if(g_PowerUp[i].active == false)
        {
            g_PowerUp[i].x      = Math.floor((Math.random()*(canvas.width - g_PowerUp[i].size))                  + (g_PowerUp[i].size/2));
            g_PowerUp[i].y      = Math.floor((Math.random()*(canvas.width - g_PowerUp[i].size - g_scoreBarSize)) + (g_PowerUp[i].size/2));
            g_PowerUp[i].active = true;
            g_PowerUp[i].count  = 0;
        }
    }
}

function UpdatePowerUps()
{
    if(this.active == true)
    {
        this.count++;
        if(this.count > this.delay) { this.active = false; }
    }
}

function DrawPowerUps()
{
    var l_x, l_y;
    
    if(this.active == true)
    {
        l_x = this.x - (this.size/2);
        l_y = this.y - (this.size/2);
        
        ctx.fillStyle = "black";
        ctx.fillRect( (l_x - (this.size * 0.1)), (l_y - (this.size * 0.1)),
                             (this.size * 1.2),         (this.size * 1.2)   );
        ctx.fillStyle = this.color;
        ctx.fillRect( l_x, l_y, this.size, this.size );
    }
}

function StartPowerUps()
{
    for(var i=0; i<3; i++)
    {
        g_PowerUp[i] = new ConstructPowerUp( i, 20, 600, "orange");
    }
    g_PowerUp[3] = new ConstructPowerUp( i, 20, 500, "pink");
    g_PowerUp[4] = new ConstructPowerUp( i, 20, 500, "blue");
    g_PowerUp[5] = new ConstructPowerUp( i, 20, 500, "red");
}