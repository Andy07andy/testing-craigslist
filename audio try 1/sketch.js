let morsePattern = "-- --- .-. ... . / -.-. --- -.. ."; // Morse code for "MORSE CODE"
let morseElements = [];
let speed = 2;
let elementCount = 90; // 元素数量
let isFalling = false;

function setup() {
    let canvasElement = createCanvas(windowWidth, 700);
    mainHeader.prepend(canvasElement.elt);
    resizeCanvas(document.getElementById('mainHeader').offsetWidth, 700); 

    for (let i = 0; i < elementCount; i++) {
        let type = random([".", "-", "/"]);
        let x = random(width);
        let y = random(height);
        morseElements.push(new MorseElement(x, y, type));
    }


    const restartButton = document.getElementById("restartButton");
    restartButton.style.top = `${height / 2 + 80}px`; // Place it 80px below the title
    restartButton.style.left = `${width / 2}px`;
    restartButton.style.transform = 'translateX(-50%)';
    restartButton.addEventListener("click", () => {
        isFalling = false;
        for (let element of morseElements) {
            element.reset();
        }
    });
}

function draw() {
    background('#333'); 
    
    for (let element of morseElements) {
        element.update();
        element.display();
    }


    textAlign(CENTER, CENTER);
    fill(255);
    textSize(60);
    text("MORSE CODE", width / 2, height / 2);
}

function mousePressed() {
    isFalling = true;
}

class MorseElement {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.offset = random(100);
        this.fallingSpeed = 0;
        this.originalX = x;
        this.originalY = y;
    }

    update() {
        if (isFalling) {
            this.fallingSpeed += 0.1;
            this.y += this.fallingSpeed;


            if (this.y > height - 50) {
                this.y = height - 50;
                this.fallingSpeed = 0;
            }
        } else {

            this.x += sin(frameCount * 0.02 + this.offset) * speed * 0.5;
            this.y += cos(frameCount * 0.02 + this.offset) * speed * 0.5;

            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }
    }

    display() {
        fill(255);
        noStroke();


        if (this.type === ".") {
            ellipse(this.x, this.y, 8, 8);
        } else if (this.type === "-") {
            rect(this.x - 10, this.y - 3, 20, 6);
        } else if (this.type === "/") {
            push();
            translate(this.x, this.y);
            rotate(PI / 4);
            rect(-5, -15, 10, 30);
            pop();
        }
    }

    reset() {

        this.x = random(width);
        this.y = random(height);
        this.fallingSpeed = 0;
    }
}

