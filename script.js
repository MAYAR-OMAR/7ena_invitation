const introScreen = document.getElementById('intro-screen');
const video = document.getElementById('intro-video');
const bgMusic = document.getElementById('bg-music');

// تحميل مبدئي للفيديو
window.addEventListener('load', () => {
  if (video) video.load();
});

// الضغط في أي مكان على شاشة الانترو يشغل الفيديو والأغنية
introScreen.addEventListener('click', () => {
  // 1. تشغيل الفيديو
  if (video) {
    video.muted = true;
    video.play().catch(e => console.log("Video error:", e));
  }

  // 2. تشغيل الأغنية من الدقيقة 0:51
  if (bgMusic) {
    bgMusic.play().then(() => {
      bgMusic.currentTime = 49;
    }).catch(e => console.log("Audio error:", e));
  }

  // 3. اختفاء الانترو عند انتهاء الفيديو
  if (video) {
    video.onended = () => {
      introScreen.style.display = 'none';
      document.body.classList.remove('curtain-active');
    };
  }
});
// 2. تشغيل العداد التنازلي
const eventDate = new Date("2026-10-15T20:00:00").getTime();

const timerInterval = setInterval(() => {
  const now = new Date().getTime();
  const diff = eventDate - now;

  if (diff < 0) {
    clearInterval(timerInterval);
    document.getElementById("countdown").innerHTML = "<h3>The Event Has Started! 🎉</h3>";
    return;
  }

  document.getElementById("days").innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
  document.getElementById("hours").innerText = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
  document.getElementById("minutes").innerText = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
  document.getElementById("seconds").innerText = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
}, 1000);

// عند انتهاء الفيديو تختفي شاشة الانترو ويبدأ السكرول التلقائي
video.onended = () => {
  introScreen.style.display = 'none';
  document.body.classList.remove('curtain-active');

  // سكرول تلقائي ناعم لأول قسم بعد الانترو
  const mainContent = document.getElementById('main-content'); // أو اسم السكشن الأول عندك
  if (mainContent) {
    mainContent.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
};