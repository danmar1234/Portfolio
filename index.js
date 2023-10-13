import { Application } from "https://cdn.jsdelivr.net/npm/@splinetool/runtime@0.9.480";

const gsap = window.gsap;
const navlinks = document.querySelectorAll(".nav-link");
const menu = document.querySelector(".menuLogo");
const list = document.querySelector(".nav-list");


const canv = document.getElementById('canvas3d');
const app = new Application(canv);
app.load('https://prod.spline.design/0sWc8sUzs1BcOzOd/scene.splinecode');

const contactContainer = document.querySelector(".illustration-section");
const text = document.querySelector(".contactTitle");
const svgBackground = document.querySelector("#contactBackground");

menu.addEventListener("click", navToggle);

navlinks.forEach(i => i.addEventListener("click", ()=> {
    if(list.classList.contains("active")) 
        menu.click() 
}));

function navToggle() {
    navlinks.forEach(i => { 
        i.classList.toggle("fadeIn") 
    });
    list.classList.toggle("active");
}

contactContainer.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth - 0.5;
  const mouseY = e.clientY / window.innerHeight - 0.5;

  const depth1 = 10;
  const depth2 = -15;

  const moveX1 = depth1 * mouseX;
  const moveY1 = depth1 * mouseY;
  const moveX2 = depth2 * mouseX;

  text.style.transform = `translate(${moveX1}px, ${moveY1}px)`;
  svgBackground.style.transform = `translate(${moveX2}px)`;
});







beginRender();
async function beginRender() {
    let drawingCanvas = document.getElementById("webglCanvas");
    let image1 = new Image();
    image1.src = "./assets/image2.png";
    await new Promise(resolve => image1.onload = resolve);
    let depthImg = new Image();
    depthImg.src = "./assets/image22.png";
    await new Promise(resolve => depthImg.onload = resolve);
    drawingCanvas.width = image1.width;
    drawingCanvas.height = image1.height;

    let glContext = drawingCanvas.getContext("webgl");

    let vertexShaderCode = `
    attribute vec2 coordinates;
    varying vec2 uvCoordinates;
    void main(){
        uvCoordinates = coordinates * -0.5 + vec2(0.5);
        gl_Position = vec4(coordinates, 0.0, 1.0);
    }
    `
    let vertexShader = glContext.createShader(glContext.VERTEX_SHADER);
    glContext.shaderSource(vertexShader, vertexShaderCode);
    glContext.compileShader(vertexShader);

    let fragmentShaderCode = `
    precision highp float;
    uniform sampler2D imageTexture;
    uniform sampler2D depthTexture;
    uniform vec2 pointerPos;
    varying vec2 uvCoordinates;
    void main(){
        float depthValue = -0.5 + texture2D(depthTexture, uvCoordinates).x;
        gl_FragColor = texture2D(imageTexture, uvCoordinates + pointerPos * 0.03 * depthValue);
    }
    `

    let fragShader = glContext.createShader(glContext.FRAGMENT_SHADER);
    glContext.shaderSource(fragShader, fragmentShaderCode);
    glContext.compileShader(fragShader);

    let shaderProgram = glContext.createProgram();
    glContext.attachShader(shaderProgram, fragShader);
    glContext.attachShader(shaderProgram, vertexShader);
    glContext.linkProgram(shaderProgram);
    glContext.useProgram(shaderProgram);

    let dataBuffer = glContext.createBuffer();
    glContext.bindBuffer(glContext.ARRAY_BUFFER, dataBuffer);
    glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array([
        -1, -1, -1, 1,
        1, -1, 1, 1,
    ]), glContext.STATIC_DRAW);

    const vertPositionAttribute = glContext.getAttribLocation(shaderProgram, 'coordinates');

    glContext.vertexAttribPointer(vertPositionAttribute, 2, glContext.FLOAT, false, 0, 0);
    glContext.enableVertexAttribArray(vertPositionAttribute);

    function assignTexture(image, identifier, slot) {
        let txt = glContext.createTexture();
        glContext.activeTexture(glContext.TEXTURE0 + slot);
        glContext.bindTexture(glContext.TEXTURE_2D, txt);

        glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MIN_FILTER, glContext.LINEAR);
        glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_S, glContext.CLAMP_TO_EDGE);
        glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_T, glContext.CLAMP_TO_EDGE);

        glContext.texImage2D(glContext.TEXTURE_2D, 0, glContext.RGBA, glContext.RGBA, glContext.UNSIGNED_BYTE, image);
        glContext.uniform1i(glContext.getUniformLocation(shaderProgram, identifier), slot);
    }

    assignTexture(image1, "imageTexture", 0);
    assignTexture(depthImg, "depthTexture", 1);

    animate();

    function animate() {
        glContext.clearColor(0.25, 0.65, 1, 1);
        glContext.clear(glContext.COLOR_BUFFER_BIT);
        glContext.drawArrays(glContext.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(animate);
    }

    let pointerPositionLoc = glContext.getUniformLocation(shaderProgram, "pointerPos");
    drawingCanvas.onmousemove = function (evt) {
        let pointerCoordinates = [-1.4 + evt.layerX / drawingCanvas.width, 3 - evt.layerY / drawingCanvas.height]
        
        glContext.uniform2fv(pointerPositionLoc, new Float32Array(pointerCoordinates));
    }

    glContext.viewport(0, 0, glContext.canvas.width, glContext.canvas.height);
}



const lenis = new Lenis()

lenis.on('scroll', (e) => {
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)



const Name = document.querySelector('.name');
const lastName = document.querySelector('.lastName');
const hey = document.querySelector('#hey');
const overlayPath = document.querySelector('.overlay__path');
let isAnimating = false;
let Main = document.querySelector("main");
let pageReveal = () => {
    if (isAnimating) return;
    isAnimating = true;
    gsap.timeline({
        onComplete: () => (isAnimating = false)
        })
        .set(overlayPath, {
        attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' }
        })
        .to(overlayPath, { 
        duration: 0.8,
        ease: 'power4.in',
        attr: { d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z' }
        }, 0)
        .to(overlayPath, { 
        duration: 0.3,
        ease: 'power2',
        attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' },
        onComplete: () => {
            //frame.classList.add('frame--menu-open');
            //menuWrap.classList.add('menu-wrap--open');
            Main.style.display = "block";
        }
        })
        // now reveal
        .set(overlayPath, { 
        attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' }
        })
        .to(overlayPath, { 
        duration: 0.3,
        ease: 'power2.in',
        attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' }
        })
        .to(overlayPath, { 
        duration: 0.8,
        ease: 'power4',
        attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
        })
        .to(
        [Name, lastName, hey],
        {
            duration: 1.1,
            ease: 'power4',
            startAt: {y: 150},
            y: 0,
            opacity: 1,
            stagger: 0.05
        }, '>-=1.1');

}


document.addEventListener('DOMContentLoaded', () => {
    pageReveal();
});
