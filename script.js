const trigger = document.getElementById('play-trigger');
const video = document.getElementById('intro-video');
const introScreen = document.getElementById('intro-screen');
const bgMusic = document.getElementById('bg-music');

trigger.addEventListener('click', () => {
  // 1. إخفاء الزرار فور الضغط
  trigger.style.display = 'none';

  // 2. تشغيل فيديو الستارة (صامت ومضمون العرض على الموبايل)
  if (video) {
    video.muted = true;
    video.play().catch(e => console.log("Video error:", e));
  }

  // 3. تشغيل الصوت بطريقة متوافقة مع الموبايل
  if (bgMusic) {
    // تشغيل أولاً لفك حظر المتصفح للموبايل
    bgMusic.play().then(() => {
      // تقديم الصوت للدقيقة 0:51 بعد بدء التشغيل بنجاح
      bgMusic.currentTime = 49;
    }).catch(e => {
      console.log("Audio playback error:", e);
    });
  }

  // 4. عند انتهاء الفيديو تختفي شاشة الانترو وتستمر الأغنية
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