const grid = document.getElementById("schedule-grid");
const days = ["일", "월", "화", "수", "목", "금", "토"];

const params = new URLSearchParams(location.search);
const code = params.get("code") || "-";
const username = localStorage.getItem("user") || "me";
document.getElementById("group-code").textContent = code;
document.getElementById("user-name").textContent = username;

// 내 선택값
const my = JSON.parse(localStorage.getItem(`selectedTime_${username}`) || "[]");

// 랜덤 값
const random = JSON.parse(localStorage.getItem("selectedTime_random") || "[]");

// 전부 합침
const allSelections = [...my, ...random];

// 카운트 계산
const countMap = {};
allSelections.forEach(({ day, time }) => {
  const key = `${day}-${time}`;
  countMap[key] = (countMap[key] || 0) + 1;
});

const max = Math.max(...Object.values(countMap));
const bestSlots = Object.entries(countMap)
  .filter(([_, count]) => count === max && count > 1)
  .map(([key]) => key);

// 그리드 생성
for (let hour = 9; hour <= 22; hour++) {
  const time = `${hour.toString().padStart(2, "0")}:00`;
  const row = document.createElement("div");
  row.className = "row";
  row.innerHTML = `<div class="time-col">${time}</div>`;

  for (const day of days) {
    const cell = document.createElement("div");
    const key = `${day}-${time}`;

    if (my.some((s) => s.day === day && s.time === time)) {
      cell.classList.add("cell", "my-selection");
    } else if (countMap[key]) {
      cell.classList.add("cell", "others-selection");
    } else {
      cell.classList.add("cell");
    }

    if (countMap[key] === max && max > 1) {
      cell.classList.add("recommended");
    }

    row.appendChild(cell);
  }
  grid.appendChild(row);
}

// 추천 시간대 표시 및 저장
const recText = document.getElementById("recommendation");
if (bestSlots.length > 0) {
  const summaryText = `최적의 시간: ${bestSlots.join(", ")}`;
  recText.textContent = summaryText;

  // ✅ 전체 요약 페이지에서도 사용하도록 저장
  localStorage.setItem("meetingSchedule", summaryText);
} else {
  recText.textContent = "공통 시간이 부족합니다.";
  localStorage.setItem("meetingSchedule", "공통 시간이 부족합니다.");
}

// 우측 상단 로그인/로그아웃 처리
const topArea = document.getElementById("auth-buttons");
if (username && username !== "null") {
  topArea.innerHTML = `
      <span>${username}님 환영합니다</span>
      <button onclick="logout()">로그아웃</button>
    `;
} else {
  topArea.innerHTML = `
      <button onclick="window.location.href='login.html'">로그인</button>
    `;
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}

function toggleMenu() {
  const menu = document.getElementById("dropdownMenu");
  menu.classList.toggle("active");
}

// 창이 커지면 햄버거 메뉴 닫기
window.addEventListener("resize", () => {
  const menu = document.getElementById("dropdownMenu");
  if (window.innerWidth >= 768) {
    menu.classList.remove("active");
  }
});

// 모바일: 링크 누르면 메뉴 닫기
document.querySelectorAll(".topnav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      document.getElementById("dropdownMenu").classList.remove("active");
    }
  });
});
