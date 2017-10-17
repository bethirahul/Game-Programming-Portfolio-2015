// Javascript Document

function StartGame()
{
    g_gameRunning            = true  ;
    g_MenuBackGround.active  = false ;
    g_CreditsBG.active       = false ;
    g_PlayButton.active      = false ;
    g_PlayAgainButton.active = false ;
    g_Snake1Wins.active      = false ;
    g_Snake2Wins.active      = false ;
    g_BothLoose.active       = false ;
    g_powerUpCount = 0;
    InitSnakes();
    for(var i=0; i< g_PowerUp.length; i++) { g_PowerUp[i].active = false; }
    InitPowerUps();
}

function CheckScores()
{
         if(g_Snake[0].score >= g_maxScore && g_Snake[1].score <  g_maxScore) { GameOver(3,0); }
    else if(g_Snake[1].score >= g_maxScore && g_Snake[0].score <  g_maxScore) { GameOver(3,1); }
    else if(g_Snake[1].score >= g_maxScore && g_Snake[0].score >= g_maxScore)
    {
        if(g_Snake[0].score > g_Snake[1].score) { GameOver(3,0); }
        if(g_Snake[1].score > g_Snake[0].score) { GameOver(3,1); }
    }
}

function GameOver(l_condition, l_snakeID)
{
    g_gameRunning            = false ;
    g_MenuBackGround.active  = true  ;
    g_CreditsBG.active       = true  ;
    g_PlayAgainButton.active = true  ;
    
    if(l_condition == 0)
    {
        if(l_snakeID == 0) { g_Snake2Wins.active = true; }
        if(l_snakeID == 1) { g_Snake1Wins.active = true; }
    }
    else if(l_condition == 1)
    {
        g_BothLoose.active = true;
    }
    else if(l_condition == 2)
    {
        if(l_snakeID == 0) { g_Snake2Wins.active = true; }
        if(l_snakeID == 1) { g_Snake1Wins.active = true; }
    }
    else if(l_condition == 3)
    {
        if(l_snakeID == 0) { g_Snake1Wins.active = true; }
        if(l_snakeID == 1) { g_Snake2Wins.active = true; }
    }
}