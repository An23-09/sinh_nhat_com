/* =========================================
   CẤU HÌNH DỄ CHỈNH
========================================= */

// Ngày giờ tổ chức sinh nhật
// Format: YYYY-MM-DDTHH:MM:SS
const birthdayDate = new Date("2026-10-17T18:00:00");

// Link Google Maps - thay bằng link thật của bạn
const MAP_URL = "https://maps.app.goo.gl/a5SAwazmFZTNP21v7";

// Lời chúc gợi ý khi bấm nút
const wishMessage = "Chúc bé Cốm tuổi mới hay ăn chóng lớn, luôn vui vẻ, khỏe mạnh và thật hạnh phúc 💕";


/* =========================================
   LẤY PHẦN TỬ
========================================= */
const introScreen = document.getElementById("introScreen");
const openCardBtn = document.getElementById("openCardBtn");
const mainCard = document.getElementById("mainCard");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const mapBtn = document.getElementById("mapBtn");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const attendBtn = document.getElementById("attendBtn");
const wishBtn = document.getElementById("wishBtn");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");
const galleryPhotos = document.querySelectorAll(".gallery-photo");

const toast = document.getElementById("toast");

let isMusicPlaying = false;


/* =========================================
   HÀM PHỤ
========================================= */
function padNumber(number) {
  return number.toString().padStart(2, "0");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function playMusic() {
  bgMusic.volume = 0.35;
  bgMusic.play()
    .then(() => {
      isMusicPlaying = true;
      musicToggle.textContent = "🔊";
    })
    .catch(() => {
      isMusicPlaying = false;
      musicToggle.textContent = "🔇";
      showToast("Trình duyệt đang chặn phát nhạc. Hãy bấm lại để bật nhạc nhé 🎵");
    });
}

function toggleMusic() {
  if (isMusicPlaying) {
    bgMusic.pause();
    isMusicPlaying = false;
    musicToggle.textContent = "🔇";
    showToast("Đã tắt nhạc");
  } else {
    bgMusic.play()
      .then(() => {
        isMusicPlaying = true;
        musicToggle.textContent = "🔊";
        showToast("Đã bật nhạc");
      })
      .catch(() => {
        showToast("Không thể phát nhạc trên thiết bị này.");
      });
  }
}

function updateCountdown() {
  const now = new Date();
  const diff = birthdayDate - now;

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  daysEl.textContent = padNumber(days);
  hoursEl.textContent = padNumber(hours);
  minutesEl.textContent = padNumber(minutes);
  secondsEl.textContent = padNumber(seconds);
}


/* =========================================
   SỰ KIỆN MỞ THIỆP
========================================= */
openCardBtn.addEventListener("click", () => {
  introScreen.classList.add("hidden");
  mainCard.classList.remove("hidden");
  musicToggle.classList.remove("hidden");

  playMusic();
  updateCountdown();
  setInterval(updateCountdown, 1000);
});


/* =========================================
   BẬT / TẮT NHẠC
========================================= */
musicToggle.addEventListener("click", toggleMusic);


/* =========================================
   NÚT BẢN ĐỒ
========================================= */
mapBtn.addEventListener("click", () => {
  window.open(MAP_URL, "_blank");
});


/* =========================================
   ALBUM PHÓNG TO
========================================= */
galleryPhotos.forEach((photo) => {
  photo.addEventListener("click", () => {
    lightboxImg.src = photo.src;
    lightbox.classList.remove("hidden");
  });
});

closeLightbox.addEventListener("click", () => {
  lightbox.classList.add("hidden");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add("hidden");
  }
});


/* =========================================
   RSVP
========================================= */
attendBtn.addEventListener("click", () => {
  attendBtn.style.transform = "scale(0.98)";
  setTimeout(() => {
    attendBtn.style.transform = "";
  }, 140);

  showToast("Cảm ơn bạn đã xác nhận tham dự cùng Cốm 💗");
});

wishBtn.addEventListener("click", () => {
  wishBtn.style.transform = "scale(0.98)";
  setTimeout(() => {
    wishBtn.style.transform = "";
  }, 140);

  // Nếu muốn gửi qua Zalo/Facebook/Messenger thì có thể đổi phần này sau
  // Hiện tại sẽ copy lời chúc vào clipboard nếu trình duyệt hỗ trợ
  if (navigator.clipboard) {
    navigator.clipboard.writeText(wishMessage)
      .then(() => {
        showToast("Đã sao chép lời chúc cho bé 🥰");
      })
      .catch(() => {
        showToast(wishMessage);
      });
  } else {
    showToast(wishMessage);
  }
});