//Javascript Document

function Start()
{
    StartGUIElements();
    StartSnakes();
    StartPowerUps();
}

function Reset()
{
    
}

function Update()
{
    if(g_gameRunning == true)
    {
        InitPowerUps();
        for( var i=0; i<g_Snake.length; i++ )
        {
            for( var j=0; j<g_Snake[i].speed; j++ )
            {
                g_Snake[i].Update();
                g_Snake[i].Collision();
            }
        }
        for( i=0; i<g_PowerUp.length; i++) { g_PowerUp[i].Update(); }
        CheckScores();
    }
}

function Draw()
{
    ctx.fillStyle = "white";
    ctx.fillRect( 0, 0, canvas.width, canvas.height );

    for(var i=0; i<g_Snake.length; i++) { g_Snake[i].Draw(); }
    for( i=0; i<g_PowerUp.length; i++) { g_PowerUp[i].Draw(); }
    DrawStats();
    g_MenuBackGround.Draw();
    g_CreditsBG.Draw();
    g_PlayButton.Draw();
    g_PlayAgainButton.Draw();
    g_Snake1Wins.Draw();
    g_Snake2Wins.Draw();
    g_BothLoose.Draw();
}

function GameLoop()
{
    Update();
    Draw();
}

// ***** // * Start of Game * // ***** //
Start();
g_gameTimer = setInterval("GameLoop()", g_gameInterval);