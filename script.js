let answers = {}; // Store answers indexed by question
let currentQuestionIndex = 0; // 현재 질문의 인덱스를 추적
let currentDimensionIndex = 0; // 현재 카테고리의 인덱스를 추적


// 질문 배열을 정의
const userSessions = {};

const answerScores = {
    "매우 그렇다": 5,
    "그렇다": 4,
    "보통이다": 3,
    "아니다": 2,
    "매우 아니다": 1
};

const questions = {
    E: [
        "조용하고 한적한 장소보다 시끌벅적 핫한 장소에서의 데이트를 선호한다.",
        "개인의 시간보다 연인과 함께하는 시간 더 소중하다."
    ],
    I: [
        "연인의 친구를 소개받는 자리가 조금 불편하다.",
        "연인에게 적극적으로 마음을 표현하기보다는 은은하게 뒤에서 챙겨준다."
    ],
   
    T: [
        "연인과의 다툼 중 의견이 다를 때 상대가 인정할 만한 근거를 제시하며 설득한다. ",
        "연애 초반에 마음과는 달리 감정 표현이 서툰 편이다."
    ],
    F: [
        "연인이 조별 과제로 힘들어할 때 원인 분석보다 위로를 우선시한다.",
        "기념일 선물로 상대에게 필요한 실용적인 선물보다는 정성이 들어간 이벤트를 선호한다."
    ],
   
    J: ["연인과 여행을 갈 때, 출발부터 돌아오는 날까지 모든 일정을 계획한다.",
        "내일이 시험인데 보고 싶어서 집 앞으로 왔다는 애인이 불편하다." ],
        
    P: ["자유롭고 즉흥적인 데이트를 선호한다.",
        "잔잔한 연애보다는 다이나믹한 연애를 선호한다."]
};


const dimensions = ["E", "I", "T", "F", "J", "P"];

function displayQuestion(questionText) {
  const questionElement = document.getElementById("question");
  if (questionElement) {
    questionElement.textContent = questionText;
  }
}

function startTest() {
  document.querySelector(".start-section").style.display = "none";
  document.querySelector(".question-section").style.display = "block";

  // 첫 번째 카테고리의 첫 번째 질문을 표시
  displayQuestion(questions[dimensions[currentDimensionIndex]][currentQuestionIndex]);
}

function submitAnswer(answer) {
  const currentDimension = dimensions[currentDimensionIndex];
  
  if (!answers[currentDimension]) {
    answers[currentDimension] = 0;
  }

  answers[currentDimension] += answerScores[answer];
  nextQuestion();
}

function nextQuestion() {
  if (currentQuestionIndex < questions[dimensions[currentDimensionIndex]].length - 1) {
    currentQuestionIndex++;
    displayQuestion(questions[dimensions[currentDimensionIndex]][currentQuestionIndex]);
  } else if (currentDimensionIndex < dimensions.length - 1) {
    currentDimensionIndex++;
    currentQuestionIndex = 0;
    displayQuestion(questions[dimensions[currentDimensionIndex]][currentQuestionIndex]);
  } else {
    displayResults(answers);
  }
}




function restartTest() {
  document.querySelector(".start-section").style.display = "block";
  document.querySelector(".question-section").style.display = "none";
  questionHistory = [];
  answers = {};
}

function displayResults(scores) {
  const personality = calculatePersonality(scores);
  const peperoResult = getPeperoTypeAndDescription(personality); // 빼빼로 유형과 설명을 얻음
  const name = document.getElementById("name").value;
  const resultHeading = document.getElementById("result-heading");
  const resultDescription = document.getElementById("result-description");

  resultHeading.textContent = `${name}님! 결과가 나왔어요! 당신의 빼빼로 유형은 "${peperoResult.type}" 입니다.`;
  resultDescription.textContent = peperoResult.description;

  document.querySelector(".question-section").style.display = "none";
  document.getElementById("results").style.display = "block";
}


function calculatePersonality(scores) {
  let personality = "";

  personality += scores.E > scores.I ? "E" : "I";
  personality += Math.random() < 0.5 ? "S" : "N"; 
  personality += scores.T > scores.F ? "T" : "F";
  personality += scores.J > scores.P ? "J" : "P";

  return personality;
}

// 빼빼로 유형과 설명을 반환하는 함수
function getPeperoTypeAndDescription(personality) {
  const peperoTypes = {
    ENFP: {
      type: "누드빼빼로",
      description:
        "누드빼빼로는 외향적이고 창의적인 성격을 가진 사람들에게 어울립니다.",
    },
    ISTJ: {
      type: "아몬드빼빼로",
      description:
        "아몬드빼빼로는 내향적이고 실용적인 성격을 가진 사람들에게 어울립니다.",
    },
    // 여기에 다른 유형들을 추가할 수 있습니다.
  };

  return (
    peperoTypes[personality] || {
      type: "기본 빼빼로",
      description: "기본 빼빼로는 모든 성격 유형에게 잘 어울립니다.",
    }
  ); // 만약 해당 유형이 정의되지 않았다면 기본값을 반환
}

function openResultInNewWindow(resultString) {
  const newWindow = window.open("", "_blank");
  newWindow.document.write(resultString);
  newWindow.document.close();
}
