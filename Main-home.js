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
