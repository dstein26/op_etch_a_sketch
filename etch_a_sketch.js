console.log("Starting Etch-A-Sketch");

class EtchASketch 
{
    // Document elements
    canvas;
    resolutionSlider;
    pixelTemplate;
    rowTemplate;
    pixels;

    // Properties
    resolution;
    minPixelSize = 5;

    constructor()
    {
        
    };

    getDocumentElements()
    {
        console.log("Populating document elements");
        this.canvas = document.getElementById("canvas");
        this.resolutionSlider = document.getElementById("sliderResolution");
        this.pixelTemplate = document.createElement("div");
        this.pixelTemplate.classList.add("pixel");
        this.rowTemplate = document.createElement("div");
        this.rowTemplate.classList.add("row");

        this.pixels = new Array();

        this.setResolution();
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
    }
}

const etchASketch = new EtchASketch();

addEventListener("load", (e) => 
    {
        console.log("Content loaded.")
        etchASketch.getDocumentElements();
    }
)