console.log("Starting Etch-A-Sketch");

let gColor = "#000000";

class EtchASketch 
{
    // Document elements
    canvas;
    resolutionSlider;
    pixelTemplate;
    rowTemplate;
    pixels;
    colorPicker;

    // Properties
    resolution;
    minPixelSize = 5;
    sliderThrottle;

    constructor()
    {
        
    };

    initEtchASketch()
    {
        this.getDocumentElements();
        
        this.canvas.addEventListener("click", mouseEvent);
        this.canvas.addEventListener("mouseover", mouseEvent);

        this.sliderThrottle = new Throttle(() => { this.resolutionEvent(); }, 1000);
        this.resolutionSlider.addEventListener("input", () => { this.sliderThrottle.throttle(); });

        this.colorPicker.addEventListener("input", updateColor);
        gColor = this.colorPicker.value;

        this.pixelTemplate = document.createElement("div");
        this.pixelTemplate.classList.add("pixel");

        this.rowTemplate = document.createElement("div");
        this.rowTemplate.classList.add("row");

        this.pixels = new Array();

        this.setResolution();
    }

    getDocumentElements()
    {
        console.log("Populating document elements");
        this.canvas = document.getElementById("canvas");
        this.resolutionSlider = document.getElementById("sliderResolution");
        this.colorPicker = document.getElementById("colorPicker");
    }

    setResolution()
    {
        this.resolution = this.resolutionSlider.value;

        console.log(`Resolution set: ${this.resolution} x ${this.resolution}`);

        const minSize = Math.min(this.canvas.clientHeight, this.canvas.clientWidth);
        const pixelSize = Math.floor(minSize / this.resolution);

        if (pixelSize < this.minPixelSize)
        {
            console.error("Resolution selected is too large");
            return;
        }
        else
        {
            for(let ii = 0; ii < this.pixels.length; ii++)
            {
                const row = this.pixels.pop();
                row.remove();
            }

            const pixelSize = [Math.floor(this.canvas.clientHeight / this.resolution), 
                Math.floor(this.canvas.clientWidth / this.resolution)];
            this.rowTemplate.replaceChildren();

            this.rowTemplate.style = `grid-template-columns: repeat(${this.resolution}, 1fr)`;
            this.canvas.style = `grid-template-rows: repeate(${this.resolution}, 1fr)`

            for(let ii = 0; ii < this.resolution; ii++)
            {
                this.rowTemplate.appendChild(this.pixelTemplate.cloneNode(true));
            }

            for(let ii = 0; ii < this.resolution; ii++)
            {
                this.pixels[ii] = this.canvas.appendChild(this.rowTemplate.cloneNode(true));
            }
        }
        console.log("Done setting grid");
    }

    resolutionEvent()
    {
        this.resolution = this.resolutionSlider.value;
        console.log(`Resolution set to ${this.resolution} x ${this.resolution}`);
    }
}

class MouseHandler
{
    state = false;

    constructor()
    {
        document.body.addEventListener("mousedown", () => { this.setMouseState(true); });
        document.body.addEventListener("mouseup",   () => { this.setMouseState(false); });
    }

    setMouseState(state)
    {
        this.state = state;
        console.log("Mouse state changed");
    }
}

class Throttle
{
    callback;
    delay;
    state;

    constructor(callback, delay)
    {
        this.callback = callback;
        this.delay = delay;
        this.state = false;
    }

    throttle()
    {
        if (this.state) return;

        this.state = true;
        setTimeout(() => { this.state = false; this.callback();}, this.delay);
    }
}

const etchASketch = new EtchASketch();
const mouseHandler = new MouseHandler();

addEventListener("load", (e) => 
    {
        console.log("Content loaded.")
        etchASketch.getDocumentElements();
    }
)

function mouseEvent(e)
{
    // Implementation from https://github.com/michalosman/etch-a-sketch
    if (e.type === 'mouseover' && !mouseHandler.state) return;

    e.target.style.backgroundColor = gColor;
    
}

function updateColor(e)
{
    gColor = e.target.value;
    console.log(`Color changed to ${gColor}`)
}