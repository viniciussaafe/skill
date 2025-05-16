// Three.js - Partículas no fundo
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.9, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg'),
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const particles = [];
const colors = [0x7f00ff, 0xffffff, 0x00cfff, 0x00ffcc, 0xff00ff, 0x00ffff, 0xff7f00];

for (let i = 0; i < 500; i++) {
    const geometry = new THREE.SphereGeometry(0.08, 20, 10);
    const material = new THREE.MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)]
    });
    const particle = new THREE.Mesh(geometry, material);
    particle.position.set((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100);
    scene.add(particle);
    particles.push(particle);
}

camera.position.z = 10;

function animate() {
    requestAnimationFrame(animate);
    scene.rotation.x += 0.0007;
    scene.rotation.y += 0.0012;
    renderer.render(scene, camera);
}
animate();


// Canvas para estrelas cadentes
const starCanvas = document.getElementById('shooting-stars');
const ctx = starCanvas.getContext('2d');

function resizeStarCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
}
resizeStarCanvas();
window.addEventListener('resize', resizeStarCanvas);

const shootingStars = [];

function createShootingStar() {
    return {
        x: Math.random() * starCanvas.width,
        y: Math.random() * starCanvas.height / 2,
        length: Math.random() * 80 + 10,
        speed: Math.random() * 10 + 6,
        angle: Math.PI / 4,
        opacity: 1
    };
}

function drawShootingStar(star) {
    const x = star.x;
    const y = star.y;
    const endX = x + star.length * Math.cos(star.angle);
    const endY = y + star.length * Math.sin(star.angle);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function animateShootingStars() {
    ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);

    if (Math.random() < 0.03) {
        shootingStars.push(createShootingStar());
    }

    for (let i = 0; i < shootingStars.length; i++) {
        const star = shootingStars[i];
        drawShootingStar(star);
        star.x += star.speed * Math.cos(star.angle);
        star.y += star.speed * Math.sin(star.angle);
        star.opacity -= 0.01;

        if (star.opacity <= 0) {
            shootingStars.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(animateShootingStars);
}
animateShootingStars();
