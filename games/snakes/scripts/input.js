// Javascript Document

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

function EventListener_MouseDown( event )
{
    var coords = canvas.adjustedMouseCoords(event);
    
    g_mousePosX = coords.x;//event.pageX - canvas.offsetLeft;
    g_mousePosY = coords.y;//event.pageY - canvas.offsetTop;
    g_PlayButton.Down();
    g_PlayAgainButton.Down();
}

function EventListener_MouseUp( event )
{
    var coords = canvas.adjustedMouseCoords(event);
    
    g_mousePosX = coords.x;//event.pageX - canvas.offsetLeft;
    g_mousePosY = coords.y;//event.pageY - canvas.offsetTop;
    g_PlayButton.Up();
    g_PlayAgainButton.Up();
}

function EventListener_KeyDown( event )
{
    if(event.keyCode == 37)  { g_key[0][0] = 1; }     // Left
    if(event.keyCode == 38)  { g_key[0][1] = 1; }     // Up
    if(event.keyCode == 39)  { g_key[0][2] = 1; }     // Right
    if(event.keyCode == 40)  { g_key[0][3] = 1; }     // Down
    
    if(event.keyCode == 65)  { g_key[1][0] = 1; }     // a
    if(event.keyCode == 87)  { g_key[1][1] = 1; }     // w
    if(event.keyCode == 68)  { g_key[1][2] = 1; }     // d
    if(event.keyCode == 83)  { g_key[1][3] = 1; }     // s
}

function EventListener_KeyUp( event )
{
    if(event.keyCode == 37)  { g_key[0][0] = 0; }     // Left
    if(event.keyCode == 38)  { g_key[0][1] = 0; }     // Up
    if(event.keyCode == 39)  { g_key[0][2] = 0; }     // Right
    if(event.keyCode == 40)  { g_key[0][3] = 0; }     // Down
    
    if(event.keyCode == 65)  { g_key[1][0] = 0; }     // a
    if(event.keyCode == 87)  { g_key[1][1] = 0; }     // w
    if(event.keyCode == 68)  { g_key[1][2] = 0; }     // d
    if(event.keyCode == 83)  { g_key[1][3] = 0; }     // s
}

HTMLCanvasElement.prototype.adjustedMouseCoords = adjustedMouseCoords;

document.addEventListener( "mousedown", EventListener_MouseDown, false );
document.addEventListener( "mouseup",   EventListener_MouseUp,   false );
document.addEventListener( "keydown",   EventListener_KeyDown,   false );
document.addEventListener( "keyup",     EventListener_KeyUp,     false );