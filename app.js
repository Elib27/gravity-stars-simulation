
/*
    Formules gravitation
    F = G * m1 * m2 / d^2
    F = m * a => a = F / m => v = F * t / m + vIni => pas = t^2/2 * F / m + vIni * t

    Logique : 

    On place toutes les étoiles random et vIni random
    On calcule pour chaque étoile la force qu'elle subit de la part de chaque étoile
    On garde la somme des forces subies pour  et y
    On calcule l'accel subie par l'étoile
    On intèdre deux fois pour obtenir la prochaine position de l'étoile
    On update la position de l'étoile
    On dessine l'étoile
*/

const canvas = document.querySelector('#simulation_window')
const ctx = canvas.getContext('2d')

let canvas_width = canvas.width = window.innerWidth
let canvas_height = canvas.height = window.innerHeight

function defineCanvasDimensions(){
    canvas_width = canvas.width = window.innerWidth
    canvas_height = canvas.height = window.innerHeight
}
addEventListener('resize', defineCanvasDimensions)

const NB_STARS = 100
const DT = 0.1; // Delta time
const G = 6.6742 * 10**-11

function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function drawBackground(){
    ctx.fillStyle = 'rgb(0, 2, 19)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}
drawBackground()

class Star {
    constructor(initalXSpeed, initalYSpeed, mass){
        this.x = randomNumber(100, canvas_width - 100)
        this.y = randomNumber(50, canvas_height - 50)
        this.initalXSpeed = initalXSpeed
        this.initalYSpeed = initalYSpeed
        this.mass = mass;
    }

    update(){
        let xForce = 0;
        let yForce = 0;
        for (const star of stars) {
            if (this !== star) {
                const dist = Math.sqrt((star.x - this.x)**2 + (star.y - this.y)**2)
                const Force = (G * this.mass * star.mass) / dist**2
                xForce += (star.x - this.x) / dist * Force
                yForce += (star.y - this.y) / dist * Force;
                if (star === stars[0]){console.log(xForce)}
            }
        }

        this.x += (xForce * DT**2) / (2 * this.mass) + this.initalXSpeed * DT
        this.y += (yForce * DT**2) / (2 * this.mass) + this.initalYSpeed * DT
    }

    draw(){
        // 'rgb(46, 112, 225)'
        ctx.fillStyle = 'rgb(255, 255, 255)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, 1, 0, 2 * Math.PI)
        ctx.fill()
    }


}

let stars =  []

for (let i = 0; i < NB_STARS; i++) {
    stars.push(new Star(randomNumber(-20, 20), randomNumber(-20, 20), 5*10**16))
}


function animate(){
    drawBackground()
    for (const star of stars){
        star.update()
        star.draw()
    }
    requestAnimationFrame(animate)
}

animate()