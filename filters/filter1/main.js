let sshader = null
const symbolsList = []
let colors = null
let colorsTwo = null

function preload(p5){
    loadMarker(p5, 'arrow-15.png')
    loadMarker(p5, 'circle-40.png')
    loadMarker(p5, 'circle-46.png')
    loadMarker(p5, 'cross-01.png')
    loadMarker(p5, 'cross-03.png')
    loadMarker(p5, 'scribble-02.png')
    loadMarker(p5, 'scribble-05.png')
    loadMarker(p5, 'scribble-84.png')
    loadMarker(p5, 'star-02.png')
    loadMarker(p5, 'no-symbols(empty).svg')

    sshader = p5.loadShader('filters/filter1/shader.vert', 'filters/filter1/shader.frag')

    colors = [p5.color('#ffffff'), p5.color('#FFFADB'), p5.color('#FFF3A5'), p5.color('#FCE760'), p5.color('#FCDF21'), p5.color('#AD9919'), p5.color('#4F4F4F'), p5.color('#323232')]
    colorsTwo = [p5.color('#FCDF21'), p5.color('#ffffff')]
}

function loadMarker(p5, fullFileName){
    const fileName = fullFileName.replace(/\.[^/.]+$/, '')

    symbolsList.push({ name: fileName, src: p5.loadImage(`assets/symbols/${fullFileName}`) })
}

function setup(p5){
    symbolsList.forEach((sy) => {
        sy.src = optimizeImage(p5, sy.src)
    })
}

function optimizeImage(p5, image){
    const layer = p5.createGraphics(300, 300)

    layer.image(image, 0, 0, 300, 300)
    const newImage = layer.get()
    layer.remove()

    return newImage
}

function draw(p5, portrait){
    p5.shader(sshader)

    const symbols1 = filterSymbols([1,2,3,4,5,6,7])
            
    if(symbols1.length > 0){
        runPixelsEqual(p5, Number(quality.value), symbols1, colors, portrait)
    }
    
    const symbols2 = filterSymbols([0,3,6,8,9])

    if(symbols2.length > 0){
        runPixelsScaled(p5, 50, symbols2, colorsTwo, portrait)
    }
}


function filterSymbols(listIndex){
    const values = []

    listIndex.forEach(function(index) {
        const symbol = symbolsList[index]
        values.push(symbol.src)
    });

    return values
}

function runPixelsEqual(p5, stepSize, pixelSet, colorSet, portrait){
    for (let y = 0; y < portrait.height; y += stepSize){
        for (let x = 0; x < portrait.width; x += stepSize){
            const i = y * portrait.width + x
            let darkness = (255 - portrait.pixels[i * 4]) / 255

            if(darkness <= 0.1){
                darkness = 0.1
            }

            let radius
            if(p5.random(0, 6) > 5){
                radius = (stepSize / darkness) * p5.random(0.1, 0.2)
            }else{
                radius = (stepSize / darkness) * p5.random(0.1, 0.8)
            }

            const activeColor = p5.int(p5.map(darkness, 0.15, 1.2, 1, colorSet.length))

            //vec4
            sshader.setUniform('uColor', colorSet[activeColor]._array)
            //sampler2D
            sshader.setUniform('uTexture', pixelSet[getRandomInt(pixelSet.length)])
            //int
            sshader.setUniform('uRotation', p5.random(0, 270))

            p5.noStroke()
            p5.rect((-portrait.width / 2) + x + p5.random(-12, 2), (-portrait.height / 2) + y + p5.random(-2, 12), radius, radius)
        }
    }
}

function runPixelsScaled(p5, stepSize, pixelSet, colorSet, portrait){
    for (let y = 0; y < portrait.height; y += stepSize){
        for (let x = 0; x < portrait.width; x += stepSize){
            const i = y * portrait.width + x
            const darkness = (255 - portrait.pixels[i * 4]) / 255
            
            const radius = (stepSize * darkness) * p5.random(.25, 1.5)

            const activeColor = p5.int(p5.map(darkness, 0, 1.1, 0, colorSet.length))

            //vec4
            sshader.setUniform('uColor', colorSet[activeColor]._array)
            //sampler2D
            sshader.setUniform('uTexture', pixelSet[getRandomInt(pixelSet.length)])
            //int
            sshader.setUniform('uRotation', p5.random(-36, 36))

            p5.noStroke()
            p5.rect((-portrait.width / 2) + x + p5.random(-12, 12), (-portrait.height / 2) + y + p5.random(-12, 12), radius, radius)
        }
    }  
}

function getRandomInt(max){
    return Math.floor(Math.random() * max)
}

export { preload, draw, setup }