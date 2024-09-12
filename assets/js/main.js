const glassBox = document.getElementById('glassBox');

const blurRange = document.querySelectorAll('blurRange');
const blurValue = document.getElementById('blurValue');

const opacityInput = document.getElementById('opacityInput');
const opacityValue = document.getElementById('opacityValue');

const borderRadiusRange = document.getElementById('borderRadiusRange');
const borderRadiusValue = document.getElementById('borderRadiusValue');

// Update blur effect
blurRange.addEventListener('input', function() {
    const blurAmount = `${blurRange.value}px`;
    glassBox.style.backdropFilter = `blur(${blurAmount})`;
    blurValue.textContent = blurAmount;
});

// Update opacity effect
opacityInput.addEventListener('input', function() {
    const opacityAmount = opacityInput.value;
    glassBox.style.background = `rgba(255, 255, 255, ${opacityAmount})`;
    opacityValue.textContent = opacityAmount;
});

// Update border-radius
borderRadiusRange.addEventListener('input', function() {
    const borderRadiusAmount = `${borderRadiusRange.value}px`;
    glassBox.style.borderRadius = borderRadiusAmount;
    borderRadiusValue.textContent = borderRadiusAmount;
});




const canvas = document.getElementById('grainCanvas');
const ctx = canvas.getContext('2d');

const width = glassBox.clientWidth;
const height = glassBox.clientHeight;
canvas.width = width;
canvas.height = height;

const densityRange = document.getElementById('densityRange');
const densityValue = document.getElementById('densityValue');
const opacityRange = document.getElementById('opacityRange');
const opacityDisplay = document.getElementById('opacityDisplay');
const colorPicker = document.getElementById('colorPicker');

function generateGrain(grainDensity, noiseColor, opacity) {
    const imageData = ctx.createImageData(width, height);
    const pixels = imageData.data;

    const [r, g, b] = hexToRgb(noiseColor);

    for (let i = 0; i < pixels.length; i += 4) {
        const brightness = Math.random() < grainDensity ? 1 : 0;
        pixels[i] = r * brightness;     // Red
        pixels[i + 1] = g * brightness; // Green
        pixels[i + 2] = b * brightness; // Blue
        pixels[i + 3] = brightness ? Math.floor(opacity * 255) : 0; // Alpha
    }

    ctx.putImageData(imageData, 0, 0);
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

function updateCanvas() {
    const grainDensity = parseFloat(densityRange.value);
    const noiseColor = colorPicker.value;
    const opacity = parseFloat(opacityRange.value);
    densityValue.textContent = grainDensity;
    opacityDisplay.textContent = opacity;
    generateGrain(grainDensity, noiseColor, opacity);
}

densityRange.addEventListener('input', updateCanvas);
opacityRange.addEventListener('input', updateCanvas);
colorPicker.addEventListener('input', updateCanvas);

// Initial noise generation
updateCanvas();


// circle
let circle = document.getElementById('circle');
let glassBack = document.getElementById('glass-bg');
let drag = false;

circle.addEventListener('mousedown', function() {
    drag = true;
});

// Attach mouseup event to the document to stop dragging
document.addEventListener('mouseup', function() {
    drag = false;
});

document.addEventListener('mousemove', function(dets) {
    if (drag) {
        const newX = dets.clientX - glassBack.getBoundingClientRect().x;
        const newY = dets.clientY - glassBack.getBoundingClientRect().y;

        // Check boundaries to ensure the circle stays within the glassBack element
        const maxX = glassBack.clientWidth - circle.clientWidth;
        const maxY = glassBack.clientHeight - circle.clientHeight;

        if (newX >= 0 && newX <= maxX) {
            circle.style.left = `${newX}px`;
        }
        if (newY >= 0 && newY <= maxY) {
            circle.style.top = `${newY}px`;
        }
    }
});
