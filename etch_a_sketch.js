console.log("Starting Etch-A-Sketch")

// Get document elements
const canvas = document.getElementById("canvas");
const dim = [10, 10];

// Pixel template
const pixel = document.createElement("div");
pixel.classList.add("pixel");

const pixels = []; // Array to hold all the pixels placed

// Global Variables
let gColor = "black";
let gBgColor = "gainsboro";
let gMouseDown = false;

document.body.onmousedown = () => gMouseDown = true;
document.body.onmouseup = () => gMouseDown = false;

// Set up the grid
createPixels();

// Set up the array of pixels
function createPixels()
{
    for(let ii = 0; ii < dim[0]; ii++)
    {
        for(let jj = 0; jj < dim[1]; jj++)
        {
            addPixel();
        }
    }

}

function clearAllPixels()
{
    pixels.forEach((p) => clearPixel(p));
}

// Function to add a pixel element to the canvas
function addPixel()
{
    pixels.push(canvas.appendChild(pixel.cloneNode()));

    pixels.slice(-1)[0].addEventListener("mousedown", pixelEvent);
    pixels.slice(-1)[0].addEventListener("mouseover", pixelEvent);
}

function pixelEvent(e)
{
    if(e.type === 'mouseover' && !gMouseDown) return;

    setPixelColor(e.target, gColor);
}

function clearPixel(p)
{
    setPixelColor(p, gBgColor);
}

// Function to change background color of a pixel
function setPixelColor(p, color)
{
    p.style.backgroundColor = color;
}