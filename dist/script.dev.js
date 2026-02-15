"use strict";

// Simple confetti implementation and interactions for Vedika
(function () {
  var greeting = document.getElementById('greeting');
  var sub = document.getElementById('sub');
  var tipsBtn = document.getElementById('tipsBtn');
  var tipsEl = document.getElementById('tips'); // Greeting is fixed for Vedika

  greeting.textContent = 'Good luck, Vedika!';
  sub.textContent = "You've got this — go show them what you know!";
  tipsBtn.addEventListener('click', function () {
    tipsEl.classList.toggle('hidden');
  });
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

  animate(); // --- HEART & MESSAGES ---

  var heart = document.getElementById('teddy');
  var loveMessage = document.getElementById('love-message');
  var bigHeartOverlay = document.getElementById('big-heart-overlay');
  var bigHeartElement = document.querySelector('.big-heart');
  var longMessage = document.getElementById('long-message');
  var heartsContainer = document.getElementById('hearts-container');
  var heartClickCount = 0;

  function createFloatingHeart(x, y) {
    var heartEl = document.createElement('div');
    heartEl.className = 'floating-heart';
    heartEl.textContent = '❤️';
    heartEl.style.left = x + 'px';
    heartEl.style.top = y + 'px';
    heartsContainer.appendChild(heartEl);
    setTimeout(function () {
      return heartEl.remove();
    }, 2500);
  }

  function showLoveMessage() {
    loveMessage.classList.remove('hidden');
    playHeartBurst();
    setTimeout(function () {
      loveMessage.classList.add('hidden');
      showBigHeartOverlay();
    }, 3000);
  }

  function showBigHeartOverlay() {
    bigHeartOverlay.classList.remove('hidden');
  }

  function showLongMessage() {
    bigHeartOverlay.classList.add('hidden');
    longMessage.classList.remove('hidden');
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

  if (heart) {
    heart.addEventListener('click', function (e) {
      heartClickCount++; // Show hearts on click

      var rect = e.target.getBoundingClientRect();

      for (var i = 0; i < 3; i++) {
        setTimeout(function () {
          createFloatingHeart(rect.left + Math.random() * rect.width, rect.top + Math.random() * rect.height);
        }, i * 80);
      } // Show love message on 3rd click


      if (heartClickCount === 3) {
        showLoveMessage();
        heartClickCount = 0; // Reset counter
      }
    });
  } // Big heart click listener


  if (bigHeartElement) {
    bigHeartElement.addEventListener('click', function () {
      showLongMessage();
    });
  } // Auto-burst confetti when page loads


  window.addEventListener('load', function () {
    setTimeout(function () {
      burst(W / 2, H / 2, 200);
    }, 300);
  });
})(); // Function to close the long message popup


function closeLongMessage() {
  var longMessage = document.getElementById('long-message');
  longMessage.classList.add('hidden');
}