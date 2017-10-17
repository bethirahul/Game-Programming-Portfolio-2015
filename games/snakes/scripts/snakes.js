// Javascript Document

function ConstructSnake( l_ID, l_x, l_y, l_speed, l_nodes, l_nodeSize, l_color )
{
    this.ID       = l_ID;
    this.x        = l_x;
    this.y        = l_y;
    this.speed    = l_speed;
    this.nodes    = l_nodes;
    this.nodeSize = l_nodeSize;
    this.color    = l_color;
    this.score    = 0;
    this.input    = [0,0,0,0];
    this.node     = new Array(50);
    
    this.AddNode     = AddSnakeNode;
    this.RemoveNode  = RemoveSnakeNode;
    this.UpdateKeys  = UpdateSnakeKeys;
    this.Update      = UpdateSnake;
    this.UpdateNodes = UpdateSnakeNodes;
    this.Collision   = SnakeCollisions;
    this.Draw        = DrawSnake;
}

function InitSnakes()
{
    var l_y1 = 0;
    var l_y2 = 1;
    
    g_Snake[0].x = (canvas.width * 0.33);
    g_Snake[1].x = (canvas.width * 0.67);
    
    for(var i=0; i<g_Snake.length; i++)
    {
        g_Snake[i].y     = canvas.height * 0.515;
        g_Snake[i].speed = 2;
        g_Snake[i].nodes = 4;
        g_Snake[i].score = 0;
        l_y1 = g_Snake[i].y - ( (g_Snake[i].nodeSize + ((g_Snake[i].nodes-1)*(g_Snake[i].nodeSize * 1.05)) ) / 2);
        for(var j=0; j<g_Snake[i].node.length; j++)
        {
            g_Snake[i].node[j].x = g_Snake[i].x;
            g_Snake[i].node[j].y = l_y1;
            l_y2 = 1;
            for(var k=0; k<g_Snake[i].node[j].prevX.length; k++)
            {
                g_Snake[i].node[j].prevX[k] = g_Snake[i].x;
                g_Snake[i].node[j].prevY[k] = l_y1 + l_y2;
                l_y2++;
            }
            l_y1 = l_y1 + g_Snake[i].nodeSize * 1.05;
        }
        g_Snake[i].x = g_Snake[i].node[0].x;
        g_Snake[i].y = g_Snake[i].node[0].y;
    }
}

function UpdateSnake()
{
    g_checkMovementX = false;
    this.UpdateKeys();
    this.UpdateNodes();
}

function UpdateSnakeKeys()
{
    for(var i=0; i<this.input.length; i++)
    {
        this.input[i] = g_key[this.ID][i];
    }
}

function UpdateSnakeNodes()
{
    this.node[0].Update1();
    if(g_moved == true)
    {
        for(var i=(this.nodes-1); i>=0; i--)
        {
            this.node[i].Update2();
        }
    }
}

function SnakeCollisions()
{
    var l_j = 0;
    if(this.ID == 0) { l_j = 1; }
    for(var i=0; i<g_PowerUp.length; i++)
    {
        if(g_PowerUp[i].active == true && Math.abs(this.node[0].x - g_PowerUp[i].x) < this.nodeSize && Math.abs(this.node[0].y - g_PowerUp[i].y) < this.nodeSize)
        {
            g_PowerUp[i].active = false;
            if(i < 3)       { this.AddNode();    }
            else if(i == 3) { this.RemoveNode(); }
            else if(i == 4) { if(this.speed < 6) { this.score += 20; this.speed++; console.log(this.ID, this.speed); }}
            else if(i == 5) { if(this.speed > 1) { this.score += 10; this.speed--; console.log(this.ID, this.speed); }}
        }
    }
    if(this.node[0].x < (this.nodeSize/2) || this.node[0].x > (canvas.width -(this.nodeSize/2)))
    {
        GameOver(0,this.ID);
        return;
    }
    if(this.node[0].y < (this.nodeSize/2) || this.node[0].y > (canvas.height-(this.nodeSize/2)-g_scoreBarSize))
    {
        GameOver(0,this.ID);
        return;
    }
    for(i=0; i<this.nodes; i++)
    {
        if(i>2 && Math.abs(this.node[0].x - this.node[i].x) < this.nodeSize && Math.abs(this.node[0].y - this.node[i].y) < this.nodeSize)
        {
            GameOver(0,this.ID);
            return;
        }
    }
    for(i=0; i<g_Snake[l_j].nodes; i++)
    {
        if(Math.abs(this.node[0].x - g_Snake[l_j].node[i].x) < this.nodeSize && Math.abs(this.node[0].y - g_Snake[l_j].node[i].y) < this.nodeSize)
        {
            if(i == 0)
            {
                GameOver(1,0);
                return;
            }
            GameOver(2,this.ID);
            return;
        }
    }
}

function AddSnakeNode()
{
    this.score += 10;
    if(this.nodes < 50) { this.nodes++; }
    this.node[this.nodes-1].x = this.node[this.nodes-2].x;
    this.node[this.nodes-1].y = this.node[this.nodes-2].y;
    for(var i=0; i<this.node[this.nodes-1].prevX.length; i++)
    {
        this.node[this.nodes-1].prevX[i] = this.node[this.nodes-2].x;
        this.node[this.nodes-1].prevY[i] = this.node[this.nodes-2].y;
    }
}

function RemoveSnakeNode()
{
    this.score += 5;
    if(this.nodes > 4) { this.nodes--; }
}

function DrawSnake() { for(var i=0; i<this.nodes; i++) { this.node[i].Draw(); }}

function StartSnakes()
{
    var l_y  = canvas.height * 0.515;
    var l_y1 = 0;
    var l_y2 = 1;
    
    g_Snake[0] = new ConstructSnake( 0, (canvas.width * 0.33), l_y, 2, 4, 20, "yellow" );
    g_Snake[1] = new ConstructSnake( 1, (canvas.width * 0.67), l_y, 2, 4, 20, "green"  );
    
    for(var i=0; i<g_Snake.length; i++)
    {
        l_y1 = g_Snake[i].y - ( (g_Snake[i].nodeSize + ((g_Snake[i].nodes-1)*(g_Snake[i].nodeSize * 1.05)) ) / 2);
        for(var j=0; j<g_Snake[i].node.length; j++)
        {
            g_Snake[i].node[j] = new ConstructNode( i, j, g_Snake[i].x, l_y1, g_Snake[i].nodeSize );
            l_y2 = 1;
            for(var k=0; k<g_Snake[i].node[j].prevX.length; k++)
            {
                g_Snake[i].node[j].prevX[k] = g_Snake[i].x;
                g_Snake[i].node[j].prevY[k] = l_y1 + l_y2;
                l_y2++;
            }
            l_y1 = l_y1 + g_Snake[i].nodeSize * 1.05;
        }
        g_Snake[i].x = g_Snake[i].node[0].x;
        g_Snake[i].y = g_Snake[i].node[0].y;
    }
}