//날짜 갱신
function updateDate() {
  const today = new Date();
  document.getElementById("today-date").textContent =
    "📅 오늘 날짜: " +
    today.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
}

//시간 갱신
function updateTime() {
  const now = new Date();
  document.getElementById("current-time").textContent =
    "🕒 현재 시간: " + now.toLocaleTimeString();
}

//초기 실행
document.addEventListener("DOMContentLoaded", () => {
  updateDate();
  updateTime();
  setInterval(updateTime, 1000); // 실시간 시계
});

document.addEventListener("DOMContentLoaded", () => {
  let prevScroll = window.scrollY;
  const header = document.querySelector("header");

  if (!header) return;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > prevScroll) {
      header.style.top = "-100px";
    } else {
      header.style.top = "0";
    }

    prevScroll = currentScroll;
  });
});
function toggleMenu() {
  document.getElementById("mainNav").classList.toggle("active");
}
