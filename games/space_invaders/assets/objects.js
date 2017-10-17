function c_create_score()
{
	this.value = 0;
	this.bitmap = new Array(5);
	this.bitmap[0] = [0,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1];
	this.bitmap[1] = [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0];
	this.bitmap[2] = [0,1,1,1,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,1,1,1,0,0,1,1,1,1,0];
	this.bitmap[3] = [0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0];
	this.bitmap[4] = [1,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,0,0,1,0,0,0,1,0,1,1,1,1,1];
	this.num = new Array(10);
	for(var i = 0; i< 10; i++)
		this.num[i] = new Array(5);
	this.num[0][0] = [0,1,1,1,0];
	for(var j=1;j<=3;j++)
		this.num[0][j] = [1,0,0,0,1];
	this.num[0][4] = [0,1,1,1,0];
	this.num[1][0] = [1,1];
	for(j=1;j<=4;j++)
		this.num[1][j] = [0,1];
	for(i=4;i<=7;i=i+3)
		for(j=3;j<=4;j++)
			this.num[i][j] = [0,0,0,0,1];
	this.num[2][0] = [1,1,1,1,0];
	this.num[2][1] = [0,0,0,0,1];
	this.num[2][2] = [0,1,1,1,1];
	this.num[2][3] = [1,0,0,0,0];
	this.num[2][4] = [1,1,1,1,1];
	this.num[3][0] = [1,1,1,1,0];
	this.num[3][1] = [0,0,0,0,1];
	this.num[3][2] = [0,1,1,1,0];
	this.num[3][3] = [0,0,0,0,1];
	this.num[3][4] = [1,1,1,1,0];
	this.num[4][0] = [1,0,0,0,1];
	this.num[4][1] = [1,0,0,0,1];
	this.num[4][2] = [1,1,1,1,1];
	this.num[5][0] = [1,1,1,1,1];
	this.num[5][1] = [1,0,0,0,0];
	this.num[5][2] = [1,1,1,1,0];
	this.num[5][3] = [0,0,0,0,1];
	this.num[5][4] = [1,1,1,1,0];
	this.num[6][0] = [0,1,1,1,1];
	this.num[6][1] = [1,0,0,0,0];
	this.num[6][2] = [1,1,1,1,0];
	this.num[6][3] = [1,0,0,0,1];
	this.num[6][4] = [0,1,1,1,0];
	this.num[7][0] = [1,1,1,1,1];
	this.num[7][1] = [0,0,0,0,1];
	this.num[7][2] = [0,0,0,0,1];
	for(i=8;i<=9;i++)
		for(j=0;j<=4;j=j+4)
			this.num[i][j] = [0,1,1,1,0];
	this.num[8][1] = [1,0,0,0,1];
	this.num[8][2] = [0,1,1,1,0];
	this.num[8][3] = [1,0,0,0,1];
	this.num[9][1] = [1,0,0,0,1];
	this.num[9][2] = [0,1,1,1,1];
	this.num[9][3] = [0,0,0,0,1];
	this.draw = m_draw_score;
}
function m_draw_score()
{
	var l_score = "",l_x = 168,l_length,l_a,l_b = "",l_c,l_d = "";
	ctx.fillStyle = "white";
	for(var i=0;i<5;i++)
		for(var j=0;j<29;j++)
			if(this.bitmap[i][j] == 1)
				ctx.fillRect((j*4)+20,(i*4)+13,4,4);
	ctx.fillStyle = "#33ff00";
	l_c = this.value.toString();
	if(l_c.length > 3)
	{
		for(var k=l_c.length-1; k>=0; k--)
		{
			l_b = l_b + l_c[k];
		}
		l_d = l_d + l_b[0];
		for(k=1;k<l_b.length; k++)
		{
			if(k%3 == 0)
				l_d = l_d + ",";
			l_d = l_d + l_b[k];
		}
		for(var k=l_d.length-1; k>=0; k--)
		{
			l_score = l_score + l_d[k];
		}
	}
	else
		l_score = l_c;
	for(k = 0; k< l_score.length; k++)
	{
		if(l_score[k] != ",")
		{
			l_a = parseInt(l_score[k]);
			for(i=0; i<5; i++)
			{
				l_length = this.num[l_a][i].length;
				for(j = 0; j< l_length; j++)
					if(this.num[l_a][i][j] == 1)
						ctx.fillRect((j*4)+l_x,(i*4)+13,4,4);
			}
		}
		else
		{
			ctx.fillRect(l_x+4,29,4,8);
			ctx.fillRect(l_x,37,4,4);
			l_length = 2;
		}
		l_x = l_x + ((l_length+1)*4);
	}
}

function c_create_ship(l_x)
{
	this.x = l_x;
	this.y = 686;
	this.bitmap = new Array(8);
	this.bitmap[0] = [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0];
	this.bitmap[1] = [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0];
	this.bitmap[2] = [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0];
	this.bitmap[3] = [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0];
	for(var i=4; i<8; i++)
		this.bitmap[i] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	this.key_code = [18,37,39];
	this.key = [0,0,0];
	this.speed = 8;
	this.update = m_update_ship;
	this.draw = m_draw_ship;
	this.alive = 1;
}
function m_update_ship()
{
	var l_xDir = 0;
	if(this.alive == 1)
	{
		if(this.key[1] == 1)
		{
			l_xDir = -this.speed;
		}
		if(this.key[2] == 1)
		{
			l_xDir = l_xDir + this.speed;
		}
		this.x = this.x + l_xDir;
		if(this.x < 0)
		{
			this.x = 0;
		}
		else if(this.x > (canvas.width-60))
		{
			this.x = canvas.width-60;
		}
	}
	else
	{
		if(g_ship_counter == 40)
		{
			this.alive = 1;
			g_ship_counter = 0;
		}
	}
}
function m_draw_ship()
{
	if(this.alive == 1)
	{
		ctx.fillStyle = "#33ff00";
		for(i=0;i<8;i++)
		{
			for(j=0;j<15;j++)
			{
				if(this.bitmap[i][j] == 1)
				{
					ctx.fillRect((j*4)+this.x,(i*4)+this.y,4,4);
				}
			}
		}
	}
}

function c_create_lives()
{
	this.value = 3;
	this.bitmap = new Array(5);
	this.bitmap[0] = [1,0,0,0,0,1,0,1,0,0,0,1,0,1,1,1,1,1,0,0,1,1,1,1];
	this.bitmap[1] = [1,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0];
	this.bitmap[2] = [1,0,0,0,0,1,0,1,0,0,0,1,0,1,1,1,1,0,0,0,1,1,1,0];
	this.bitmap[3] = [1,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1];
	this.bitmap[4] = [1,1,1,1,0,1,0,0,0,1,0,0,0,1,1,1,1,1,0,1,1,1,1,0];
	this.draw = m_draw_lives;
}
function m_draw_lives()
{
	var l_x = 652;
	ctx.fillStyle = "white";
	for(var i=0;i<5;i++)
	{
		for(var j=0;j<24;j++)
		{
			if(this.bitmap[i][j] == 1)
			{
				ctx.fillRect((j*4)+515,(i*4)+13,4,4);
			}
		}
	}
	ctx.fillStyle = "#33ff00";
	for(var k=0;k < this.value; k++)
	{
		for(i=0;i<8;i++)
		{
			for(j=0;j<15;j++)
			{
				if(g_ship.bitmap[i][j] == 1)
				{
					ctx.fillRect((j*4)+l_x,(i*4)+1,4,4);
				}
			}
		}
		l_x = l_x + 80;
	}
}

function c_create_block(l_x)
{
	this.x = l_x;
	this.bitmap1 = new Array(3);
	this.bitmap1[0] = [1,2,3, 4];
	this.bitmap1[1] = [5,6,7, 8];
	this.bitmap1[2] = [9,0,0,10];
	this.bitmap2 = new Array(11);
	for(var i=1;i<11;i++)
		this.bitmap2[i] = new Array(6);
	for(i=2;i<11;i++)
		for(j=0;j<6;j++)
			this.bitmap2[i][j] = [1,1,1,1,1,1];
	this.bitmap2[1][0] = [0,0,0,1,1,1];
	this.bitmap2[1][1] = [0,0,1,1,1,1];
	this.bitmap2[1][2] = [0,1,1,1,1,1];
	this.bitmap2[4][0] = [1,1,1,0,0,0];
	this.bitmap2[4][1] = [1,1,1,1,0,0];
	this.bitmap2[4][2] = [1,1,1,1,1,0];
	for(i=1;i<=4;i=i+3)
		for(var j=3;j<=5;j++)
			this.bitmap2[i][j] = [1,1,1,1,1,1];
	for(i=6;i<=7;i++)
		for(j=0;j<=1;j++)
			this.bitmap2[i][j] = [1,1,1,1,1,1];
	this.bitmap2[6][2] = [1,1,1,1,0,0];
	this.bitmap2[6][3] = [1,1,1,0,0,0];
	this.bitmap2[6][4] = [1,1,0,0,0,0];
	this.bitmap2[6][5] = [1,0,0,0,0,0];
	this.bitmap2[7][2] = [0,0,1,1,1,1];
	this.bitmap2[7][3] = [0,0,0,1,1,1];
	this.bitmap2[7][4] = [0,0,0,0,1,1];
	this.bitmap2[7][5] = [0,0,0,0,0,1];
	this.bitmap3 = new Array(3);
	this.bitmap3[0] = [4,4,4,4];
	this.bitmap3[1] = [4,4,4,4];
	this.bitmap3[2] = [4,0,0,4];
	this.draw = m_draw_block;
}
function m_draw_block()
{
	l_x=this.x,l_y=557,l_a = 0;
	ctx.fillStyle = "#33ff00";
	for(var k=0;k<3;k++)
	{
		for(var l=0;l<4;l++)
		{
			l_a = this.bitmap1[k][l];
			if(l_a != 0)
			{
				for(var i=0; i<6; i++)
				{
					for(var j=0; j<6; j++)
					{
						if(this.bitmap2[l_a][i][j] == 1)
						{
							ctx.fillRect((j*4)+l_x,(i*4)+l_y,4,4);
						}
					}
				}
			}
			l_x = l_x + 24;
		}
		l_x = this.x;
		l_y = l_y + 24;
	}
}

function c_create_enemies()
{
	this.x = 0;
	this.y = 98;
	this.image = 0;
	this.count = 0;
	this.count2 = 0;
	this.speed = 12;
	this.freq = 25;
	this.alive = 1;
	this.bitmap = new Array(5);
	this.bitmap[0] = [3,3,3,3,3,3,3,3,3,3,3];
	this.bitmap[1] = [2,2,2,2,2,2,2,2,2,2,2];
	this.bitmap[2] = [2,2,2,2,2,2,2,2,2,2,2];
	this.bitmap[3] = [1,1,1,1,1,1,1,1,1,1,1];
	this.bitmap[4] = [1,1,1,1,1,1,1,1,1,1,1];
	this.e_bitmap = new Array(4);
	for(var i=0;i<4;i++)
		this.e_bitmap[i] = new Array(2);
	this.e_bitmap[1][0] = new Array(8);
	this.e_bitmap[1][1] = new Array(8);
	for(i=0;i<=1;i++)
	{
		this.e_bitmap[1][i][0] = [0,0,0,0,1,1,1,1,0,0,0,0];
		this.e_bitmap[1][i][1] = [0,1,1,1,1,1,1,1,1,1,1,0];
		this.e_bitmap[1][i][2] = [1,1,1,1,1,1,1,1,1,1,1,1];
		this.e_bitmap[1][i][3] = [1,1,1,0,0,1,1,0,0,1,1,1];
		this.e_bitmap[1][i][4] = [1,1,1,1,1,1,1,1,1,1,1,1];
	}
	this.e_bitmap[1][0][5] = [0,0,0,1,1,0,0,1,1,0,0,0];
	this.e_bitmap[1][0][6] = [0,0,1,1,0,1,1,0,1,1,0,0];
	this.e_bitmap[1][0][7] = [1,1,0,0,0,0,0,0,0,0,1,1];
	this.e_bitmap[1][1][5] = [0,0,1,1,1,0,0,1,1,1,0,0];
	this.e_bitmap[1][1][6] = [0,1,1,0,0,1,1,0,0,1,1,0];
	this.e_bitmap[1][1][7] = [0,0,1,1,0,0,0,0,1,1,0,0];
	this.e_bitmap[2][0] = new Array(8);
	this.e_bitmap[2][0][0] = [0,0,1,0,0,0,0,0,1,0,0];
	this.e_bitmap[2][0][1] = [1,0,0,1,0,0,0,1,0,0,1];
	this.e_bitmap[2][0][2] = [1,0,1,1,1,1,1,1,1,0,1];
	this.e_bitmap[2][0][3] = [1,1,1,0,1,1,1,0,1,1,1];
	this.e_bitmap[2][0][4] = [1,1,1,1,1,1,1,1,1,1,1];
	this.e_bitmap[2][0][5] = [0,1,1,1,1,1,1,1,1,1,0];
	this.e_bitmap[2][0][6] = [0,0,1,0,0,0,0,0,1,0,0];
	this.e_bitmap[2][0][7] = [0,1,0,0,0,0,0,0,0,1,0];
	this.e_bitmap[2][1] = new Array(8);
	this.e_bitmap[2][1][0] = [0,0,1,0,0,0,0,0,1,0,0];
	this.e_bitmap[2][1][1] = [0,0,0,1,0,0,0,1,0,0,0];
	this.e_bitmap[2][1][2] = [0,0,1,1,1,1,1,1,1,0,0];
	this.e_bitmap[2][1][3] = [0,1,1,0,1,1,1,0,1,1,0];
	this.e_bitmap[2][1][4] = [1,1,1,1,1,1,1,1,1,1,1];
	this.e_bitmap[2][1][5] = [1,1,1,1,1,1,1,1,1,1,1];
	this.e_bitmap[2][1][6] = [1,0,1,0,0,0,0,0,1,0,1];
	this.e_bitmap[2][1][7] = [0,0,0,1,1,0,1,1,0,0,0];
	this.e_bitmap[3][0] = new Array(8);
	this.e_bitmap[3][1] = new Array(8);
	for(i=0;i<=1;i++)
	{
		this.e_bitmap[3][i][0] = [0,0,0,1,1,0,0,0];
		this.e_bitmap[3][i][1] = [0,0,1,1,1,1,0,0];
		this.e_bitmap[3][i][2] = [0,1,1,1,1,1,1,0];
		this.e_bitmap[3][i][3] = [1,1,0,1,1,0,1,1];
		this.e_bitmap[3][i][4] = [1,1,1,1,1,1,1,1];
	}
	this.e_bitmap[3][0][5] = [0,0,1,0,0,1,0,0];
	this.e_bitmap[3][0][6] = [0,1,0,1,1,0,1,0];
	this.e_bitmap[3][0][7] = [1,0,1,0,0,1,0,1];
	this.e_bitmap[3][1][5] = [0,1,0,1,1,0,1,0];
	this.e_bitmap[3][1][6] = [1,0,0,0,0,0,0,1];
	this.e_bitmap[3][1][7] = [0,1,0,0,0,0,1,0];
	this.update = m_update_enemies;
	this.draw = m_draw_enemies;
}
function m_update_enemies()
{
	var l_x1=0,l_x2=(canvas.width-653),l_y = (canvas.height-272-82),l_a1,l_a2,l_b;
	var l_sum=new Array(11);
	var l_sum2 = new Array(5);
	var l_sumAll = 0;
	if(this.count > this.freq)
	{
		if(this.image == 0)
			this.image = 1;
		else if(this.image == 1)
			this.image = 0;
		this.count = 0;
		this.x = this.x + this.speed;
		if(this.count2 > 15)
		{
			if(this.freq > 2)
			{
				this.freq = this.freq - 1;
				if(this.freq > 8)
					this.freq = this.freq - 1;
			}
			this.count2 = 0;
		}
		this.count2++;
		if(g_counterEB > 0)
		{
			g_counterEB--;
		}
	}
	this.count++;
	for(i=0;i<11;i++)
		l_sum[i] = 0;
	for(var j=0;j<11;j++)
	{
		for(var i=0;i<5;i++)
		{
			if(this.bitmap[i][j] != 0)
			{
				l_sum[j]++;
				l_sumAll++;
			}
		}
	}
	if(l_sumAll == 0)
		g_GameOver();
	else
	{
		for(i=0;i<11;i++)
		{
			if(l_sum[i] != 0)
			{
				l_a1 = i;
				i=11;
			}
		}
		for(i=10;i>=0;i--)
		{
			if(l_sum[i] != 0)
			{
				l_a2 = i;
				i=-1;
			}
		}
		l_x1 = l_x1 - (l_a1*60);
		l_x2 = l_x2 + ((10-l_a2)*60);
	}
	if(this.x > l_x2)
	{
		this.x = this.x - Math.abs(this.speed);
		this.y = this.y + 20;
		this.speed = -Math.abs(this.speed);
	}
	if(this.x < l_x1)
	{
		this.x = this.x + Math.abs(this.speed);
		this.y = this.y + 20;
		this.speed = Math.abs(this.speed);
	}
	for(i=0;i<5;i++)
		l_sum2[i] = 0;
	for(i=0;i<5;i++)
	{
		for(j=0;j<11;j++)
		{
			if(this.bitmap[i][j] != 0)
			{
				l_sum2[i]++;
			}
		}
	}
	for(i=4;i>=0;i--)
	{
		if(l_sum2[i] !=0)
		{
			l_b = i;
			i = -1;
		}
	}
	l_y = l_y + ((4-l_b)*60);
	if(this.y > l_y)
	{
		g_GameOver();
	}
}
function m_draw_enemies()
{
	var l_x = this.x,l_y = this.y,l_a,l_b,l_length,l_x1;
	ctx.fillStyle = "white";
	l_b = this.image;
	for(var k=0;k<5;k++)
	{
		for(var l=0;l<11;l++)
		{
			l_a = this.bitmap[k][l];
			if(l_a != 0)
			{
				l_x1 = l_x + ((l_a-1)*4);
				l_length = this.e_bitmap[l_a][0][0].length;
				for(var i=0;i<8;i++)
				{
					for(var j=0;j<l_length;j++)
					{
						if(this.e_bitmap[l_a][l_b][i][j] == 1)
						{
							ctx.fillRect((j*4)+l_x1,(i*4)+l_y,4,4);
						}
					}
				}
			}
			l_x = l_x + 60;
		}
		l_x = this.x;
		l_y = l_y + 60;
	}
}

function c_create_redEnemy()
{
	this.alive = 0;
	this.constant = 0;
	this.count = -1;
	this.count2 = 0;
	this.speed = 4;
	this.value = 0;
	this.bitmap = new Array(7);
	this.bitmap[0] = [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0];
	this.bitmap[1] = [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0];
	this.bitmap[2] = [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0];
	this.bitmap[3] = [0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0];
	this.bitmap[4] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	this.bitmap[5] = [0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0];
	this.bitmap[6] = [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0];
	this.update = m_update_redEnemy;
	this.draw = m_draw_redEnemy;
}
function m_update_redEnemy()
{
	if(this.alive == 0)
	{
		if(this.count == -1)
		{
			this.count = Math.floor(Math.random()*120);
		}
		if(this.count == 120)
		{
			this.constant = Math.floor(Math.random()*2);
			this.alive = 1;
			if(this.constant == 0)
			{
				this.x = -64;
				this.xDir = this.speed;
			}
			else
			{
				this.x = canvas.width + 64;
				this.xDir = -this.speed;
			}
			this.count = -2;
		}
		this.count++;
	}
	else if(this.alive == 1)
	{
		this.x = this.x + this.xDir;
		if((this.x < -64)||(this.x > (canvas.width + 64)))
		{
			this.alive = 0;
		}
	}
}
function m_draw_redEnemy()
{
	var l_length,l_x = this.x;
	ctx.fillStyle = "red";
	if(this.alive == 1)
	{
		for(var i=0;i<7;i++)
			for(var j=0;j<16;j++)
				if(this.bitmap[i][j] == 1)
					ctx.fillRect((j*4)+this.x,(i*4)+53,4,4);
	}
	if(this.alive == 2)
	{
		l_d = this.value.toString();
		for(i=0; i<5; i++)
		{
			l_length = g_score.num[this.value][i].length;
			for(j = 0; j< l_length; j++)
				if(g_score.num[this.value][i][j] == 1)
					ctx.fillRect((j*4)+l_x,(i*4)+53,4,4);    
		}
		l_x = l_x + ((l_length+1)*4);
		for(var k=0;k<2;k++)
		{
			for(i=0; i<5; i++)
			{
				for(j = 0; j< 5; j++)
					if(g_score.num[0][i][j] == 1)
						ctx.fillRect((j*4)+l_x,(i*4)+53,4,4);
			}
			l_x = l_x + 24;
		}
		if(this.count2 == 10)
		{
			this.count2 = 0;
			this.alive = 0;
		}
		this.count2++;
	}
}

function c_create_bullet(l_place)
{
	this.x = g_ship.x + 24;
	this.y = g_ship.y;
	this.active = 0;
	this.speed = 12;
	this.update = m_update_bullet;
	this.draw = m_draw_bullet;
	this.place = l_place;
}
function m_update_bullet()
{
	if(this.active == 1)
	{
		this.y = this.y - this.speed;
		if(this.y < 13)
		{
			this.active = 0;
		}
		g_bullet_collision(this.place);
	}
	if(this.active == 0)
	{
		this.x = g_ship.x + 28;
		this.y = g_ship.y;
	}
}
function m_draw_bullet()
{
	if(this.active == 1)
	{
		ctx.fillStyle = "white";
		ctx.fillRect(this.x,this.y,4,20)
	}
}

function c_create_e_bullet(l_type,l_place)
{
	this.x = 0;
	this.y = 0;
	this.active = 0;
	this.type = l_type;
	this.image = -1;
	this.place = l_place;
	this.speed = new Array(2);
	this.speed[0] = 8;
	this.speed[1] = 12;
	this.bitmap = new Array(2);
	this.bitmap[0] = new Array(4);
	this.bitmap[1] = new Array(4);
	for(var k=0;k<2;k++)
		for(var l=0;l<4;l++)
			this.bitmap[k][l] = new Array(5);
	for(l=1;l<4;l=l+2)
	{
		this.bitmap[0][l][0] = [0,0,0];
		this.bitmap[0][l][1] = [0,1,0];
		this.bitmap[0][l][2] = [1,1,1];
		this.bitmap[0][l][3] = [0,1,0];
		this.bitmap[0][l][4] = [0,0,0];
	}
	for(l=0;l<3;l=l+2)
		for(i=0;i<5;i++)
			this.bitmap[0][l][i] = [0,1,0];
	this.bitmap[0][0][1] = [1,1,1];
	this.bitmap[0][2][3] = [1,1,1];
	for(l=0;l<3;l=l+2)
		for(i=0;i<5;i=i+2)
			this.bitmap[1][l][i] = [0,1,0];
	for(l=1;l<4;l=l+2)
		for(i=1;i<4;i=i+2)
			this.bitmap[1][l][i] = [0,1,0];
	this.bitmap[1][0][1] = [1,0,0];
	this.bitmap[1][0][3] = [0,0,1];
	this.bitmap[1][1][0] = [1,0,0];
	this.bitmap[1][1][2] = [0,0,1];
	this.bitmap[1][1][4] = [1,0,0];
	this.bitmap[1][2][1] = [0,0,1];
	this.bitmap[1][2][3] = [1,0,0];
	this.bitmap[1][3][0] = [0,0,1];
	this.bitmap[1][3][2] = [1,0,0];
	this.bitmap[1][3][4] = [0,0,1];
	this.update = m_update_e_bullet;
	this.draw = m_draw_e_bullet;
}
function m_update_e_bullet()
{
	if(this.active == 1)
	{
		this.y = this.y + this.speed[this.type];
		this.image++;
		if(this.image > 3)
		{
			this.image = 0;
		}
		if(this.y > canvas.height)
		{
			this.active = 0;
			this.image = 0;
		}
		g_e_bullet_collision(this.type,this.place);
	}
}
function m_draw_e_bullet()
{
	if(this.active == 1)
	{
		ctx.fillStyle = "white";
		for(var i=0;i<5;i++)
		{
			for(var j=0;j<3;j++)
			{
				if(this.bitmap[this.type][this.image][i][j] == 1)
				{
					ctx.fillRect((j*4)+this.x,(i*4)+this.y,4,4);
				}
			}
		}
	}
}
function c_create_explosion()
{
//	this.x = l_x;
	this.bitmap = new Array(2);
	this.bitmap[0] = new Array(9);
	this.bitmap[1] = new Array(9);
	this.bitmap[0][0] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	this.bitmap[0][1] = [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0];
	this.bitmap[0][2] = [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0];
	this.bitmap[0][3] = [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0];
	this.bitmap[0][4] = [0,0,0,0,0,1,0,0,0,0,1,0,0,0,1];
	this.bitmap[0][5] = [1,0,0,0,1,1,0,0,1,0,0,0,0,0,0];
	this.bitmap[0][6] = [0,0,0,1,1,1,1,1,1,1,0,0,1,0,0];
	this.bitmap[0][7] = [0,0,1,1,1,1,1,1,1,1,1,0,0,0,0];
	this.bitmap[0][8] = [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0];
	this.bitmap[1][0] = [0,0,0,0,1,0,0,0,0,0,0,0,0,0,0];
	this.bitmap[1][1] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	this.bitmap[1][2] = [0,0,1,0,0,0,0,1,0,0,1,0,0,0,0];
	this.bitmap[1][3] = [0,0,0,0,1,0,1,0,0,1,0,1,0,0,0];
	this.bitmap[1][4] = [0,0,1,0,0,0,0,0,0,0,0,0,1,0,0];
	this.bitmap[1][5] = [0,0,0,0,0,1,0,1,1,0,0,0,0,0,0];
	this.bitmap[1][6] = [1,0,0,1,1,1,1,1,1,1,1,0,0,0,0];
	this.bitmap[1][7] = [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0];
	this.bitmap[1][8] = [1,1,1,1,1,1,1,1,1,1,1,1,1,0,0];
	this.image = 0;
	this.count = 0;
	this.draw = m_draw_explosion;
}
function m_draw_explosion()
{
	ctx.fillStyle = "#33ff00";
	if(this.count == 3)
	{
		if(this.image == 0)
			this.image = 1;
		else if(this.image == 1)
			this.image = 0;
		this.count = 0;
	}
	this.count++;
	for(q=0;q<9;q++)
	{
		for(t=0;t<15;t++)
		{
			if(this.bitmap[this.image][q][t] == 1)
			{
				ctx.fillRect((t*4)+g_ship.x,(q*4)+682,4,4);
			}
		}
	}
}
function c_create_e_explosion()
{
	this.x = 0;
	this.y = 0;
	this.active = 0;
	this.bitmap = new Array(10);
	this.bitmap[0] = [0,0,0,0,0,1,0,0,0,0,0,0];
	this.bitmap[1] = [0,1,0,0,0,1,0,0,1,0,0,0];
	this.bitmap[2] = [0,0,1,0,0,0,0,0,1,0,0,1];
	this.bitmap[3] = [0,0,0,1,0,0,0,1,0,0,1,0];
	this.bitmap[4] = [1,1,0,0,0,0,0,0,0,0,0,0];
	this.bitmap[5] = [0,0,0,0,0,0,0,0,0,0,1,1];
	this.bitmap[6] = [0,1,0,0,1,0,0,0,1,0,0,0];
	this.bitmap[7] = [1,0,0,1,0,0,0,0,0,1,0,0];
	this.bitmap[8] = [0,0,0,1,0,0,1,0,0,0,1,0];
	this.bitmap[9] = [0,0,0,0,0,0,1,0,0,0,0,0];
	this.count = 0;
	this.draw = m_draw_e_explosion;
}
function m_draw_e_explosion()
{
	if(this.active == 1)
	{
		ctx.fillStyle = "white";
		for(q=0;q<9;q++)
		{
			for(t=0;t<15;t++)
			{
				if(this.bitmap[q][t] == 1)
				{
					ctx.fillRect((t*4)+this.x,(q*4)+this.y-4,4,4);
				}
			}
		}
	}
	if(this.count == 10)
	{
		this.active = 0;
		this.count = 0;
	}
	this.count++;
}