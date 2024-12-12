let morseElements = [];
let speed = 2;
let elementCount = 90; // Number of Morse elements
let isFalling = false;

function setup() {
    let canvasElement = createCanvas(windowWidth, 700);
    const mainHeader = document.getElementById("mainHeader");
    mainHeader.prepend(canvasElement.elt);
    resizeCanvas(mainHeader.offsetWidth, 700); // Set initial canvas size to match the header width

    // Create Morse elements
    for (let i = 0; i < elementCount; i++) {
        let type = random([".", "-", "/"]);
        let x = random(width);
        let y = random(height);
        morseElements.push(new MorseElement(x, y, type));
    }

    // Restart button setup
    const restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", () => {
        isFalling = false;
        for (let element of morseElements) {
            element.reset();
        }
        restartButton.style.display = "none";
    });
}

function draw() {
    // Set the background color
    background('#333');

    // Update and display Morse elements
    for (let element of morseElements) {
        element.update();
        element.display();
    }

    // Adjust text size dynamically based on screen width
    let textSizeValue;
    if (windowWidth > 1280) { // Laptop and larger
        textSizeValue = 150;
    } else if (windowWidth > 768) { // Tablet
        textSizeValue = 100;
    } else { // Mobile
        textSizeValue = 70;
    }

    // Draw centered text
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(textSizeValue);
    textFont('Limelight');
    text("MORSE CODE", width / 2, height / 2);

    // Position restart button dynamically
    const restartButton = document.getElementById("restartButton");
    if (restartButton) {
        restartButton.style.position = "absolute";
        restartButton.style.top = `${height / 2 + textSizeValue}px`; // Place below text
        restartButton.style.left = `${width / 2}px`;
        restartButton.style.transform = "translateX(-50%)";
        restartButton.style.display = "block";
    }
}

// Adjust canvas and element positions when the window is resized
function windowResized() {
    resizeCanvas(windowWidth, 700); // Update canvas size
    for (let element of morseElements) {
        element.reset(); // Reset Morse element positions
    }
}

function mousePressed() {
    isFalling = true;
    const restartButton = document.getElementById("restartButton");
    restartButton.style.display = "block";
}

// Morse element class
class MorseElement {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.offset = random(100);
        this.fallingSpeed = 0;
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

            // Wrap around screen edges
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
