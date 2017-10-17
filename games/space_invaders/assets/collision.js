function g_bullet_collision(m)
{
	var l_x,l_y,l_a,l_length,l_x1,l_b = 0;
	l_b = g_block_collision(0,g_bullet[m].x,g_bullet[m].y);
	if(l_b == 1)
		g_bullet[m].active = 0;
	if(l_b != 1)
	{
		l_x=g_enemies.x;
		l_y=g_enemies.y;
		for(var k=0;k<5;k++)
		{
			for(var l=0;l<11;l++)
			{
				l_a = g_enemies.bitmap[k][l];
				if(l_a != 0)
				{
					l_x1 = l_x + ((l_a-1)*4);
					l_length = g_enemies.e_bitmap[l_a][0][0].length*4;
					if((g_bullet[m].x-l_x1 > -4)&&(g_bullet[m].x-l_x1 < l_length))
					{
						if((g_bullet[m].y-l_y > -20)&&(g_bullet[m].y-l_y < 32))
						{
							l_b = 1;
							g_bullet[m].active = 0;
							g_enemies.bitmap[k][l] = 0;
							for(i=0;i<10;i++)
							{
								if(g_e_explosion[i].active == 0)
								{
									g_e_explosion[i].active = 1;
									g_e_explosion[i].x = l_x1;
									g_e_explosion[i].y = l_y;
								}
							}
							if((l_a == 1)||(l_a == 2))
								g_score.value = g_score.value + (l_a*10);
							else
								g_score.value = g_score.value + 40;
							l = 11;
							k = 5;
						}
					}
				}
				l_x = l_x + 60;
			}
			l_x = g_enemies.x;
			l_y = l_y + 60;
		}
	}
	if(l_b != 1)
	{
		if(g_redEnemy.alive == 1)
		{
			if((g_bullet[m].y > 53)&&(g_bullet[m].y < 81))
			{
				if((g_bullet[m].x > (g_redEnemy.x-4))&&(g_bullet[m].x < (g_redEnemy.x+64)))
				{
					l_x = g_redEnemy.x;
					g_redEnemy.alive = 2;
					g_bullet[m].active = 0;
					g_redEnemy.value = (Math.floor(Math.random()*3)+1);
					g_score.value = g_score.value + (g_redEnemy.value*100);
				}
			}
		}
	}
}
function g_e_bullet_collision(g,m)
{
	var l_b = 0;
	l_b = g_block_collision(1,g_e_bullet[g][m].x,g_e_bullet[g][m].y);
	if(l_b == 1)
		g_e_bullet[g][m].active = 0;
	if(l_b != 1)
	{
		if((g_e_bullet[g][m].y > 666)&&(g_e_bullet[g][m].y < 718))
		{
			if((g_e_bullet[g][m].x > (g_ship.x-12))&&(g_e_bullet[g][m].x < (g_ship.x+60)))
			{
				g_e_bullet[g][m].active = 0;
				g_lives.value--;
				g_ship.alive = 0;
				if(g_lives.value<0)
				{
                    g_GameOver();
				}
			}
		}
	}
}
function g_block_collision(l_t,l_xB,l_yB)
{
	var l_x,l_y=557,l_a,l_life,l_w,l_b=0;
	if(l_t == 0)
	{
		l_w = 4;
	}
	else if(l_t == 1)
	{
		l_w = 12;
		l_xB = l_xB + 4;
		l_yB = l_yB + 20;
	}
	if((l_yB > 557)&&(l_yB < 649))
	{
		for(var n=0;n<4;n++)
		{
			l_x = g_block[n].x;
			if((l_xB > (l_x-l_w))&&(l_xB < (l_x+96)))
			{
				for(k=0;k<3;k++)
				{
					for(l=0;l<4;l++)
					{
						l_life = g_block[n].bitmap3[k][l];
						if(l_life != 0)
						{
							if((l_xB > (l_x-l_w))&&(l_xB < (l_x+24)))
							{
								if((l_yB > l_y)&&(l_yB < (l_y+24)))
								{
									l_b = 1;
									g_block[n].bitmap3[k][l]--;
									if(l_life > 1)
										g_degrade_block(n,k,l);
									if(l_life == 1)
										g_block[n].bitmap1[k][l]=0;
									l=4;
									k=3;
								}
							}
						}
						l_x = l_x + 24;
					}
					l_x = g_block[n].x;
					l_y = l_y + 24;
				}
				n++;
			}
		}
	}
	return l_b;
}
function g_degrade_block(n,k,l)
{
	var l_b,l_c;
	var l_a = g_block[n].bitmap1[k][l];
	for(var i=0; i<6; i++)
	{
		for(var j=0; j<6; j++)  
		{
			if(g_block[n].bitmap2[l_a][i][j] == 1)
			{
				l_b = Math.floor(Math.random()*4);
				if((l_b >= 0)&&(l_b <= 2))
					l_c = 1;
				else if(l_b == 3)
					l_c = 0;
				g_block[n].bitmap2[l_a][i][j] = l_c;
			}
		}
	}
}