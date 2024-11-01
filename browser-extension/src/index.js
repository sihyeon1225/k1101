// Form fields and result elements
const form = document.querySelector('.form-data');
const region = document.querySelector('.region-name');
const apiKey = document.querySelector('.api-key');
const errors = document.querySelector('.errors');
const loading = document.querySelector('.loading');
const result = document.querySelector('.result'); // 결과 영역
const results = document.querySelector('.result-container');
const usage = document.querySelector('.carbon-usage');
const fossilfuel = document.querySelector('.fossil-fuel');
const myregion = document.querySelector('.my-region');
const clearBtn = document.querySelector('.clear-btn');

// Event listeners
form.addEventListener('submit', (e) => handleSubmit(e));
clearBtn.addEventListener('click', (e) => reset(e));
init();

function init() {
  // 초기 상태 설정: 입력 필드 초기화
  form.style.display = 'block';
  result.style.display = 'none'; // 결과 화면 숨기기
  loading.style.display = 'none'; // 로딩 숨기기
  clearBtn.style.display = 'none'; // 초기에는 Clear 버튼 숨기기
  errors.textContent = ''; // 에러 메시지 초기화
}

function reset(e) {
  e.preventDefault();
  init(); // 초기화 함수 호출
}

function handleSubmit(e) {
  e.preventDefault();
  
  // 입력값이 "jeju"와 "asd"인지 확인
  if (region.value === "jeju" && apiKey.value === "asd") {
    // 조건이 맞으면 결과 화면 표시 함수 호출
    displayCarbonUsage(region.value);
  } else {
    // 조건이 맞지 않으면 에러 메시지 표시
    errors.textContent = "Invalid region or API key. Please enter 'jeju' for region and 'asd' for API key to proceed.";
    errors.style.display = 'block';
  }
}

function displayCarbonUsage(regionName) {
  // 로딩 없이 결과 화면 바로 표시

  // 예시 데이터로 결과 화면 표시
  myregion.textContent = regionName;
  usage.textContent = "123 kg CO2"; 
  fossilfuel.textContent = "45%";

  result.style.display = 'block'; // 결과 화면 보이기
  form.style.display = 'none'; // 폼 숨기기
}
