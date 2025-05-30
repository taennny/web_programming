const members = [];
function addMember() {
  const input = document.getElementById("member-input");
  const value = input.value.trim();
  if (!value || members.includes(value)) return;
  members.push(value);
  input.value = "";
  renderMembers();
}
function renderMembers() {
  const ul = document.getElementById("member-list");
  ul.innerHTML = members.map((m) => `<li>👤 ${m}</li>`).join("");
}
function generateLink() {
  const owner = document.getElementById("owner-input").value.trim();
  if (!owner) return alert("닉네임을 입력하세요");
  const code = Math.random().toString(36).substring(2, 8);
  const link = `${location.origin}${location.pathname}?code=${code}`;
  document.getElementById("share-link").textContent = link;
  navigator.clipboard.writeText(link).then(() => {
    alert("초대 링크가 복사되었습니다.");
  });
  localStorage.setItem(`group_${code}`, JSON.stringify({ owner, members }));
}
function goToSchedule() {
  const owner = document.getElementById("owner-input").value.trim();
  if (!owner) {
    alert("닉네임을 입력하세요");
    return;
  }
  const linkText = document.getElementById("share-link").textContent;
  const code = linkText.includes("code=") ? linkText.split("code=")[1] : null;
  if (!code) {
    alert("먼저 초대 링크를 생성해주세요.");
    return;
  }
  location.href = `group-schedule.html?code=${code}&user=${encodeURIComponent(
    owner
  )}`;
}
function goHome() {
  location.href = "program.html";
}
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
