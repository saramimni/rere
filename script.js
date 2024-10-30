// NEIS API 호출에 필요한 기본 URL 및 학교 정보
const baseUrl = "https://open.neis.go.kr/hub/mealServiceDietInfo";
const officeCode = "J10"; // 교육청 코드
const schoolCode = "7530475"; // 학교 코드

async function fetchMealData() {
    const mealInfoDiv = document.getElementById("meal-info");

    // 오늘 날짜를 YYYYMMDD 형식으로 생성
    const today = new Date().toISOString().split('T')[0].replace(/-/g, "");
    const apiUrl = `${baseUrl}?ATPT_OFCDC_SC_CODE=${officeCode}&SD_SCHUL_CODE=${schoolCode}&MLSV_YMD=${today}&Type=json`;

    try {
        const response = await fetch(apiUrl);

        // 응답 상태 코드 확인
        if (!response.ok) throw new Error(`급식 데이터를 불러오지 못했습니다. 상태 코드: ${response.status}`);

        const data = await response.json();
        console.log("API 응답 데이터:", data); // API 응답 데이터 확인용

        // 데이터 구조 확인 및 급식 정보 파싱
        if (data.mealServiceDietInfo && data.mealServiceDietInfo[1].row) {
            const mealInfo = data.mealServiceDietInfo[1].row[0];
            const dishes = mealInfo.DDISH_NM.split("<br/>");

            // 급식 메뉴 항목들을 각각 표시
            const breakfast = dishes[0] || "아침 급식 정보 없음";
            const lunch = dishes[1] || "점심 급식 정보 없음";
            const dinner = dishes[2]|| "저녁 급식 정보 없음";
            const dinnr = dishes[3]
            const dnner = dishes[4]
            const dinne = d ishes[5]
            const inner = dishes[6]

            mealInfoDiv.innerHTML = `
                <div class="meal-item"><span>1:</span> ${breakfast}</div>
                <div class="meal-item"><span>2:</span> ${lunch}</div>
                <div class="meal-item"><span>3:</span> ${dinner}</div>
                <div class="meal-item"><span>4:</span> ${dinnr}</div>
                <div class="meal-item"><span>5:</span> ${dnner}</div>
                <div class="meal-item"><span>6:</span> ${dinne}</div>
                <div class="meal-item"><span>7:</span> ${inner}</div>
            `;
        } else {
            throw new Error("오늘 급식 정보가 없습니다.");
        }

    } catch (error) {
        mealInfoDiv.innerHTML = `<p>에러: ${error.message}</p>`;
        console.error("급식 정보 로드 오류:", error);
    }
}

// 페이지 로드 시 급식 정보 가져오기
fetchMealData();
