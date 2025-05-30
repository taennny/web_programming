document.addEventListener("DOMContentLoaded", () => {
  loadRoleSummary();
  loadMeetingTime();
  loadMeetingPlace();
  renderGreeting();
});

// 1. 역할 분담 정보 불러오기
function loadRoleSummary() {
  const data = JSON.parse(localStorage.getItem("roleSummary") || "[]");
  const tbody = document.querySelector("#role-summary");
  if (!tbody) return;

  tbody.innerHTML = "";
  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5">데이터 없음</td></tr>';
    return;
  }

  let lastTeam = "";
  let lastRole = "";

  data.forEach((item) => {
    const isFirstOfGroup = item.team !== lastTeam || item.role !== lastRole;
    lastTeam = item.team;
    lastRole = item.role;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${isFirstOfGroup ? item.team : ""}</td>
      <td>${isFirstOfGroup ? item.role : ""}</td>
      <td>${item.task}</td>
      <td>${item.dday}</td>
      <td>${item.memo}</td>
    `;
    tbody.appendChild(tr);
  });
}

// 2. 회의 시간 요약 불러오기
function loadMeetingTime() {
  // 회의 일정 요약 가져오기
  const scheduleSummary = localStorage.getItem("meetingSchedule");

  const scheduleTarget = document.getElementById("schedule-summary");
  if (scheduleTarget && scheduleSummary) {
    scheduleTarget.textContent = scheduleSummary;
  }
}

// 3. 회의 장소 요약 불러오기
function loadMeetingPlace() {
  const place = JSON.parse(
    localStorage.getItem("selectedMeetingPlace") || "null"
  );
  const el = document.getElementById("location-summary");
  if (el) {
    if (place?.name && place?.address) {
      el.textContent = `📍 ${place.name} (${place.address})`;
    } else {
      el.textContent = "📍 회의 장소가 선택되지 않았습니다.";
    }
  }
}

// 4. 사용자 정보 표시
function renderGreeting() {
  const username = localStorage.getItem("user");
  const topArea = document.getElementById("auth-buttons");

  if (topArea) {
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
  }
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}

// 페이지 로드 시 데이터 불러오기
document.addEventListener("DOMContentLoaded", loadRoleSummary);
// 장소 불러오기
// 장소 불러오기
const place = JSON.parse(localStorage.getItem("selectedMeetingPlace"));
if (place) {
  document.getElementById(
    "location-summary"
  ).textContent = `📍 ${place.name} (${place.address})`;
}

function toggleMenu() {
  const menu = document.getElementById("dropdownMenu");
  menu.classList.toggle("active");
}

// 창이 커질 때 active 클래스 제거 (메뉴 고정용)
window.addEventListener("resize", () => {
  const menu = document.getElementById("dropdownMenu");
  if (window.innerWidth >= 768) {
    menu.classList.remove("active");
  }
});
document.querySelectorAll(".topnav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      document.getElementById("dropdownMenu").classList.remove("active");
    }
  });
});
