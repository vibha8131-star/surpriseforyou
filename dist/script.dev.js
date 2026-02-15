"use strict";

// Simple confetti implementation and personalization handling
(function () {
  var qs = new URLSearchParams(location.search);
  var nameInput = document.getElementById('name');
  var applyBtn = document.getElementById('apply');
  var greeting = document.getElementById('greeting');
  var sub = document.getElementById('sub');
  var tipsBtn = document.getElementById('tipsBtn');
  var tipsEl = document.getElementById('tips');
  var confettiBtn = document.getElementById('confettiBtn');
  var shareLinkEl = document.getElementById('shareLink');

  function updateFromQuery() {
    // default to Vedika when no name parameter is provided
    var paramName = qs.get('name');
    var name = paramName !== null ? paramName : 'Vedika';
    applyName(name);
    nameInput.value = name;
    updateShareLink();
  }

  function applyName(name) {
    greeting.textContent = name ? "Good luck, ".concat(name, "!") : 'Good luck on your exams!';
    sub.textContent = name ? "You've got this, ".concat(name, " \u2014 go show them what you know!") : 'A little cheer to help you ace them — click the confetti!';
  }

  applyBtn.addEventListener('click', function () {
    var name = nameInput.value.trim(); // update query string without reloading

    var u = new URL(location.href);
    if (name) u.searchParams.set('name', name);else u.searchParams["delete"]('name');
    history.replaceState(null, '', u.toString());
    applyName(name);
    updateShareLink();
  });
  tipsBtn.addEventListener('click', function () {
    tipsEl.classList.toggle('hidden');
  });

  function updateShareLink() {
    // show full absolute link so user can copy and send
    var href = location.href;
    shareLinkEl.textContent = href;
  } // --- CONFETTI ---


  var canvas = document.getElementById('confetti-canvas');
  var ctx = canvas.getContext('2d');
  var W = canvas.width = innerWidth;
  var H = canvas.height = innerHeight;
  var colors = ['#ff6b6b', '#ffd166', '#6bcB77', '#4d96ff', '#c792ff'];
  window.addEventListener('resize', function () {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  });

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function Confetti(x, y) {
    this.x = x;
    this.y = y;
    this.w = rand(6, 12);
    this.h = this.w * 0.6;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.tilt = rand(-10, 10);
    this.gravity = rand(0.2, 0.6);
    this.rotation = rand(0, 360);
    this.speedX = rand(-2, 2);
    this.speedY = rand(-6, -3);
  }

  Confetti.prototype.update = function () {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += 6;
    if (this.y > H + 20) this.y = -20;
  };

  Confetti.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.restore();
  };

  var confettis = [];

  function burst(x, y) {
    var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 80;

    for (var i = 0; i < count; i++) {
      confettis.push(new Confetti(x + rand(-20, 20), y + rand(-10, 10)));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    for (var i = 0; i < confettis.length; i++) {
      var c = confettis[i];
      c.update();
      c.draw(ctx); // fade out old ones

      if (confettis.length > 800) confettis.shift();
    }

    requestAnimationFrame(animate);
  }

  animate();
  confettiBtn.addEventListener('click', function (e) {
    var rect = e.target.getBoundingClientRect();
    var x = rect.left + rect.width / 2;
    var y = rect.top + rect.height / 2;
    burst(x, y, 160);
  }); // WhatsApp share button: opens WhatsApp Web/app with a prefilled message

  var whatsappBtn = document.getElementById('whatsappBtn');

  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function () {
      // Use the current applied name from the greeting (fallback to Vedika)
      var textName = new URLSearchParams(location.search).get('name') || nameInput.value || 'Vedika'; // Build the live GitHub Pages URL with the name parameter

      var liveUrl = 'https://vibha8131-star.github.io/surpriseforyou/';
      var shareUrl = textName ? "".concat(liveUrl, "?name=").concat(encodeURIComponent(textName)) : liveUrl;
      var message = "Hey ".concat(textName, "! I made this little good-luck card for you \u2014 click the teddy bear at the end! \uD83D\uDC3B\uD83D\uDC95") + '\n\n' + shareUrl;
      var encoded = encodeURIComponent(message); // wa.me with text param opens WhatsApp app on mobile or WhatsApp Web on desktop

      var waLink = "https://wa.me/?text=".concat(encoded);
      window.open(waLink, '_blank');
    });
  } // --- TEDDY BEAR & HEARTS ---


  var teddy = document.getElementById('teddy');
  var loveMessage = document.getElementById('love-message');
  var heartsContainer = document.getElementById('hearts-container');
  var teddyClickCount = 0;

  function createFloatingHeart(x, y) {
    var heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '❤️';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heartsContainer.appendChild(heart);
    setTimeout(function () {
      return heart.remove();
    }, 2500);
  }

  function showLoveMessage() {
    loveMessage.classList.remove('hidden');
    playHeartBurst();
    setTimeout(function () {
      loveMessage.classList.add('hidden');
    }, 3000);
  }

  function playHeartBurst() {
    for (var i = 0; i < 8; i++) {
      setTimeout(function () {
        var x = Math.random() * window.innerWidth;
        var y = Math.random() * window.innerHeight * 0.6;
        createFloatingHeart(x, y);
      }, i * 100);
    }
  }

  if (teddy) {
    teddy.addEventListener('click', function (e) {
      teddyClickCount++; // Show hearts on click

      var rect = e.target.getBoundingClientRect();

      for (var i = 0; i < 3; i++) {
        setTimeout(function () {
          createFloatingHeart(rect.left + Math.random() * rect.width, rect.top + Math.random() * rect.height);
        }, i * 80);
      } // Show love message on 3rd click


      if (teddyClickCount === 3) {
        showLoveMessage();
        teddyClickCount = 0; // Reset counter
      }
    });
  } // Auto-burst confetti when page loads


  window.addEventListener('load', function () {
    setTimeout(function () {
      burst(W / 2, H / 2, 200);
    }, 300);
  }); // If the page was opened with a name in the query, apply it

  updateFromQuery();
})();