console.log("Starting Etch-A-Sketch")

// Get document elements
const canvas = document.getElementById("canvas");
const colorPicker = document.getElementById("colorPicker");
const resolutionPicker = document.getElementById("resolution");

// Pixel template
const pixel = document.createElement("div");
pixel.classList.add("pixel");
const pixels = []; // Array to hold all the pixels placed

// Global Variables
let gColor = colorPicker.value;
let gBgColor = "gainsboro";
let gMouseDown = false;
let gDim = 0;

document.body.onmousedown = () => gMouseDown = true;
document.body.onmouseup = () => gMouseDown = false;
colorPicker.oninput = (e) => { gColor = e.target.value; }

// Set up the grid
createPixels();

// Set up the array of pixels
function createPixels()
{
    const newDim = parseInt(resolutionPicker.value);

    if(newDim == gDim) return;

    // console.log("Pixels Dim: " + pixels.length + " x " + pixels.slice(-1)[0].length)

    for(let ii = gDim-1; ii >= 0; ii--)
    {
        for(let jj = gDim-1; jj >= 0; jj--)
        {
            let p = pixels[ii].pop()
            canvas.removeChild(p);
        }

        pixels.pop()
    }

    gDim = newDim;

    for(let ii = 0; ii < gDim; ii++)
    {
        pixels.push(addPixelRow());
    }

    const len = 100 / gDim;
    // Set pixel size
    pixels.forEach((ps) => ps.forEach((p) => 
    {
        
        p.style.width = "calc(" + len + "% - 2px)";
        p.style.height = "calc(" + len + "% - 2px)";
    }))
}

function clearAllPixels()
{
    pixels.forEach((p) => clearPixel(p));
}

// Function to add a pixel element to the canvas
function addPixel()
{
    const p = canvas.appendChild(pixel.cloneNode());

    p.addEventListener("mousedown", pixelEvent);
    p.addEventListener("mouseover", pixelEvent);

    return p
}

function addPixelRow()
{
    let row = [];
    for(let ii = 0; ii < gDim; ii++)
    {
        row.push(addPixel());
    }

    return row;
}

function pixelEvent(e)
{
    // Implementation from https://github.com/michalosman/etch-a-sketch
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