const filter1 = await import('./filters/filter1/main.js')
const filter2 = await import('./filters/filter2/main.js')
const filter3 = await import('./filters/filter3/main.js')
const filter4 = await import('./filters/filter4/main.js')

const canvasEl = document.querySelector('#canvas')
const registerAsInputQueryList = []
let canvas = null
let portrait = null
let portraitFileName = null
let scaleFactor = 1
let aspectRatio = 1
let font = null
let noImgText = null
let isDrawing = false


p5.RendererGL.prototype._initContext = function() {
    this.drawingContext = this.elt.getContext('webgl2', { preserveDrawingBuffer: true })
}

const mainSketch = (p) => {
    p.preload = () => {
        font = p.loadFont('assets/font/font.otf')

        registerAsInputQueryList.push(`#filterSelect`)
        registerAsInput('#quality', (value) => { document.querySelector('#qualityDisplayValue').innerHTML = value })
    
        filter1.preload(p)
        filter2.preload(p)
        filter3.preload(p)
        filter4.preload(p)
    }

    p.setup = () => {
        const {canvasWidth, canvasHeight} = updateCanvasDimensions()
        canvas = p.createCanvas(canvasWidth, canvasHeight, p.WEBGL, canvasEl)
        
        p.pixelDensity(window.devicePixelRatio)
        p.strokeWeight(2 * scaleFactor)
        
        p.angleMode(p.DEGREES)
        
        p.windowResized()
        p.noLoop()
    
        //text
        noImgText = p.createGraphics(canvasEl.clientWidth, canvasEl.clientHeight)
        noImgText.textFont(font)
        noImgText.textAlign(p.CENTER, p.CENTER)
        noImgText.textSize(72)
        noImgText.fill(3, 7, 11)
        noImgText.noStroke()
        noImgText.text('No Image!', p.width * 0.5, p.height * 0.5)
    
        excecuteRegisterAsInputQueryList()
    
        filter1.setup(p)
        filter2.setup(p)
        filter3.setup(p)
        filter4.setup(p)
    }

    p.draw = () => {
        const profilerStart = Date.now()
    
        p.resetShader()
        
        if(portrait && portrait?.width){
            p.background(p.color(backgroundColor.value))
            p.scale(canvasEl.clientWidth / portrait.width, canvasEl.clientHeight / portrait.height)
            
            switch(filterSelect.value){
                case "filter1" : filter1.draw(p, portrait)
                break;
                case "filter2" : filter2.draw(p, portrait)
                break;
                case "filter3" : filter3.draw(p, portrait)
                break;
                case "filter4" : filter4.draw(p, portrait)
                break;
            }
            
        }else{
            p.background(128)
    
            // noStroke() //desired effect
            p.texture(noImgText)
            p.plane(canvasEl.clientWidth , canvasEl.clientHeight)
        }
    
        const renderTime = String(Date.now() - profilerStart).replace(/\B(?=(\d{3})+(?!\d))/g, "'")
        console.log(`Rendertime: ${renderTime}ms`)
        document.querySelector('#renderTime').innerHTML = renderTime
    }

    p.windowResized = () => {
        canvasEl.style.width = null
        canvasEl.removeAttribute('width')
        
        canvasEl.style.height = null
        canvasEl.removeAttribute('height')
        
        const {canvasWidth, canvasHeight} = updateCanvasDimensions()
        
        const x = (canvasEl.clientWidth - canvasWidth) / 2
        const y = (canvasEl.clientHeight - canvasHeight) / 2
        canvas.position(x, y)

        p.resizeCanvas(canvasWidth, canvasHeight)
    }

    function setUpPortrait(fileName){
        portraitFileName = fileName
    
        portrait.loadPixels()
    
        aspectRatio = portrait.width / portrait.height
    
        const {canvasWidth} = updateCanvasDimensions()
    
        scaleFactor = portrait.width / canvasWidth
    
        p.windowResized()
    }
    
    function updateCanvasDimensions(){
        if(canvasEl.clientWidth / canvasEl.clientHeight > aspectRatio) {
           return {
              canvasWidth: canvasEl.clientHeight * aspectRatio,
              canvasHeight: canvasEl.clientHeight
           }
        }
    
       return {
           canvasWidth: canvasEl.clientWidth,
           canvasHeight: canvasEl.clientWidth / aspectRatio
       }
    }
    
    //################################################################################################
    //############################################## IO ##############################################
    //################################################################################################
    
    function registerAsInput(query, callback = null, event = 'change'){
        let el = document.querySelector(query)
    
        el.addEventListener(event, () => {
            isDrawing = true

            document.querySelector('#redraw').setAttribute("disabled", true)

            setTimeout(() => {
                p.redraw()
            }, 10)
            
            setTimeout(() => {
                document.querySelector('#redraw').removeAttribute("disabled")
                isDrawing = false

                if(callback){
                    callback(el.value)
                }
            }, 50)
        })
    
        return el
    }
    
    function excecuteRegisterAsInputQueryList(){
        registerAsInputQueryList.forEach((query) => {
            registerAsInput(query)
        })
    }
    
    
    const inputImage = document.querySelector('#loadImage')
    inputImage.addEventListener('change', () => {
        const file = inputImage.files
    
        if (file && file[0]) {
            const fileReader = new FileReader()
            const preview = document.querySelector('#imageBefore')
    
            fileReader.onload = event => {
                preview.setAttribute('src', event.target.result)
    
                p.loadImage(preview.src, (image) => {
                    portrait = image
                    setUpPortrait(file[0].name)
                    // redraw() //no need to redraw since windowResized() will be called and this redraws it!
                })
            }
    
            fileReader.readAsDataURL(file[0])
        }
    
    })
    
    document.querySelector('#redraw').addEventListener('click', (event) => {
        if(isDrawing) return
    
        isDrawing = true
    
        event.target.setAttribute("disabled", true)
    
        setTimeout(() => {
            p.redraw()
        }, 10)
        
        setTimeout(() => {
            event.target.removeAttribute("disabled")
            isDrawing = false
        }, 50)
    })
    
    document.querySelector('#save').addEventListener('click', () => {
        p.save(canvas, portraitFileName)
    })

}

new window.p5(mainSketch);