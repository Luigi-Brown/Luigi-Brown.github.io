const orbContainer = document.getElementById("orb-container");
const ORB_COUNT = 12;

function createOrb() {
  const orb = document.createElement("img");
  orb.src = "Images/orb.png";
  orb.classList.add("orb");

  resetOrb(orb, true);
  orbContainer.appendChild(orb);

  return {
    el: orb,
    speed: orb.dataset.speed,
    y: parseFloat(orb.dataset.startY)
  };
}

function resetOrb(orb, initial = false) {
  const size = Math.random() * 80 + 40;
  const speed = (150 / size) * (Math.random() * 0.5 + 0.75);
  const x = Math.random() * window.innerWidth;
  const startY = initial
    ? Math.random() * window.innerHeight
    : window.innerHeight + size;

  orb.style.width = size + "px";
  orb.style.left = x + "px";

  orb.dataset.speed = speed;
  orb.dataset.startY = startY;
}

const orbs = Array.from({ length: ORB_COUNT }, createOrb);

function animate() {
  orbs.forEach((orbObj) => {
    orbObj.y -= orbObj.speed;
    orbObj.el.style.transform = `translateY(${orbObj.y}px)`;

    if (orbObj.y < -200) {
      resetOrb(orbObj.el);
      orbObj.y = parseFloat(orbObj.el.dataset.startY);
      orbObj.speed = orbObj.el.dataset.speed;
    }
  });

  requestAnimationFrame(animate);
}

animate();
