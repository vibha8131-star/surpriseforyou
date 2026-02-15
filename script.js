// Simple confetti implementation and personalization handling
(() => {
  const qs = new URLSearchParams(location.search);
  const nameInput = document.getElementById('name');
  const applyBtn = document.getElementById('apply');
  const greeting = document.getElementById('greeting');
  const sub = document.getElementById('sub');
  const tipsBtn = document.getElementById('tipsBtn');
  const tipsEl = document.getElementById('tips');
  const confettiBtn = document.getElementById('confettiBtn');
  const shareLinkEl = document.getElementById('shareLink');

  function updateFromQuery(){
    // default to Vedika when no name parameter is provided
    const paramName = qs.get('name');
    const name = paramName !== null ? paramName : 'Vedika';
    applyName(name);
    nameInput.value = name;
    updateShareLink();
  }

  function applyName(name){
    greeting.textContent = name ? `Good luck, ${name}!` : 'Good luck on your exams!';
    sub.textContent = name ? `You've got this, ${name} — go show them what you know!` : 'A little cheer to help you ace them — click the confetti!';
  }

  applyBtn.addEventListener('click', ()=>{
    const name = nameInput.value.trim();
    // update query string without reloading
    const u = new URL(location.href);
    if(name) u.searchParams.set('name', name);
    else u.searchParams.delete('name');
    history.replaceState(null, '', u.toString());
    applyName(name);
    updateShareLink();
  });

  tipsBtn.addEventListener('click', ()=>{
    tipsEl.classList.toggle('hidden');
  });

  function updateShareLink(){
    // show full absolute link so user can copy and send
    const href = location.href;
    shareLinkEl.textContent = href;
  }

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

  // WhatsApp share button: opens WhatsApp Web/app with a prefilled message
  const whatsappBtn = document.getElementById('whatsappBtn');
  if(whatsappBtn){
    whatsappBtn.addEventListener('click', ()=>{
      // Use the current applied name from the greeting (fallback to Vedika)
      const textName = (new URLSearchParams(location.search).get('name')) || nameInput.value || 'Vedika';
      const message = `Hey ${textName}! I made this little good-luck card for you — check it out:` + ' ' + location.href;
      const encoded = encodeURIComponent(message);
      // wa.me with text param opens WhatsApp app on mobile or WhatsApp Web on desktop
      const waLink = `https://wa.me/?text=${encoded}`;
      window.open(waLink, '_blank');
    });
  }

  // --- TEDDY BEAR & HEARTS ---
  const teddy = document.getElementById('teddy');
  const loveMessage = document.getElementById('love-message');
  const heartsContainer = document.getElementById('hearts-container');
  let teddyClickCount = 0;

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
    }, 3000);
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

  if (teddy) {
    teddy.addEventListener('click', (e) => {
      teddyClickCount++;
      
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
      if (teddyClickCount === 3) {
        showLoveMessage();
        teddyClickCount = 0; // Reset counter
      }
    });
  }

  // If the page was opened with a name in the query, apply it
  updateFromQuery();
})();
