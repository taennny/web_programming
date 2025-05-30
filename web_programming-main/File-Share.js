// D-DAY 계산 함수
function getDdayLabel(deadlineStr) {
  const today = new Date();
  const deadline = new Date(deadlineStr);

  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const deadlineDate = new Date(
    deadline.getFullYear(),
    deadline.getMonth(),
    deadline.getDate()
  );

  const diffTime = deadlineDate - todayDate;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `D-${diffDays}`;
  else if (diffDays === 0) return `D-DAY`;
  else return `D+${Math.abs(diffDays)}`;
}

const form = document.getElementById("uploadForm");
const fileList = document.getElementById("fileList");

// ✅ 저장 키를 전체요약과 맞추기 위해 fileShare로 변경
let files = JSON.parse(localStorage.getItem("fileShare") || "[]");

function saveFiles() {
  localStorage.setItem("fileShare", JSON.stringify(files));
}

function renderFiles() {
  fileList.innerHTML = "";
  files.forEach((file, index) => {
    const ddayLabel = getDdayLabel(file.date); // ✅ 속성명 변경: deadline → date
    const card = document.createElement("div");
    card.className = "material-card";
    card.innerHTML = `
              <div class="card-header">
                <div class="card-title-wrapper">
                  <h3 class="card-title">🗂 ${file.title}</h3>
                </div>
                <button class="delete-btn" onclick="deleteFile(${index})">❌</button>
              </div>
              <p class="card-meta">마감: ${
                file.date
              } <span class="dday">(${ddayLabel})</span></p>
              <a href="${
                file.link
              }" target="_blank" class="link-btn">🔗 Drive 링크 열기</a>
              <p class="card-desc">📝 ${file.desc || "설명 없음"}</p>
            `;
    fileList.appendChild(card);
  });
}

window.deleteFile = function (i) {
  if (confirm("이 자료를 삭제할까요?")) {
    files.splice(i, 1);
    saveFiles();
    renderFiles();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const date = document.getElementById("deadline").value;
  const link = document.getElementById("link").value;
  const desc = document.getElementById("comment").value;

  // ✅ 저장 형식 맞춤
  files.push({ title, date, link, desc });

  saveFiles();
  renderFiles();
  form.reset();
});

renderFiles();

const username = localStorage.getItem("user");
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
