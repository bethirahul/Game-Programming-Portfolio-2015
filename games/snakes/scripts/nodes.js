// Javascript Document

function ConstructNode( l_snakeID, l_ID, l_x, l_y, l_size )
{
    this.snakeID = l_snakeID
    this.ID      = l_ID;
    this.x       = l_x;
    this.y       = l_y;
    this.x1      = 0;
    this.y1      = 0;
    this.size    = l_size;
    this.prevX   = new Array(21);
    this.prevY   = new Array(21);
    
    this.Init          = InitNode;
    this.Update1       = UpdateNode_1;
    this.Update2       = UpdateNode_2;
    this.Draw          = DrawNode;
    this.CheckMovement = CheckNodeMovement;
}

function InitNode()
{
    
}

function UpdateNode_1()
{
    g_checkMovementX = false;
    g_moved  = false;
    g_movedX = false;
    g_movedY = false;
    if((g_Snake[this.snakeID].input[0] + g_Snake[this.snakeID].input[2]) == 1)
    {
        this.x1 = this.x  - g_Snake[this.snakeID].input[0];
        this.x1 = this.x1 + g_Snake[this.snakeID].input[2];
        this.CheckMovement();
    }
    g_checkMovementX = true;
    if((g_Snake[this.snakeID].input[1] + g_Snake[this.snakeID].input[3]) == 1)
    {
        this.y1 = this.y  - g_Snake[this.snakeID].input[1];
        this.y1 = this.y1 + g_Snake[this.snakeID].input[3];
        this.CheckMovement();
    }
}

function UpdateNode_2()
{
    for(var i=(this.prevX.length-1); i>=0; i--)
    {
        if(i != 0)
        {
            this.prevX[i] = this.prevX[i-1];
            this.prevY[i] = this.prevY[i-1];
        }
        else
        {
            this.prevX[i] = this.x;
            this.prevY[i] = this.y;
        }
    }
    if(this.ID != 0)
    {
        this.x = g_Snake[this.snakeID].node[this.ID-1].prevX[this.prevX.length-2];
        this.y = g_Snake[this.snakeID].node[this.ID-1].prevY[this.prevY.length-2];
    }
    else
    {
        if(g_movedX == true) { this.x = this.x1; }
        if(g_movedY == true) { this.y = this.y1; }
    }
}

function CheckNodeMovement()
{
    var l_a;
    if(g_checkMovementX == false)
    {
        l_a = false;
        for(var i=0; i<this.prevX.length; i++)
        {
            if(this.x1 == this.prevX[i])
            {
                i   = this.prevX.length;
                l_a = true;
            }
        }
        if(l_a == false) { g_movedX = true; g_moved = true; }
    }
    else
    {
        l_a = false;
        for(var i=0; i<this.prevY.length; i++)
        {
            if(this.y1 == this.prevY[i])
            {
                i   = this.prevY.length;
                l_a = true;
            }
        }
        if(l_a == false) { g_movedY = true; g_moved = true; }
    }
}

function DrawNode()
{
    var l_x = this.x - (this.size/2);
    var l_y = this.y - (this.size/2);
    
    ctx.fillStyle = "black";
    ctx.fillRect( (l_x - (this.size * 0.1)), (l_y - (this.size * 0.1)),
                         (this.size * 1.2),         (this.size * 1.2)   );
    if(this.ID != 0)
    {
        ctx.fillStyle = g_Snake[this.snakeID].color;
        ctx.fillRect( l_x, l_y, this.size, this.size );
    }
}