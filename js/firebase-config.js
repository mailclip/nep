// Firebase 설정
// 실제 Firebase 프로젝트 생성 후 아래 설정 값을 변경해야 합니다.
const firebaseConfig = {
    apiKey: "AIzaSyDpMPDaEfh1cIE2-ufAsOMPhFTl8_eYkLk",
    authDomain: "nepnep-e0fec.firebaseapp.com",
    databaseURL: "https://nepnep-e0fec-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "nepnep-e0fec",
    storageBucket: "nepnep-e0fec.firebasestorage.app",
    messagingSenderId: "593441927720",
    appId: "1:593441927720:web:623304e34a7b2d1967bb1d",
    measurementId: "G-05S24Q4LKN"
  };

// Firebase 초기화
// 실제 Firebase SDK 로드 후 아래 코드가 실행됩니다.
let db;
let analytics;

document.addEventListener('DOMContentLoaded', function() {
    try {
        // Firebase 초기화
        firebase.initializeApp(firebaseConfig);
        
        // Firestore 데이터베이스 참조 가져오기
        db = firebase.firestore();
        
        // Google Analytics 초기화
        analytics = firebase.analytics();
        
        // 페이지 조회 이벤트 로깅
        logEvent('page_view');
        
        console.log('Firebase가 성공적으로 초기화되었습니다.');
    } catch (error) {
        console.error('Firebase 초기화 중 오류가 발생했습니다:', error);
    }
});

// 이메일 정보를 Firestore에 저장하는 함수
async function saveEmailToFirestore(email) {
    try {
        // 'subscribers' 컬렉션에 이메일 정보 저장
        const docRef = await db.collection('subscribers').add({
            email: email,
            subscribeDate: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('이메일이 성공적으로 저장되었습니다. 문서 ID:', docRef.id);
        
        // 이메일 등록 이벤트 로깅
        logEvent('email_subscription', { email_domain: email.split('@')[1] });
        
        return { success: true, message: '구독해 주셔서 감사합니다!' };
    } catch (error) {
        console.error('이메일 저장 중 오류가 발생했습니다:', error);
        
        // 오류 이벤트 로깅
        logEvent('subscription_error', { error_message: error.message });
        
        return { success: false, message: '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' };
    }
}

// Google Analytics 이벤트 로깅 함수
function logEvent(eventName, eventParams = {}) {
    if (analytics) {
        try {
            analytics.logEvent(eventName, eventParams);
            console.log(`이벤트 로깅: ${eventName}`, eventParams);
        } catch (error) {
            console.error(`이벤트 로깅 중 오류: ${eventName}`, error);
        }
    } else {
        // Analytics가 초기화되지 않은 경우
        console.log(`[GA 이벤트 로깅] ${eventName}:`, eventParams);
    }
}
