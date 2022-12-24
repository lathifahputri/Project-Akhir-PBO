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
  
  if(count_onplay % 500 == 1){
      for(let a = 0; a< virus_count; a++){
          isvAttack[a] = true;
          atv_x[a] = vs[a].x;  
          atv_y[a] = vs[a].y;
          atv_pos[a] = h_pos;
      }
  }
  
  for(let a = 0; a< virus_count; a++){
      if (((vs[a].y >= hero.y-30)&&(vs[a].y <= hero.y+50))&&((vs[a].x >= hero.x)&&(vs[a].x <= hero.x+110))){
          hero.life--;
          vs.splice(a,1);
          virus_count--;
      }
  }
  for(let a = 0; a< virus_count; a++){
      if (isvAttack[a]) {
          if(atv_pos[a] == 1)
            atv_y[a] += 2;
          else if(atv_pos[a] == 2)
            atv_x[a] -= 2;
          else if(atv_pos[a] == 3)
            atv_y[a] += 2;
          else if(atv_pos[a] == 4)
            atv_x[a] += 2;
          vs[a].attack(atv, atv_x[a], atv_y[a]);
      }
      if ((atv_x > 600)||(atv_x < 0)||(atv_y > 500)||(atv_y < 0)) {
          isvAttack[a] = false;
      }
      if (((at_y >= vs[a].y-30)&&(at_y <= vs[a].y+30))&&((at_x >= vs[a].x-20)&&(at_x <= vs[a].x+20))){
          at_y = -100;
          at_x = -100;
          isAttack = false;
          hero.increaseScore();
          vs[a].life--;
          if(level.getCurrentLevel() != level.getLatestLevel()){
              level.latestLevel = level.currentLevel;
          }
          if(vs[a].life == 0){
              vs.splice(a,1);
              virus_count--;
          }
      }
      if (((atv_y[a] >= hero.y-30)&&(atv_y[a] <= hero.y+50))&&((atv_x[a] >= hero.x)&&(atv_x[a] <= hero.x+110))){
          atv_y[a] = -100;
          atv_x[a] = -100;
          isvAttack[a] = false;
          hero.life--;
      }
  }
  if (keyIsDown(87)) {
    hero.moveUp();
    h_pos = 1;
  }
  else if (keyIsDown(83)) {
    hero.moveDown();
    h_pos = 3;
  }
  else if (keyIsDown(68)) {
    hero.moveRight();
    h_pos = 2;
  }
  else if (keyIsDown(65)) {
    hero.moveLeft();
    h_pos = 4;
  }
  if (keyIsDown(32)) {
    if (isAttack == false) {
      isAttack = true;
      at_y = hero.y+10;
      at_x = hero.x+10;
      at_pos = h_pos;
    }
  }
  if (isAttack) {
    if(at_pos == 1)
      at_y -= 10;
    else if(at_pos == 2)
      at_x += 10;
    else if(at_pos == 3)
      at_y += 10;
    else if(at_pos == 4)
      at_x -= 10;
    
    hero.attack(at, at_x, at_y);
  }
  if ((at_x > 600)||(at_x < 0)||(at_y > 500)||(at_y < 0)) {
    isAttack = false;
  }
  if((hero.score > 0)&&(hero.score % 120 == 0)&&(level.getCurrentLevel() < level.maxLevel)){
    level.setLevel(level.getLatestLevel()+1);
    mp.move();
    hero.score += 10;
  }
  if(hero.life == 0)
  {
    gameover = true;
  }    
  hero.draw(h_pos);
  hero.calculateLife(lv);
  level.showLevel();    
  hero.saveScore();
  count_onplay++;
}
