import axios from 'axios';

// DOM 요소 선택 및 이벤트 리스너 추가
const form = document.querySelector('.form-data');
const regionInputs = [
  document.querySelector('#region1'),
  document.querySelector('#region2'),
  document.querySelector('#region3')
];
const apiKeyInput = document.querySelector('#api');
const errors = document.querySelector('.errors');
const loading = document.querySelector('.loading');
const resultContainers = [
  document.querySelector('#result1'),
  document.querySelector('#result2'),
  document.querySelector('#result3')
];
const clearBtn = document.querySelector('.clear-btn');

// 개별 결과를 HTML 형식으로 구성하는 함수
const displayCarbonUsage = async (apiKey, region, resultContainer) => {
  try {
    console.log("Attempting to fetch data for region:", region); // 디버깅용 로그
    const response = await axios.get('https://api.co2signal.com/v1/latest', {
      params: { countryCode: region },
      headers: { 'auth-token': apiKey }
    });

    const CO2 = Math.floor(response.data.data.carbonIntensity);
    const fossilFuelPercentage = response.data.data.fossilFuelPercentage !== null
      ? response.data.data.fossilFuelPercentage.toFixed(2)
      : "N/A";

    // 개별 결과 표시
    resultContainer.innerHTML = `
      <div>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Carbon Usage:</strong> ${Math.round(CO2)} grams (grams CO2 emitted per kilowatt hour)</p>
        <p><strong>Fossil Fuel Percentage:</strong> ${fossilFuelPercentage}% (percentage of fossil fuels used to generate electricity)</p>
      </div>
    `;
    console.log("Result displayed successfully for region:", region); // 디버깅용 로그

  } catch (error) {
    console.error(`Error fetching data for ${region}:`, error); // 오류 로그
    errors.textContent = `Sorry, we have no data for ${region} or the API key is invalid.`;
    errors.style.display = 'block';
    resultContainer.innerHTML = '';
  }
};

// 제출 이벤트 핸들러
function handleSubmit(e) {
  e.preventDefault();
  
  console.log("Form submitted"); // 제출 확인
  
  const apiKey = apiKeyInput.value;
  loading.style.display = 'block';
  errors.style.display = 'none';
  resultContainers.forEach(container => container.innerHTML = ''); // 이전 결과 초기화

  // 모든 입력 필드를 비활성화
  regionInputs.forEach(input => {
    input.disabled = true; // 입력창 비활성화
  });
  apiKeyInput.disabled = true; // API 키 입력창도 비활성화
  form.style.display = 'none';

  regionInputs.forEach((input, index) => {
    const region = input.value;
    console.log(`Processing region: ${region}`); // 각 지역 코드 확인
    if (region) {
      displayCarbonUsage(apiKey, region, resultContainers[index]); // 각 지역에 대해 API 요청 및 결과 표시
    }
  });

  loading.style.display = 'none';
  console.log("Loading hidden, result displayed"); // 로딩 화면 종료 확인
}



// 초기화 함수
function init() {
  form.style.display = 'block';
  loading.style.display = 'none';
  clearBtn.style.display = 'none';
  errors.textContent = '';
  resultContainers.forEach(container => container.innerHTML = ''); // 결과 창 초기화
}

// 초기화 및 이벤트 리스너 설정
form.addEventListener('submit', handleSubmit);
clearBtn.addEventListener('click', (e) => {
  e.preventDefault();
  init();
});
init();

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'updateIcon') {
    let iconSizes = [16, 32, 48, 128];
    let imageDataDict = {};
    iconSizes.forEach((size) => {
      imageDataDict[size] = drawIcon(msg.value.color, size);
    });
    chrome.action.setIcon({ imageData: imageDataDict });
  }
});

