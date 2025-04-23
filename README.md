# NEP - 이메일 뉴스레터 서비스

Firebase를 활용한 이메일 뉴스레터 구독 랜딩 페이지입니다.

## 기능

- 반응형 디자인 (모바일, 태블릿, 데스크탑)
- 이메일 수집 및 Firebase Firestore에 저장
- Google Analytics 통합
- 사용자 활동 추적 (스크롤 깊이, 폼 제출 등)

## 설정 방법

### 1. Firebase 프로젝트 설정

1. [Firebase 콘솔](https://console.firebase.google.com/)에 접속합니다.
2. 이미 생성된 "nepnep-e0fec" 프로젝트를 선택하거나, 새 프로젝트를 생성합니다.
3. 왼쪽 메뉴에서 "Firestore Database" > "규칙" 탭으로 이동합니다.
4. 아래 규칙을 복사하여 붙여넣고 "게시" 버튼을 클릭합니다:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // subscribers 컬렉션에 대한 규칙
    match /subscribers/{subscriberId} {
      // 누구나 조회 불가능, 추가만 가능하도록 설정
      allow read: if false;
      allow create: if 
        // 이메일 필드 확인
        request.resource.data.keys().hasOnly(['email', 'subscribeDate']) &&
        request.resource.data.email is string &&
        request.resource.data.email.matches('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
      
      // 수정 및 삭제 불가
      allow update, delete: if false;
    }
    
    // 다른 모든 컬렉션에 대한 기본 규칙 - 접근 불가
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 2. 이미지 파일 추가

다음 이미지 파일을 `img` 폴더에 추가해야 합니다:
- `logo.png` - 로고 이미지 (권장 크기: 200x50px)
- `hero-image.jpg` - 메인 이미지 (권장 크기: 1200x800px)
- `favicon.ico` - 파비콘 (권장 크기: 32x32px)

### 3. GitHub Pages에 배포

1. GitHub 저장소 생성
2. 프로젝트 파일 업로드
3. Settings > Pages에서 GitHub Pages 활성화

## 구조

```
nep-landing-page/
├── css/
│   ├── style.css      # 기본 스타일시트
│   └── responsive.css # 반응형 스타일시트
├── js/
│   ├── main.js           # 메인 자바스크립트 코드
│   └── firebase-config.js # Firebase 설정
├── img/
│   ├── logo.png       # 로고 이미지
│   ├── hero-image.jpg # 메인 이미지
│   └── favicon.ico    # 파비콘
├── index.html         # 메인 HTML 파일
└── README.md          # 문서
```

## 추적 이벤트

이 랜딩 페이지는 다음 이벤트를 추적합니다:

- `page_view`: 페이지 방문
- `email_subscription`: 이메일 구독 성공
- `email_validation_failed`: 유효하지 않은 이메일 입력
- `form_submission_started`: 폼 제출 시작
- `form_submission_error`: 폼 제출 오류
- `user_info`: 사용자 브라우저 및 장치 정보
- `scroll_depth`: 스크롤 깊이 (25%, 50%, 75%, 100%)
- `page_load_performance`: 페이지 로드 성능

## 참고 자료

- [Firebase 문서](https://firebase.google.com/docs)
- [Google Analytics 문서](https://developers.google.com/analytics)
- [GitHub Pages 문서](https://docs.github.com/en/pages)

## 라이센스

MIT License 