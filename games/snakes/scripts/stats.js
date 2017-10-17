// Javascript Document

function StartStats()
{
    
}

function UpdateStats()
{
    
}

function DrawStats()
{
    ctx.fillStyle = g_Snake[0].color;
    ctx.fillRect(0, (canvas.height-g_scoreBarSize), (canvas.width/2), g_scoreBarSize);
    ctx.fillStyle = g_Snake[1].color;
    ctx.fillRect((canvas.width/2), (canvas.height-g_scoreBarSize), (canvas.width/2), g_scoreBarSize);
    ctx.font = "25px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Speed: " + g_Snake[0].speed + "x     Score: "+g_Snake[0].score, 10,(canvas.height-7));
    ctx.fillStyle = "white";
    ctx.fillText("Speed: " + g_Snake[1].speed + "x     Score: "+g_Snake[1].score, ((canvas.width/2)+10),(canvas.height-7));
}