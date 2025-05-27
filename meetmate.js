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

//다크모드 토글
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

//설정 버튼 클릭
function settings() {
  alert("설정 기능은 추후 추가될 예정입니다.");
}

//초기 실행
document.addEventListener("DOMContentLoaded", () => {
  updateDate();
  updateTime();
  setInterval(updateTime, 1000); // 실시간 시계
});
