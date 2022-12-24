function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class Level {
    currentLevel;
    latestLevel;
    maxLevel;
    constructor(mx_lv) {
        this.maxLevel = mx_lv;
    }
    setLevel(lv) {
        this.currentLevel = lv;
    }
    getCurrentLevel() {
        return this.currentLevel;
    }
    getLatestLevel() {
        return this.latestLevel;
    }
    showLevel(){    
        fill(255,255,255);
        textFont("Comic Sans MS");
        textSize(30);
        text("Level-"+this.currentLevel,460,35);
    }
}

class Map {
    width;
    height;
    bg1;
    bg2;
    bg3;
    mp_pos;
    x = 0;
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.mp_pos = 1;
    }
    init(bg1, bg2, bg3) {
        this.bg1 = bg1;
        this.bg2 = bg2;
        this.bg3 = bg3;
        this.bg1.resize(this.width, this.height);
        this.bg2.resize(this.width, this.height);
        this.bg3.resize(this.width, this.height);
    }
    move() {
      this.mp_pos++;
      if(this.mp_pos > 3)
        this.mp_pos = 1;
    }
    draw(){
      if(this.mp_pos == 1)
        image(this.bg1,0,0);
      else if(this.mp_pos == 2)
        image(this.bg2,0,0);
      else if(this.mp_pos == 3)
        image(this.bg3,0,0);
    }
}

class Entity {
    width;
    height;
    x;
    y;
    img;
    constructor(w, h) {
        this.width = w;
        this.height = h;
    }
    attack() {}
    moveRight() {
        if (this.x < 510) 
            this.x += 3;
    }
    moveLeft() {
        if (this.x > 0) 
            this.x -= 3;
    }
    moveDown() {
        if (this.y < 410) 
            this.y += 3;
    }
    moveUp() {
        if (this.y > 0) 
            this.y -= 3;
    }
    draw() {
        image(this.img, this.x, this.y);
    }
}

class Monster extends Entity {
    life;
    color;
    effect;
    type;
    rand_x;
    rand_y;
    atck;
    constructor(w, h) {
        super(w, h);
        this.life = 2;
    }
    initImg(i, x, y) {
        this.img = i;
        this.img.resize(this.width, this.height);
        this.x = x;
        this.y = y;
    }
    setTypeEffect(type, effect, color) {
        this.color = color;
        this.type = type;
        this.effect = effect;
    }
    moveRandom() {
        this.rand_x = getRndInteger(10,550);
        this.rand_y = getRndInteger(10,450);
    }
    draw() {
        if(this.x > this.rand_x)
            this.x--;
        else if(this.x < this.rand_x)
            this.x++;
        if(this.y > this.rand_y)
            this.y--;
        else if(this.y < this.rand_y)
            this.y++;
        image(this.img, this.x, this.y);
    }

    attack(atck, x, y) {
        this.atck = atck;
        this.atck.resize(40, 40);
        image(this.atck, x, y);
    }
  
    saveScore() { 
        fill(255,255,255);
        textFont("Comic Sans MS");
        textSize(30);
        text("Score : "+this.score,20,35);
    }
}

class Hero extends Entity {
    life;
    score;
    fire;
    img_u;
    img_r;
    img_d;
    img_l;
    atck;
    constructor(w, h) {
        super(w, h);
        this.life = 5;
        this.score = 0;
    }
    initImg(img_u, img_r, img_d, img_l, x, y) {
        this.img_u = img_u;
        this.img_r = img_r;
        this.img_d = img_d;
        this.img_l = img_l;
        this.img_l.resize(this.width, this.height);
        this.img_r.resize(this.width, this.height);
        this.img_u.resize(this.height, this.width);
        this.img_d.resize(this.height, this.width);
        this.x = x;
        this.y = y;
    }

    attack(atck, x, y) {
        this.atck = atck;
        this.atck.resize(40, 40);
        image(this.atck, x, y);
    }
    increaseScore() {
        this.score += 10;
    }

    calculateLife(lv_img) {
        lv_img.resize(30,30);
        for(let x=0;x<this.life;x++)
            image(lv_img,10 + x*35,10)
    }
 
    saveScore() {
        fill(220,220,0);
        textFont("Comic Sans MS");
        textSize(40);
        text(this.score,260,40);
    }
    draw(pos) {
      if(pos == 1)
        image(this.img_u, this.x, this.y);
      else if(pos == 2)
        image(this.img_r, this.x, this.y);
      else if(pos == 3)
        image(this.img_d, this.x, this.y);
      else if(pos == 4)
        image(this.img_l, this.x, this.y);
    }
}
