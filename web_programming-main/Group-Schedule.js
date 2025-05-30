// ✅ Group-Schedule.js

const grid = document.getElementById("schedule-grid");
const days = ["일", "월", "화", "수", "목", "금", "토"];

// 시간표 그리기
for (let hour = 9; hour <= 22; hour++) {
  const time = `${hour.toString().padStart(2, "0")}:00`;
  const row = document.createElement("div");
  row.className = "row";
  row.innerHTML =
    `<div class="time-col">${time}</div>` +
    days
      .map(
        (day) =>
          `<div class="cell" data-day="${day}" data-time="${time}"></div>`
      )
      .join("");
  grid.appendChild(row);
}

// 셀 클릭 시 선택 상태 토글
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("cell")) {
    e.target.classList.toggle("selected");
  }
});

// 선택 완료 버튼에 연결되는 함수
function saveSelectionToLocal() {
  const selected = [...document.querySelectorAll(".cell.selected")].map(
    (cell) => ({
      day: cell.dataset.day,
      time: cell.dataset.time,
    })
  );

  if (selected.length === 0) {
    alert("하나 이상의 시간을 선택해주세요.");
    return;
  }

  const username = localStorage.getItem("user") || "me";
  localStorage.setItem(`selectedTime_${username}`, JSON.stringify(selected));

  // 랜덤값 생성 후 저장
  const randomSelections = [];
  for (let i = 0; i < 5; i++) {
    const randomDay = days[Math.floor(Math.random() * days.length)];
    const randomHour =
      (Math.floor(Math.random() * 14) + 9).toString().padStart(2, "0") + ":00";
    randomSelections.push({ day: randomDay, time: randomHour });
  }
  localStorage.setItem("selectedTime_random", JSON.stringify(randomSelections));

  const params = new URLSearchParams(location.search);
  const code = params.get("code") || "default";
  window.location.href = `group-schedule-result.html?code=${code}&user=${encodeURIComponent(
    username
  )}`;
}

// 햄버거 메뉴 토글
function toggleMenu() {
  const menu = document.getElementById("dropdownMenu");
  menu.classList.toggle("active");
}

// 창이 커질 때 메뉴 닫기
window.addEventListener("resize", () => {
  const menu = document.getElementById("dropdownMenu");
  if (window.innerWidth >= 768) {
    menu.classList.remove("active");
  }
});

// 링크 클릭 시 메뉴 닫기
if (document.querySelectorAll(".topnav a")) {
  document.querySelectorAll(".topnav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        document.getElementById("dropdownMenu").classList.remove("active");
      }
    });
  });
}
