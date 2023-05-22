//variaveis da bolinha

let xBolinha = 300;
let yBolinha = 200;
let diametro = 18;
let raio = diametro /2;
let colidiu = false;

/// variaveis velocidade bolinha
let vxBolinha = 6;
let vyBolinha = 6;


// variaveis raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 70;


// variaveis oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let vyOponente;


//variaveis placar
let meusPontos = 0;
let pontosOponente = 0;

//sons
let raquetada;
let ponto;
let trilha;


///////////////////////////////////////////////////////////////////////////////////////////////////////////

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}


function setup() { 
  createCanvas(600, 400);     //cria o preview
  
  trilha.loop();              //toca a trilha sonora
}


function draw() {
  background(0);              //define a cor do fundo
    
  
  mostraBolinha();                      
  movimentaBolinha();
  verificaColisaoBorda ();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaquete1();
  movimentaRaqueteOponente();
  //verificaColisaoRaquete();       //outro jeito de fazer, sem biblioteca 
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar ();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

function mostraBolinha () {
  circle(xBolinha,yBolinha,diametro);   //cria a bolinha
}


function movimentaBolinha(){
  xBolinha += vxBolinha;                // movimenta a bolinha
  yBolinha += vyBolinha;
}


function verificaColisaoBorda () {
  
     if (xBolinha + raio > width || xBolinha - raio < 0) {     //bolinha colide com o x
      vxBolinha = vxBolinha * -1  
    }
  
  
    if (yBolinha + raio > height || yBolinha - raio < 0) {    //bolinha colide com o y
      vyBolinha = vyBolinha* -1  
     }
}


function mostraRaquete(x,y) {
  rect (x, y, comprimentoRaquete, alturaRaquete);
}


function movimentaRaquete1 () {
  if (keyIsDown(UP_ARROW))
    yRaquete -= 5;
  
  if (keyIsDown(DOWN_ARROW))
    yRaquete += 5;
}


function colisaoRaqueteBiblioteca(x,y){
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    vxBolinha *= -1;
    raquetada.play();
  }
}


function movimentaRaqueteOponente(){
  if (keyIsDown(87))
    yRaqueteOponente -= 5;
  
  if (keyIsDown(83))
    yRaqueteOponente += 5;
}


function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(128,0,0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170,26);
  fill(color(128,0,0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}


function marcaPonto(){
    if(xBolinha > 590){
     meusPontos+= 1; 
     ponto.play();
    }
  
    if(xBolinha < 10){
      pontosOponente += 1;
      ponto.play();
    }
  
}



function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 20
    }
}
