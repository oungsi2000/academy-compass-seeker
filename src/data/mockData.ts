export interface Academy {
  id: number;
  name: string;
  description: string;
  rating: number;
  location: string;
  district: string;
  subjects: string[];
  teachers: Teacher[];
  reviews: Review[];
  curriculum: string[];
  studentCount: number;
  address: string;
  facilities: string[];
  events: string[];
  phone: string;
  image: string;
  registrationFee: number;
  type: "단과" | "종합";
  categories: string[];
}

export interface Teacher {
  id: number;
  name: string;
  major: string;
  experience: string;
  specialties: string[];
  image: string;
}

export interface Review {
  id: number;
  studentName: string;
  rating: number;
  content: string;
  date: string;
}

export interface AdmissionNews {
  id: number;
  title: string;
  summary: string;
  date: string;
  category: string;
}

export interface UniversityInfo {
  id: number;
  university: string;
  department: string;
  type: string;
  period: string;
  region: string;
  quota: number;
  requirements: string[];
  examElements: { [key: string]: number };
  expectedGrade: { average: number; min: number; max: number };
  lastYearGrade: { average: number; min: number; max: number };
}

export const mockAcademies: Academy[] = [
  {
    id: 1,
    name: "강남 엘리트 국어학원",
    description: "수능 국어 전문 학원으로 문학, 비문학 완벽 대비",
    rating: 4.8,
    location: "강남구 역삼동",
    district: "강남구",
    subjects: ["국어", "문학", "비문학", "문법"],
    registrationFee: 350000,
    type: "단과",
    categories: ["논술", "내신"],
    teachers: [
      {
        id: 1,
        name: "김문학",
        major: "국어국문학과",
        experience: "15년",
        specialties: ["현대문학", "고전문학"],
        image: "/placeholder.svg"
      },
      {
        id: 2,
        name: "이비문",
        major: "국어교육과",
        experience: "12년",
        specialties: ["비문학", "독서"],
        image: "/placeholder.svg"
      }
    ],
    reviews: [
      {
        id: 1,
        studentName: "정용준",
        rating: 5,
        content: "선생님들이 정말 친절하시고 설명도 쉽게 해주세요. 국어 성적이 많이 올랐어요!",
        date: "2024-06-15"
      },
      {
        id: 2,
        studentName: "김학생",
        rating: 4,
        content: "커리큘럼이 체계적이고 모의고사 대비도 잘 되어있습니다.",
        date: "2024-06-10"
      }
    ],
    curriculum: [
      "1단계: 기본 문법 및 어휘 학습",
      "2단계: 문학 작품 분석 및 해석",
      "3단계: 비문학 독해 기법 습득",
      "4단계: 실전 모의고사 및 피드백"
    ],
    studentCount: 120,
    address: "서울시 강남구 역삼동 123-45",
    facilities: ["개별 자습실", "그룹 스터디룸", "휴게실", "상담실"],
    events: ["신규 등록 20% 할인", "친구 추천 시 5만원 할인"],
    phone: "02-1234-5678",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "서초 수학의 달인",
    description: "개념부터 심화까지 단계별 수학 완성",
    rating: 4.7,
    location: "서초구 서초동",
    district: "서초구",
    subjects: ["수학", "수학1", "수학2", "미적분", "확률과 통계"],
    registrationFee: 400000,
    type: "단과",
    categories: ["모의고사", "내신"],
    teachers: [
      {
        id: 3,
        name: "박수학",
        major: "수학교육과",
        experience: "18년",
        specialties: ["미적분", "확률과 통계"],
        image: "/placeholder.svg"
      }
    ],
    reviews: [
      {
        id: 3,
        studentName: "이수학",
        rating: 5,
        content: "어려운 개념도 쉽게 설명해주시고 문제 풀이가 정말 좋아요!",
        date: "2024-06-20"
      }
    ],
    curriculum: [
      "1단계: 기본 개념 정립",
      "2단계: 유형별 문제 해결",
      "3단계: 심화 응용 문제",
      "4단계: 실전 문제 및 오답 분석"
    ],
    studentCount: 85,
    address: "서울시 서초구 서초동 456-78",
    facilities: ["개별 자습실", "질문방", "컴퓨터실"],
    events: ["여름방학 특강 30% 할인"],
    phone: "02-2345-6789",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "종로 영어 마스터",
    description: "내신부터 수능까지 영어 완벽 마스터",
    rating: 4.6,
    location: "종로구 종로1가",
    district: "종로구",
    subjects: ["영어", "영문법", "영어독해", "영작문"],
    registrationFee: 320000,
    type: "종합",
    categories: ["논술", "내신", "모의고사"],
    teachers: [
      {
        id: 4,
        name: "최영어",
        major: "영어영문학과",
        experience: "20년",
        specialties: ["문법", "독해"],
        image: "/placeholder.svg"
      }
    ],
    reviews: [
      {
        id: 4,
        studentName: "김영어",
        rating: 4,
        content: "영문법 기초부터 탄탄하게 다져주셔서 좋았습니다.",
        date: "2024-06-18"
      }
    ],
    curriculum: [
      "1단계: 기초 문법 완성",
      "2단계: 독해 스킬 향상",
      "3단계: 듣기 및 말하기",
      "4단계: 실전 모의고사"
    ],
    studentCount: 95,
    address: "서울시 종로구 종로1가 789-12",
    facilities: ["멀티미디어실", "회화 전용실", "자습실"],
    events: ["개강 기념 교재비 무료"],
    phone: "02-3456-7890",
    image: "/placeholder.svg"
  }
];

export const mockAdmissionNews: AdmissionNews[] = [
  {
    id: 1,
    title: "2025학년도 대학수학능력시험 시행계획 발표",
    summary: "교육부가 2025학년도 수능 시행계획을 발표했습니다. 출제 방향과 주요 변경사항을 확인하세요.",
    date: "2024-06-25",
    category: "수능"
  },
  {
    id: 2,
    title: "주요 대학 2025학년도 수시모집 요강 공개",
    summary: "SKY 대학을 포함한 주요 대학들의 수시모집 요강이 공개되었습니다.",
    date: "2024-06-22",
    category: "수시"
  },
  {
    id: 3,
    title: "학생부종합전형 평가 요소 및 준비 방법",
    summary: "학생부종합전형의 주요 평가 요소와 효과적인 준비 방법을 안내합니다.",
    date: "2024-06-20",
    category: "학종"
  }
];

export const mockUniversityInfo: UniversityInfo[] = [
  {
    id: 1,
    university: "서울대학교",
    department: "경영학과",
    type: "학생부종합전형",
    period: "2024.09.09 ~ 2024.09.12",
    region: "서울",
    quota: 50,
    requirements: ["학생부종합", "면접"],
    examElements: { "국어": 25, "수학": 35, "영어": 25, "탐구": 15 },
    expectedGrade: { average: 1.2, min: 1.0, max: 1.8 },
    lastYearGrade: { average: 1.1, min: 1.0, max: 1.5 }
  },
  {
    id: 2,
    university: "서울대학교",
    department: "경영학과",
    type: "지역균형선발전형",
    period: "2024.09.09 ~ 2024.09.12",
    region: "서울",
    quota: 15,
    requirements: ["학생부종합", "면접"],
    examElements: { "국어": 30, "수학": 40, "영어": 20, "탐구": 10 },
    expectedGrade: { average: 1.5, min: 1.2, max: 2.0 },
    lastYearGrade: { average: 1.3, min: 1.1, max: 1.8 }
  },
  {
    id: 3,
    university: "연세대학교",
    department: "경영학과",
    type: "학생부종합전형",
    period: "2024.09.06 ~ 2024.09.10",
    region: "서울",
    quota: 80,
    requirements: ["학생부종합", "면접"],
    examElements: { "국어": 30, "수학": 30, "영어": 25, "탐구": 15 },
    expectedGrade: { average: 1.8, min: 1.4, max: 2.5 },
    lastYearGrade: { average: 1.6, min: 1.3, max: 2.2 }
  },
  {
    id: 4,
    university: "연세대학교",
    department: "경영학과",
    type: "논술전형",
    period: "2024.09.06 ~ 2024.09.10",
    region: "서울",
    quota: 30,
    requirements: ["논술", "학생부교과"],
    examElements: { "논술": 60, "학생부": 40 },
    expectedGrade: { average: 2.0, min: 1.5, max: 2.8 },
    lastYearGrade: { average: 1.9, min: 1.4, max: 2.5 }
  },
  {
    id: 5,
    university: "고려대학교",
    department: "경영학과",
    type: "학생부종합전형",
    period: "2024.09.06 ~ 2024.09.10",
    region: "서울",
    quota: 100,
    requirements: ["학생부종합", "면접"],
    examElements: { "국어": 25, "수학": 35, "영어": 25, "탐구": 15 },
    expectedGrade: { average: 2.2, min: 1.8, max: 3.0 },
    lastYearGrade: { average: 2.0, min: 1.6, max: 2.8 }
  }
];

export const mockUniversityProgramInfo = [
  {
    id: 1,
    university: "서울대학교",
    department: "경영학과",
    program: "학생부종합전형",
    type: "수시",
    quota: 25,
    expectedGrade: { average: 1.2, min: 1.0, max: 1.5 },
    lastYearGrade: { average: 1.3, min: 1.1, max: 1.6 },
    examElements: { "국어": 20, "수학": 30, "영어": 20, "탐구": 20, "기타": 10 },
    period: "2024.09.09 - 2024.09.13",
    region: "서울",
    requirements: ["학생부", "자기소개서", "면접"]
  },
  {
    id: 2,
    university: "연세대학교",
    department: "경제학과",
    program: "활동우수형",
    type: "수시",
    quota: 30,
    expectedGrade: { average: 1.4, min: 1.2, max: 1.7 },
    lastYearGrade: { average: 1.5, min: 1.3, max: 1.8 },
    examElements: { "국어": 25, "수학": 25, "영어": 25, "탐구": 20, "기타": 5 },
    period: "2024.09.11 - 2024.09.15",
    region: "서울",
    requirements: ["학생부", "자기소개서", "추천서"]
  },
  {
    id: 3,
    university: "고려대학교",
    department: "법학과",
    program: "일반전형",
    type: "정시",
    quota: 40,
    expectedGrade: { average: 1.6, min: 1.3, max: 2.0 },
    lastYearGrade: { average: 1.7, min: 1.4, max: 2.1 },
    examElements: { "국어": 30, "수학": 30, "영어": 20, "탐구": 20 },
    period: "2024.12.23 - 2024.12.28",
    region: "서울",
    requirements: ["수능", "학생부"]
  },
  {
    id: 4,
    university: "성균관대학교",
    department: "컴퓨터공학과",
    program: "성균인재전형",
    type: "수시",
    quota: 35,
    expectedGrade: { average: 1.8, min: 1.5, max: 2.2 },
    lastYearGrade: { average: 1.9, min: 1.6, max: 2.3 },
    examElements: { "국어": 15, "수학": 40, "영어": 20, "탐구": 20, "기타": 5 },
    period: "2024.09.06 - 2024.09.10",
    region: "서울",
    requirements: ["학생부", "자기소개서", "면접"]
  },
  {
    id: 5,
    university: "서울대학교",
    department: "컴퓨터공학과",
    program: "일반전형",
    type: "정시",
    quota: 20,
    expectedGrade: { average: 1.1, min: 1.0, max: 1.3 },
    lastYearGrade: { average: 1.2, min: 1.0, max: 1.4 },
    examElements: { "국어": 20, "수학": 35, "영어": 20, "탐구": 25 },
    period: "2024.12.23 - 2024.12.28",
    region: "서울",
    requirements: ["수능"]
  },
  {
    id: 6,
    university: "연세대학교",
    department: "의예과",
    program: "학생부종합전형",
    type: "수시",
    quota: 15,
    expectedGrade: { average: 1.0, min: 1.0, max: 1.2 },
    lastYearGrade: { average: 1.1, min: 1.0, max: 1.3 },
    examElements: { "국어": 25, "수학": 30, "영어": 25, "탐구": 20 },
    period: "2024.09.09 - 2024.09.13",
    region: "서울",
    requirements: ["학생부", "자기소개서", "면접"]
  }
];

export const studyStrategies = {
  국어: [
    "문학: 작품별 주제 의식과 화자의 정서 파악",
    "비문학: 글의 구조와 논리적 흐름 분석",
    "문법: 음운, 단어, 문장 체계적 학습",
    "화법과 작문: 상황별 의사소통 전략 습득"
  ],
  수학: [
    "개념 이해: 공식 암기보다 원리 이해 우선",
    "문제 유형 분석: 단계별 해결 과정 체계화",
    "오답 노트: 틀린 문제 유형별 정리",
    "실전 연습: 시간 배분과 정확도 향상"
  ],
  영어: [
    "어휘: 문맥상 의미 파악 중심 학습",
    "문법: 독해와 연계된 실용 문법",
    "독해: 글의 구조와 주제 파악 능력",
    "듣기: 다양한 상황별 청취 연습"
  ]
};
