// Simple confetti implementation and interactions for Vedika
(() => {
  const greeting = document.getElementById('greeting');
  const sub = document.getElementById('sub');
  const tipsBtn = document.getElementById('tipsBtn');
  const tipsEl = document.getElementById('tips');
  const confettiBtn = document.getElementById('confettiBtn');

  // Greeting is fixed for Vedika
  greeting.textContent = 'Good luck, Vedika!';
  sub.textContent = "You've got this — go show them what you know!";

  tipsBtn.addEventListener('click', ()=>{
    tipsEl.classList.toggle('hidden');
  });

  // --- CONFETTI ---
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  const colors = ['#ff6b6b','#ffd166','#6bcB77','#4d96ff','#c792ff'];

  window.addEventListener('resize', ()=>{
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  });

  function rand(min,max){ return Math.random()*(max-min)+min }

  function Confetti(x,y){
    this.x=x;this.y=y;this.w=rand(6,12);this.h=this.w*0.6;this.color=colors[Math.floor(Math.random()*colors.length)];
    this.tilt = rand(-10,10);this.gravity=rand(0.2,0.6);this.rotation = rand(0,360);this.speedX=rand(-2,2);this.speedY=rand(-6,-3);
  }

  Confetti.prototype.update = function(){
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += 6;
    if(this.y > H + 20) this.y = -20;
  }

  Confetti.prototype.draw = function(ctx){
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.rotation * Math.PI/180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
    ctx.restore();
  }

  let confettis = [];
  function burst(x,y,count=80){
    for(let i=0;i<count;i++) confettis.push(new Confetti(x + rand(-20,20), y + rand(-10,10)));
  }

  function animate(){
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<confettis.length;i++){
      const c = confettis[i];
      c.update();
      c.draw(ctx);
      // fade out old ones
      if(confettis.length>800) confettis.shift();
    }
    requestAnimationFrame(animate);
  }
  animate();

  confettiBtn.addEventListener('click', (e)=>{
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width/2;
    const y = rect.top + rect.height/2;
    burst(x,y,160);
  });

  // --- HEART & MESSAGES ---
  const heart = document.getElementById('teddy');
  const loveMessage = document.getElementById('love-message');
  const longMessage = document.getElementById('long-message');
  const heartsContainer = document.getElementById('hearts-container');
  let heartClickCount = 0;

  function createFloatingHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '❤️';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heartsContainer.appendChild(heart);
    
    setTimeout(() => heart.remove(), 2500);
  }

  function showLoveMessage() {
    loveMessage.classList.remove('hidden');
    playHeartBurst();
    
    setTimeout(() => {
      loveMessage.classList.add('hidden');
      showLongMessage();
    }, 3000);
  }

  function showLongMessage() {
    longMessage.classList.remove('hidden');
  }

  function playHeartBurst() {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.6;
        createFloatingHeart(x, y);
      }, i * 100);
    }
  }

  if (heart) {
    heart.addEventListener('click', (e) => {
      heartClickCount++;
      
      // Show hearts on click
      const rect = e.target.getBoundingClientRect();
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          createFloatingHeart(
            rect.left + Math.random() * rect.width,
            rect.top + Math.random() * rect.height
          );
        }, i * 80);
      }

      // Show love message on 3rd click
      if (heartClickCount === 3) {
        showLoveMessage();
        heartClickCount = 0; // Reset counter
      }
    });
  }

  // Auto-burst confetti when page loads
  window.addEventListener('load', ()=>{
    setTimeout(()=>{
      burst(W/2, H/2, 200);
    }, 300);
  });
})();

// Function to close the long message popup
function closeLongMessage() {
  const longMessage = document.getElementById('long-message');
  longMessage.classList.add('hidden');
}
