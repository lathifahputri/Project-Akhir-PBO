let gameover = false;
let p = false;
let bg, fl, psw_l, psw_r, psw_u, psw_d, hint, lv, m = [];
let mp, hero, level, vs = [];
let isAttack = false,isvAttack = [];
let atv_x = [], atv_y = [], atv_pos = [], at_x, at_y, at_pos;
let virus_count = 0;
let count_onplay = 0;
let h_pos = 2;

function preload() {
  bg = loadImage('assets/bg.png');
  fl1 = loadImage('assets/back.png');
  fl2 = loadImage('assets/back2.png');
  fl3 = loadImage('assets/back3.png');
  psw_l = loadImage('assets/psw_left.png');
  psw_r = loadImage('assets/psw_right.png');
  psw_u = loadImage('assets/psw_up.png');
  psw_d = loadImage('assets/psw_down.png');
  hint = loadImage('assets/hint.png');
  at = loadImage('assets/attck.png');
  atv = loadImage('assets/attck_m.png');
  lv = loadImage('assets/life.png');
  m[0] = loadImage('assets/m1.png');
  m[1] = loadImage('assets/m2.png');
  m[2] = loadImage('assets/m3.png');
  m[3] = loadImage('assets/m4.png');
}

function setup() {
  createCanvas(600, 500);
  mp = new Map(600,500);
  level = new Level(10);
  // melakukan set level awal ke 1
  level.setLevel(1);
  hero = new Hero(90,60);
  hero.initImg(psw_u,psw_r,psw_d,psw_l, 50, 250);
  mp.init(fl1,fl2,fl3);
}

// fungsi untuk membaca keyboard (enter) pada menu utama untuk melanjutkan game
function keyPressed(){
    if(p == false){
      if (keyCode === ENTER) {
        show_hint();
        level.setLevel(1);
        hero.life = 5;
        hero.score = 0;
        p = true;
      }
    }
    if(gameover){
      if (keyCode === ENTER) {
         gameover = false;
         p = false;
      }
    }
}

function show_hint() {
  background(255);
  textSize(100);
  textFont("Comic Sans MS");
  fill(0, 0, 0);
  text('3', 280, 120);
  hint.resize(500,200);
  image(hint, 50,150);
  setTimeout(function() {
    background(255);
    fill(0, 0, 0);
    text('2', 280, 120);
    hint.resize(500,200);
    image(hint, 50,150);
  }, 750);
  setTimeout(function() {
    background(255);
    fill(0, 0, 0);
    text('1', 280, 120);
    hint.resize(500,200);
    image(hint, 50,150);
  }, 1500);
}

function draw() {
  if(gameover){
    m[0].resize(60,60);
    m[1].resize(60,60);
    m[2].resize(60,60);
    m[3].resize(60,60);
    background(255);
    image(m[0],100,10);
    image(m[1],450,120);
    image(m[2],250,180);
    image(m[3],300,350);
    image(m[0],20,350);
    fill(200,40,40);
    textFont("Comic Sans MS");
    textSize(80);
    text("Game Over!",90,300);
    fill(250,200,100);
    textSize(30);
    text("Score : "+ hero.score,250,120);
    fill(0,0,0);
    textSize(20);
    text("enter to return to main menu..",300,470);
  } 
  else {
    if (!p) {
      bg.resize(600,500);
      image(bg, 0,0);
    } 
    else {
        setTimeout(function() {
            background(0);
            // memanggil fungsi playGame() untuk menjalankan game
            playGame();
        }, 2250);
    }
  }
}
function playGame(){
  mp.draw();
  
  if(virus_count < level.getCurrentLevel()){
      vs[virus_count] = new Monster(50,60);
      vs[virus_count].setTypeEffect(1,'corona','green');
      vs[virus_count].initImg(m[getRndInteger(0,3)], getRndInteger(400,720), getRndInteger(10,550));
      virus_count++;
      for(let a = 0; a< virus_count; a++){
        vs[a].moveRandom();
      }
  }
  for(let a = 0; a< virus_count; a++){
      vs[a].draw();
  }
  if(count_onplay % 200 == 1){
      for(let a = 0; a< virus_count; a++){
          vs[a].moveRandom();
      }
  }
  
