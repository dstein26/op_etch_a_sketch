console.log("Starting Etch-A-Sketch");

let gColor = "#000000";

class EtchASketch 
{
    // Document elements
    canvas;
    resolutionSlider;
    pixelTemplate;
    rowTemplate;
    // pixels;
    colorPicker;
    showGridCB;

    // Properties
    resolution;
    minPixelSize = 5;
    sliderThrottle;
    showGrid;

    constructor()
    {
        
    };

    initEtchASketch()
    {
        this.getDocumentElements();
        
        this.canvas.addEventListener("click", mouseEvent);
        this.canvas.addEventListener("mouseover", mouseEvent);

        this.showGridCB.addEventListener("input", ()=>{ this.showGrid = this.showGridCB.checked; });
        this.showGrid = this.showGridCB.checked;

        this.sliderThrottle = new Throttle(() => { this.setResolution(); }, 250);
        this.resolutionSlider.addEventListener("input", () => { this.sliderThrottle.throttle(); });

        this.colorPicker.addEventListener("input", updateColor);
        gColor = this.colorPicker.value;

        this.pixelTemplate = document.createElement("div");
        this.pixelTemplate.classList.add("pixel");

        this.rowTemplate = document.createElement("div");
        this.rowTemplate.classList.add("row");

        // this.pixels = new Array();
        this.setResolution();
    }

    getDocumentElements()
    {
        console.log("Populating document elements");
        this.canvas = document.getElementById("canvas");
        this.resolutionSlider = document.getElementById("sliderResolution");
        this.colorPicker = document.getElementById("colorPicker");
        this.showGridCB = document.getElementById("showGrid");
    }

    setResolution()
    {
        this.getUserResolution();

        
        if(this.checkPixelMinSize())
        {
            /*
            for(let ii = 0; ii < this.pixels.length; ii++)
            {
                const row = this.pixels.pop();
                row.remove();
            }
            */
           // Clear Canvas
           this.canvas.replaceChildren();
           this.rowTemplate.replaceChildren();

           // Calculate pixel div size
            const pixelSize = [Math.floor(this.canvas.clientHeight / this.resolution), 
                Math.floor(this.canvas.clientWidth / this.resolution)];
            
            this.rowTemplate.style = `grid-template-columns: repeat(${this.resolution}, 1fr)`;
            this.canvas.style = `grid-template-rows: repeate(${this.resolution}, 1fr)`

            if (this.showGrid)
            {
                this.rowTemplate.style.gap = '1px'
                this.canvas.style.gap = '1px';
            }

            for(let ii = 0; ii < this.resolution; ii++)
            {
                this.rowTemplate.appendChild(this.pixelTemplate.cloneNode(true));
            }

            for(let ii = 0; ii < this.resolution; ii++)
            {
                // this.pixels[ii] = 
                this.canvas.appendChild(this.rowTemplate.cloneNode(true));
            }
        }
        console.log("Done setting grid");
    }

    getUserResolution()
    {
        this.resolution = this.resolutionSlider.value;
        console.log(`Resolution set: ${this.resolution} x ${this.resolution}`);
    }

    checkPixelMinSize()
    {
        const minSize = Math.min(this.canvas.clientHeight, this.canvas.clientWidth);
        const pixelSize = Math.floor(minSize / this.resolution);

        return (pixelSize >= this.minPixelSize);
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
        // console.log("Mouse state changed");
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
        etchASketch.initEtchASketch();
    }
)

function mouseEvent(e)
{
    // Implementation from https://github.com/michalosman/etch-a-sketch
    if (e.type === 'mouseover' && !mouseHandler.state) return;
    if (!e.target.classList.contains("pixel")) return;
    e.target.style.backgroundColor = gColor;
    
}

function updateColor(e)
{
    gColor = e.target.value;
    console.log(`Color changed to ${gColor}`)
}