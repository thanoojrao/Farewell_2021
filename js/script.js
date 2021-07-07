const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let particlesArray = [];
let smokeArray=[];
class Particle {
    constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.weight = Math.random()*1.5+1.5;
        this.directionX= Math.random()*2;
    }
    update(){
        this.y-=this.weight;
        this.x += this.directionX;
        if(this.size>=0.3) this.size-=0.2;
    }
    draw(color){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fillStyle = color;
        ctx.fill();
    }
}

let activeButton =-1;

function handleParticles(){
    for(let i=0;i<particlesArray.length;i++){
        particlesArray[i].update();
        particlesArray[i].draw('orange');
        if(particlesArray[i].size<=1){
            particlesArray.splice(i,1);
            i--;
        }
    }
    for(let i=0;i<smokeArray.length;i++){
        smokeArray[i].update();
        smokeArray[i].draw('gray');
        if(smokeArray[i].size<=1){
            smokeArray.splice(i,1);
            i--;
        }
    }
}
function createParticle(){
    if(activeButton==1){
        let size = Math.random()*20+5;
        let x =Math.random()*(60)+image.getBoundingClientRect().x+size;
        let y = Number(image.getBoundingClientRect().y)+7;
        smokeArray.push(new Particle(x,y,size));
    }
}
function finalSmoke(){
    if(activeButton==-3){
        let size = Math.random()*40+10;
        let x =Math.random()*(canvas.width-2*size)+size;
        let y = canvas.height-10;
        let fire = new Particle(x,10,size);
        fire.weight = -fire.weight;
        particlesArray.push(fire);
        smokeArray.push(new Particle(x,y,size));
    }
}

window.addEventListener('resize',function(){
    canvas.width= window.innerWidth;
    canvas.height= window.innerHeight;
})

class ResponsiveImageMap {
    constructor(map, img, width) {
        this.img = img;
        this.originalWidth = width;
        this.areas = [];
        
        for (const area of map.getElementsByTagName('area')) {
            this.areas.push({
                element: area,
                originalCoords: area.coords.split(',')
            });
        }

        window.addEventListener('resize', e => this.resize(e));
        this.resize();
    }

    resize() {
        const ratio = this.img.offsetWidth / this.originalWidth;

        for (const area of this.areas) {
            const newCoords = [];
            for (const originalCoord of area.originalCoords) {
                newCoords.push(Math.round(originalCoord * ratio));
            }
            area.newCoords = newCoords;
            area.element.coords = newCoords.join(',');
        }

        return true;
    };
}

var map = document.getElementById('flaskMap');
var image = document.getElementById('flask');
var flaskFire = new ResponsiveImageMap(map, image, 284);

console.log((Number(image.getBoundingClientRect().y)+Number(flaskFire.areas[0].newCoords[1])))
function flaskParticle(){
    if(activeButton == 0){
        let size = Math.random()*10+5;
        let x =Math.random()*(flaskFire.areas[0].originalCoords[2]-2*size)+image.getBoundingClientRect().x+flaskFire.areas[0].newCoords[0]+size-20;
        let y =(Number(image.getBoundingClientRect().y)+Number(flaskFire.areas[0].newCoords[1]))+20;
        particlesArray.push(new Particle(x,y,size));
    }
}
function clickedFire(){
    activeButton=0;
    setTimeout(()=>{
        activeButton=-2;
    },2000);
}
let eyes = document.getElementById('eyes');
let discordLink = document.getElementById('discordLink');
function clickedSmoke(){
    if(activeButton==-2){
        activeButton=1;
        setTimeout(()=>{
            activeButton=-3;
            smokeArray=[];
            eyes.style.display='block';
            eyes.style.animation='fadeIn 3s';
            image.style.animation='fadeOut 3s';
            image.style.height='30vh';
            image.style.top='35%';
            image.style.opacity='0.7';
            discordLink.style.display='block';
            discordLink.style.animation='fadeInBtn 2s';
        },3000);
}}
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    flaskParticle();
    createParticle(); 
    finalSmoke();  
    handleParticles();
    requestAnimationFrame(animate);
}
animate();
