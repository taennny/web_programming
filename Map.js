let map;
let markers = [];
let service;
let selectedPlace = null;

// Google Maps API 로드 후 호출될 전역 콜백 함수
window.initMap = function () {
  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  map = new google.maps.Map(mapElement, {
    center: { lat: 37.5665, lng: 126.978 },
    zoom: 14,
  });

  service = new google.maps.places.PlacesService(map);
};

// 지도 생성 및 검색 실행 함수 (대면 클릭 시 실행됨)
function initMapAndSearch(keyword = "스터디카페") {
  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  map = new google.maps.Map(mapElement, {
    center: { lat: 37.5665, lng: 126.978 },
    zoom: 14,
  });

  service = new google.maps.places.PlacesService(map);
  searchPlaces(keyword);
}

// 장소 검색
function searchPlaces(keyword) {
  if (!service) return;

  const request = {
    location: map.getCenter(),
    radius: 1500,
    keyword,
  };

  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      clearMarkers();

      results.forEach((place) => {
        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
          title: place.name,
        });

        marker.addListener("click", () => {
          selectedPlace = {
            name: place.name,
            address: place.vicinity || place.formatted_address,
          };

          const nameEl = document.getElementById("place-name");
          const addrEl = document.getElementById("place-address");
          const detailsEl = document.getElementById("place-details");

          if (nameEl && addrEl && detailsEl) {
            nameEl.textContent = selectedPlace.name;
            addrEl.textContent = selectedPlace.address;
            detailsEl.style.display = "block";
          }
        });

        markers.push(marker);
      });
    }
  });
}

// 기존 마커 제거
function clearMarkers() {
  markers.forEach((m) => m.setMap(null));
  markers = [];
}

// Zoom 관련 기능
function openZoomCreation() {
  window.open("https://zoom.us/start/videomeeting", "_blank");
}

function showJoinSection() {
  const section = document.getElementById("zoomJoinSection");
  if (section) section.style.display = "block";
}

function joinZoomMeeting() {
  const link = document.getElementById("zoomJoinLink").value.trim();
  if (!link.startsWith("http")) {
    alert("유효한 Zoom 회의 링크를 입력해주세요.");
    return;
  }
  const summary = "💻 Zoom 회의 링크: " + link;
  localStorage.setItem("meetingLocation", summary);
  alert("Zoom 링크가 저장되었습니다:\n" + summary);
  window.open(link, "_blank");
}

// 로그아웃
function logout() {
  localStorage.removeItem("user");
  location.reload();
}

// DOM 로드 완료 후 실행
document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("user");
  const topArea = document.getElementById("auth-buttons");
  if (topArea) {
    topArea.innerHTML =
      username && username !== "null"
        ? `<span>${username}님 환영합니다</span>
           <button onclick="logout()">로그아웃</button>`
        : `<button onclick="window.location.href='login.html'">로그인</button>`;
  }

  // 회의 방식 선택
  document.querySelectorAll('input[name="meetingType"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      const zoomBox = document.getElementById("zoomActions");
      const mapEl = document.getElementById("offline-options");

      if (!zoomBox || !mapEl) return;

      if (this.value === "online") {
        zoomBox.style.display = "block";
        mapEl.style.display = "none";
        localStorage.setItem("meetingLocation", "💻 비대면 회의 (Zoom)");
      } else {
        zoomBox.style.display = "none";
        mapEl.style.display = "block";
        setTimeout(() => {
          initMapAndSearch(); // 지도 초기화는 display: block 된 후!
        }, 100);
        localStorage.setItem("meetingLocation", "📍 대면 회의 (스터디카페)");
        initMapAndSearch(); // 지도 생성
      }
    });
  });

  // 장소 검색 버튼
  const searchBtn = document.getElementById("search-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const keyword = document.getElementById("place-input").value.trim();
      if (keyword) searchPlaces(keyword);
    });
  }

  // 장소 검색 엔터 입력
  const inputEl = document.getElementById("place-input");
  if (inputEl) {
    inputEl.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchPlaces(e.target.value.trim());
      }
    });
  }

  // 장소 저장 버튼
  const saveBtn = document.getElementById("save-place-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      if (selectedPlace) {
        localStorage.setItem(
          "selectedMeetingPlace",
          JSON.stringify(selectedPlace)
        );
        alert(`${selectedPlace.name} 저장되었습니다!`);
      }
    });
  }
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
localStorage.setItem(
  "selectedMeetingPlace",
  JSON.stringify({
    name: place.name,
    address: place.vicinity || place.formatted_address,
  })
);
