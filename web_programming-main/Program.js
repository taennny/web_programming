function updateTodoDday(input) {
  const date = new Date(input.value);
  const today = new Date();
  const diff = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
  const dday = diff >= 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;
  input.nextElementSibling.textContent = dday;
}

function addRow() {
  const tbody = document.querySelector("#role-table tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
        <td><input type="text" placeholder="팀원 이름" /></td>
        <td><input type="text" placeholder="역할 입력" /></td>
        <td>
          <div class="todo-list">
            <div class="todo-item">
              <input type="checkbox" />
              <input type="text" placeholder="작업 내용" />
              <input type="date" onchange="updateTodoDday(this)" />
              <span class="todo-dday"></span>
            </div>
          </div>
          <button class="add-todo-btn" onclick="addTodo(this)">+ 할 일 추가</button>
        </td>
        <td><input type="text" placeholder="메모를 입력하세요" /></td>
        
      `;
  tbody.appendChild(row);
}

function addTodo(button) {
  const list = button.previousElementSibling;
  const item = document.createElement("div");
  item.className = "todo-item";
  item.innerHTML = `
        <input type="checkbox" />
        <input type="text" placeholder="작업 내용" />
        <input type="date" onchange="updateTodoDday(this)" />
        <span class="todo-dday"></span>
      `;
  list.appendChild(item);
}

function extractRoleSummaryFromInputs() {
  const table = document.querySelector("#role-table");
  const rows = table.querySelectorAll("tbody tr");
  const data = [];

  rows.forEach((row) => {
    const name = row.querySelector("td:nth-child(1) input")?.value || "";
    const role = row.querySelector("td:nth-child(2) input")?.value || "";
    const todos = row.querySelectorAll(".todo-item");
    const memo = row.querySelector("td:nth-child(4) input")?.value || "";

    todos.forEach((todo) => {
      const task = todo.querySelector('input[type="text"]')?.value || "";
      const date = todo.querySelector('input[type="date"]')?.value || "";
      data.push({ team: name, role, task, dday: date, memo });
    });
  });

  localStorage.setItem("roleSummary", JSON.stringify(data));
  alert("역할 분담이 저장되었습니다.");
}
function groupByPersonAndRole(data) {
  const grouped = {};
  data.forEach((item) => {
    const key = `${item.team}__${item.role}__${item.memo || ""}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push({ task: item.task, dday: item.dday });
  });
  return grouped;
}

function groupByPersonAndRole(data) {
  const grouped = {};
  data.forEach((item) => {
    const key = `${item.team}__${item.role}__${item.memo || ""}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push({ task: item.task, dday: item.dday });
  });
  return grouped;
}

function loadSavedRoles() {
  const data = JSON.parse(localStorage.getItem("roleSummary") || "[]");
  const tbody = document.querySelector("#role-table tbody");
  if (!tbody || data.length === 0) return;

  tbody.innerHTML = "";

  const grouped = groupByPersonAndRole(data);
  Object.entries(grouped).forEach(([key, todos]) => {
    const [team, role, memo] = key.split("__");
    const tr = document.createElement("tr");
    const todoItemsHtml = todos
      .map(
        (t) => `
        <div class="todo-item">
          <input type="checkbox" />
          <input type="text" value="${t.task}" />
          <input type="date" value="${t.dday}" />
        </div>`
      )
      .join("");

    tr.innerHTML = `
        <td><input type="text" value="${team}" /></td>
        <td><input type="text" value="${role}" /></td>
        <td>
          <div class="todo-list">${todoItemsHtml}</div>
          <button class="add-todo-btn" onclick="addTodo(this)">+ 할 일 추가</button>
        </td>
        <td><input type="text" value="${memo}" /></td>
      `;
    tbody.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded", loadSavedRoles);

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
document.addEventListener("DOMContentLoaded", loadSavedRoles);
let prevScroll = window.scrollY;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > prevScroll) {
    // 아래로 스크롤 시 숨김
    header.style.top = "-60px";
  } else {
    // 위로 스크롤 시 다시 표시
    header.style.top = "0";
  }

  prevScroll = currentScroll;
});
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
