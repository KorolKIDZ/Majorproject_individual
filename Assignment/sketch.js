class ResourceLoader {
  constructor() {
    this.boatImage = null;
    this.group1Image = null;
    this.birdsImage = null;
    this.rainImage = null;
    this.snowImage = null;
  }

  preload() {
    this.boatImage = loadImage('assets/transparent_boat.png');
    this.group1Image = loadImage('assets/Group 1.png');
    this.birdsImage = loadImage('assets/birds.png');
    this.rainImage = this.createRainImage(); // 生成雨的图片
    this.snowImage = this.createSnowImage(); // 生成雪的图片
  }

  createRainImage() {
    let pg = createGraphics(windowWidth, windowHeight);
    pg.stroke(255);
    for (let i = 0; i < 200; i++) {
      let x = random(windowWidth);
      let y = random(windowHeight);
      let len = random(10, 20);
      pg.line(x, y, x, y + len);
    }
    return pg;
  }

  createSnowImage() {
    let pg = createGraphics(windowWidth, windowHeight);
    pg.fill(255);
    pg.noStroke();
    for (let i = 0; i < 300; i++) {
      let x = random(windowWidth);
      let y = random(windowHeight);
      let size = random(3, 7);
      pg.ellipse(x, y, size);
    }
    return pg;
  }
}

class CanvasManager {
  setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
  }

  windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    redraw();
  }
}

class BackgroundDrawer {
  constructor(season) {
    this.season = season;
  }

  draw() {
    this.drawGradientBackground();
    this.drawLayeredMountains();
  }

  drawGradientBackground() {
    let color1, color2;
    switch (this.season) {
      case 'spring':
        color1 = color(135, 206, 235); // Light blue
        color2 = color(255, 182, 193); // Light pink
        break;
      case 'summer':
        color1 = color(0, 191, 255); // Deep sky blue
        color2 = color(255, 255, 0); // Yellow
        break;
      case 'autumn':
        color1 = color(255, 140, 0); // Dark orange
        color2 = color(255, 69, 0); // Red orange
        break;
      case 'winter':
        color1 = color(0, 191, 255); // Deep sky blue
        color2 = color(255); // White
        break;
      default:
        color1 = color(135, 206, 235); // Default color to avoid undefined
        color2 = color(255, 182, 193); // Default color to avoid undefined
    }

    for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let c = lerpColor(color1, color2, inter);
      stroke(c);
      line(0, y, width, y);
    }
  }

  drawLayeredMountains() {
    let layers = 5;
    let maxHeight = height / 6;
    let noiseScale = 0.01;
    let colors;
    switch (this.season) {
      case 'spring':
        colors = [
          color(50, 205, 50, 150),
          color(60, 179, 113, 130),
          color(34, 139, 34, 110),
          color(46, 139, 87, 90),
          color(0, 128, 0, 70)
        ];
        break;
      case 'summer':
        colors = [
          color(0, 100, 0, 150),
          color(34, 139, 34, 130),
          color(60, 179, 113, 110),
          color(46, 139, 87, 90),
          color(50, 205, 50, 70)
        ];
        break;
      case 'autumn':
        colors = [
          color(139, 69, 19, 150),
          color(160, 82, 45, 130),
          color(210, 105, 30, 110),
          color(205, 92, 92, 90),
          color(244, 164, 96, 70)
        ];
        break;
      case 'winter':
        colors = [
          color(176, 224, 230, 150),
          color(175, 238, 238, 130),
          color(173, 216, 230, 110),
          color(135, 206, 235, 90),
          color(0, 191, 255, 70)
        ];
        break;
      default:
        colors = [
          color(50, 205, 50, 150),
          color(60, 179, 113, 130),
          color(34, 139, 34, 110),
          color(46, 139, 87, 90),
          color(0, 128, 0, 70)
        ];
    }

    for (let i = 0; i < layers; i++) {
      let baseHeight = height - (i * maxHeight * 0.5 + 120);
      fill(colors[i]);
      noStroke();
      beginShape();
      vertex(0, height);
      for (let x = 0; x <= width; x += 20) {
        let y = baseHeight - noise(x * noiseScale, i * 100) * maxHeight;
        vertex(x, y);
      }
      vertex(width, height);
      endShape(CLOSE);
    }
  }
}

class WaterSurface {
  draw() {
    fill(180, 200, 200, 180);
    rect(0, height - 100, width, 100);
  }
}

class Boat {
  constructor(boatImage, season) {
    this.boatImage = boatImage;
    this.boatScale = 0.7;
    this.season = season;
  }

  draw() {
    let boatX;
    switch (this.season) {
      case 'spring':
        boatX = 100;
        break;
      case 'summer':
        boatX = width / 2 - (this.boatImage.width * this.boatScale) / 2;
        break;
      case 'autumn':
        boatX = width - this.boatImage.width * this.boatScale - 100;
        break;
      case 'winter':
        boatX = width - this.boatImage.width * this.boatScale - 100;
        break;
      default:
        boatX = 100;
    }

    let boatY = height - this.boatImage.height * this.boatScale + 50;
    tint(150, 150, 150, 150);
    image(this.boatImage, boatX, boatY, this.boatImage.width * this.boatScale, this.boatImage.height * this.boatScale);
    noTint();
  }
}

class Overlay {
  constructor(group1Image, birdsImage, season) {
    this.group1Image = group1Image;
    this.birdsImage = birdsImage;
    this.season = season;
  }

  draw() {
    if (this.season === 'winter') return; // 冬天时不显示鸽子群和单个鸽子

    let birdX;
    let singleBirdX;
    let singleBirdY = 150; // 调整单个鸽子的垂直位置，使其与鸽子群区分开
    let singleBirdScale = 1.5; // 放大单个鸽子
    switch (this.season) {
      case 'spring':
        birdX = 0;
        singleBirdX = 0;
        break;
      case 'summer':
        birdX = width / 2 - 150;
        singleBirdX = width / 2 - 150;
        break;
      case 'autumn':
        birdX = width - 300 - 100;
        singleBirdX = width - 300 - 100;
        break;
      default:
        birdX = 0;
        singleBirdX = 0;
    }

    image(this.group1Image, singleBirdX, singleBirdY, this.group1Image.width * singleBirdScale, this.group1Image.height * singleBirdScale); // 添加放大后的单个鸽子的绘制
    image(this.birdsImage, birdX, 0, 300, 150);
  }
}

function getNextSeason() {
  const seasons = ['spring', 'summer', 'autumn', 'winter'];
  let currentSeason = localStorage.getItem('currentSeason');
  if (!currentSeason) {
    localStorage.setItem('currentSeason', 'spring');
    return 'spring';
  }
  let nextIndex = (seasons.indexOf(currentSeason) + 1) % seasons.length;
  let nextSeason = seasons[nextIndex];
  localStorage.setItem('currentSeason', nextSeason);
  return nextSeason;
}

let resourceLoader = new ResourceLoader();
let canvasManager = new CanvasManager();
let season = getNextSeason();
let backgroundDrawer = new BackgroundDrawer(season);
let waterSurface = new WaterSurface();
let boat;
let overlay;

function preload() {
  resourceLoader.preload();
}

function setup() {
  canvasManager.setup();
  boat = new Boat(resourceLoader.boatImage, season);
  overlay = new Overlay(resourceLoader.group1Image, resourceLoader.birdsImage, season); // 使用 group1Image 作为单个鸽子的图像
}

function draw() {
  backgroundDrawer.draw();
  waterSurface.draw();
  boat.draw();
  overlay.draw();
  if (season === 'autumn') {
    image(resourceLoader.rainImage, 0, 0); // 绘制雨
  }
  if (season === 'winter') {
    image(resourceLoader.snowImage, 0, 0); // 绘制雪
  }
}

function windowResized() {
  canvasManager.windowResized();
}
