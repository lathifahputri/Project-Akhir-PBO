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
