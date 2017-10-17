// Javascript Document

var canvas            = document.getElementById('myCanvas');
var ctx               = canvas.getContext('2d');

var g_fps             =   60;
var g_gameInterval    = 1000/g_fps;

var g_mousePosX       =   0;
var g_mousePosY       =   0;
var g_key             = new Array(2);

var g_MenuBackGround  =   0;
var g_CreditsBG       =   0;
var g_PlayButton      =   0;
var g_Snake1Wins      =   0;
var g_Snake2Wins      =   0;
var g_BothLoose       =   0;
var g_PlayAgainButton =   0;

var g_Snake           = new Array(2);
var g_PowerUp         = new Array(6);

var g_gameRunning     = false;

var g_gameTimer       =   0;

var g_checkMovementX  = false;
var g_moved           = false;
var g_movedX          = false;
var g_movedY          = false;

var g_powerUpDelay    =  300;
var g_powerUpCount    =    0;

var g_scoreBarSize    =   30;
var g_maxScore        = 1000;

g_key[0] = [0,0,0,0];
g_key[1] = [0,0,0,0];