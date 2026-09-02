const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const setActive = () => {
  const y = window.scrollY + 180;
  let active = 'home';
  sections.forEach(section => { if (section.offsetTop <= y) active = section.id; });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${active}`));
};
window.addEventListener('scroll', setActive, { passive:true });
setActive();

const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
function resizeStars(){
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  canvas.style.width = innerWidth + 'px';
  canvas.style.height = innerHeight + 'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const count = Math.floor((innerWidth * innerHeight) / 9000);
  stars = Array.from({length:count},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.25+.25,a:Math.random()*.75+.2,s:Math.random()*.006+.002}));
}
function drawStars(t=0){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const s of stars){
    const a = s.a * (.72 + Math.sin(t*s.s + s.x)*.28);
    ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fillStyle=`rgba(220,235,255,${a})`; ctx.fill();
  }
  requestAnimationFrame(drawStars);
}
resizeStars(); drawStars();
window.addEventListener('resize', resizeStars);

const spotifyBtn = document.querySelector('.spotify-btn');
spotifyBtn?.addEventListener('click',()=>{ spotifyBtn.textContent='Spotify link nanti kita isi'; setTimeout(()=>spotifyBtn.textContent='Connect Spotify',2200); });
