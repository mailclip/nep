// 메인 자바스크립트 파일

document.addEventListener('DOMContentLoaded', function() {    
    // 이메일 폼 제출 이벤트 처리
    const emailForm = document.getElementById('email-form');
    const emailInput = document.getElementById('email');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');
    
    // 새로운 이메일 폼 요소
    const newEmailForm = document.getElementById('new-email-form');
    const newEmailInput = document.getElementById('new-email');
    const newFormMessage = document.getElementById('new-form-message');
    const newSubmitBtn = document.getElementById('new-submit-btn');
    
    // 두 번째 새로운 이메일 폼 요소
    const newEmailForm2 = document.getElementById('new-email-form-2');
    const newEmailInput2 = document.getElementById('new-email-2');
    const newFormMessage2 = document.getElementById('new-form-message-2');
    const newSubmitBtn2 = document.getElementById('new-submit-btn-2');
    
    // 기본 브라우저 유효성 검사 메시지 방지
    if (newEmailInput) {
        newEmailInput.addEventListener('invalid', function(e) {
            e.preventDefault();
            showNewMessage('올바른 이메일 주소를 입력해주세요.', false);
        });
        
        // 입력 중에 유효성 검사
        newEmailInput.addEventListener('input', function() {
            const email = this.value.trim();
            if (isValidEmail(email)) {
                // 이메일이 유효하면 오류 메시지 제거
                const formMessage = document.getElementById('new-form-message');
                if (formMessage) {
                    formMessage.textContent = '';
                    formMessage.classList.remove('error-message');
                }
            }
        });
    }
    
    if (newEmailInput2) {
        newEmailInput2.addEventListener('invalid', function(e) {
            e.preventDefault();
            showNewMessage2('올바른 이메일 주소를 입력해주세요.', false);
        });
        
        // 입력 중에 유효성 검사
        newEmailInput2.addEventListener('input', function() {
            const email = this.value.trim();
            if (isValidEmail(email)) {
                // 이메일이 유효하면 오류 메시지 제거
                const formMessage = document.getElementById('new-form-message-2');
                if (formMessage) {
                    formMessage.textContent = '';
                    formMessage.classList.remove('error-message');
                }
            }
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('invalid', function(e) {
            e.preventDefault();
            showMessage('올바른 이메일 주소를 입력해주세요.', false);
        });
        
        // 입력 중에 유효성 검사
        emailInput.addEventListener('input', function() {
            const email = this.value.trim();
            if (isValidEmail(email)) {
                // 이메일이 유효하면 오류 메시지 제거
                const formMessage = document.getElementById('form-message');
                if (formMessage) {
                    formMessage.textContent = '';
                }
            }
        });
    }

    if (emailForm) {
        emailForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            console.log('폼 제출 시작');
            
            // 이메일 유효성 검사
            const email = emailInput.value.trim();
            console.log('입력된 이메일:', email);
            
            if (!email) {
                showMessage('소식을 받아볼 이메일이 필요해요', false);
                // 이메일 유효성 검사 실패 이벤트 로깅
                logEvent('email_validation_failed');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('올바른 이메일 주소를 입력해주세요.', false);
                // 이메일 유효성 검사 실패 이벤트 로깅
                logEvent('email_validation_failed');
                return;
            }
            
            // 제출 버튼 비활성화 및 로딩 상태 표시
            submitBtn.disabled = true;
            submitBtn.textContent = '처리 중...';
            
            // 폼 제출 시작 이벤트 로깅
            logEvent('form_submission_started');
            
            try {
                console.log('Firebase에 이메일 저장 시도');
                // Firebase에 이메일 저장 (firebase-config.js에 정의된 함수 사용)
                const result = await saveEmailToFirestore(email);
                console.log('저장 결과:', result);
                console.log('결과 타입:', typeof result);
                console.log('메시지 타입:', typeof result.message);
                
                if (result.success) {
                    // 성공 메시지 표시
                    showMessage('감사해요, 출시 소식은 가장 먼저 전해 드릴게요!', true);
                    emailInput.value = ''; // 입력 필드 초기화
                } else {
                    // 오류 메시지 표시
                    const errorMessage = result.message ? result.message.toString() : '오류가 발생했습니다.';
                    showMessage(errorMessage, false);
                }
            } catch (error) {
                // 오류 처리
                console.error('이메일 저장 중 오류:', error);
                showMessage('오류가 발생했습니다. 잠시 후 다시 시도해주세요.', false);
                // 폼 제출 오류 이벤트 로깅
                logEvent('form_submission_error', { error_type: 'javascript_error' });
            } finally {
                // 제출 버튼 상태 복원
                submitBtn.disabled = false;
                submitBtn.textContent = '구독하기';
            }
        });
    }
    
    // 첫 번째 새로운 이메일 폼 제출 이벤트 처리
    if (newEmailForm) {
        newEmailForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            console.log('새 폼 제출 시작');
            
            // 이메일 유효성 검사
            const email = newEmailInput.value.trim();
            console.log('입력된 이메일:', email);
            
            if (!email) {
                showNewMessage('소식을 받아볼 이메일이 필요해요', false);
                // 이메일 유효성 검사 실패 이벤트 로깅
                logEvent('email_validation_failed');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNewMessage('올바른 이메일 주소를 입력해주세요.', false);
                // 이메일 유효성 검사 실패 이벤트 로깅
                logEvent('email_validation_failed');
                return;
            }
            
            // 제출 버튼 비활성화 및 로딩 상태 표시
            newSubmitBtn.disabled = true;
            newSubmitBtn.textContent = '처리 중...';
            
            // 폼 제출 시작 이벤트 로깅
            logEvent('form_submission_started');
            
            try {
                console.log('Firebase에 이메일 저장 시도');
                // Firebase에 이메일 저장 (firebase-config.js에 정의된 함수 사용)
                const result = await saveEmailToFirestore(email);
                console.log('저장 결과:', result);
                console.log('결과 타입:', typeof result);
                console.log('메시지 타입:', typeof result.message);
                
                if (result.success) {
                    // 성공 메시지 표시
                    showNewMessage('감사해요, 출시 소식은 가장 먼저 전해 드릴게요!', true);
                    newEmailInput.value = ''; // 입력 필드 초기화
                } else {
                    // 오류 메시지 표시
                    const errorMessage = result.message ? result.message.toString() : '오류가 발생했습니다.';
                    showNewMessage(errorMessage, false);
                }
            } catch (error) {
                // 오류 처리
                console.error('이메일 저장 중 오류:', error);
                showNewMessage('오류가 발생했습니다. 잠시 후 다시 시도해주세요.', false);
                // 폼 제출 오류 이벤트 로깅
                logEvent('form_submission_error', { error_type: 'javascript_error' });
            } finally {
                // 제출 버튼 상태 복원
                newSubmitBtn.disabled = false;
                newSubmitBtn.textContent = '출시 알림 받기';
            }
        });
    }
    
    // 두 번째 새로운 이메일 폼 제출 이벤트 처리
    if (newEmailForm2) {
        newEmailForm2.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            console.log('두 번째 새 폼 제출 시작');
            
            // 이메일 유효성 검사
            const email = newEmailInput2.value.trim();
            console.log('입력된 이메일:', email);
            
            if (!email) {
                showNewMessage2('소식을 받아볼 이메일이 필요해요', false);
                // 이메일 유효성 검사 실패 이벤트 로깅
                logEvent('email_validation_failed');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNewMessage2('올바른 이메일 주소를 입력해주세요.', false);
                // 이메일 유효성 검사 실패 이벤트 로깅
                logEvent('email_validation_failed');
                return;
            }
            
            // 제출 버튼 비활성화 및 로딩 상태 표시
            newSubmitBtn2.disabled = true;
            newSubmitBtn2.textContent = '처리 중...';
            
            // 폼 제출 시작 이벤트 로깅
            logEvent('form_submission_started');
            
            try {
                console.log('Firebase에 이메일 저장 시도');
                // Firebase에 이메일 저장 (firebase-config.js에 정의된 함수 사용)
                const result = await saveEmailToFirestore(email);
                console.log('저장 결과:', result);
                console.log('결과 타입:', typeof result);
                console.log('메시지 타입:', typeof result.message);
                
                if (result.success) {
                    // 성공 메시지 표시
                    showNewMessage2('감사해요, 출시 소식은 가장 먼저 전해 드릴게요!', true);
                    newEmailInput2.value = ''; // 입력 필드 초기화
                } else {
                    // 오류 메시지 표시
                    const errorMessage = result.message ? result.message.toString() : '오류가 발생했습니다.';
                    showNewMessage2(errorMessage, false);
                }
            } catch (error) {
                // 오류 처리
                console.error('이메일 저장 중 오류:', error);
                showNewMessage2('오류가 발생했습니다. 잠시 후 다시 시도해주세요.', false);
                // 폼 제출 오류 이벤트 로깅
                logEvent('form_submission_error', { error_type: 'javascript_error' });
            } finally {
                // 제출 버튼 상태 복원
                newSubmitBtn2.disabled = false;
                newSubmitBtn2.textContent = '출시 알림 받기';
            }
        });
    }

    // 스크롤에 따른 헤더 스타일 변경
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
                header.style.padding = '8px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.classList.remove('scrolled');
                header.style.padding = '12px 0';
                header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
            }
        });
    }
    
    // 브라우저 및 장치 정보 수집 (분석용)
    logUserInfo();
    
    // 스크롤 추적 이벤트 설정
    setupScrollTracking();
});

// 유틸리티 함수

// 이메일 유효성 검사 함수
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 메시지 표시 함수
function showMessage(message, isSuccess) {
    const formMessage = document.getElementById('form-message');
    if (formMessage) {
        formMessage.textContent = message;
        
        if (isSuccess) {
            formMessage.style.color = '#474973';
            formMessage.classList.remove('error-message');
            formMessage.classList.add('success-message');
            // 일정 시간 후 메시지 숨기기 (성공 메시지의 경우)
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.classList.remove('success-message');
            }, 5000);
        } else {
            formMessage.style.color = '#e74c3c';
            formMessage.classList.add('error-message');
            formMessage.classList.remove('success-message');
        }
    }
}

// 새로운 메시지 표시 함수 (첫 번째 폼)
function showNewMessage(message, isSuccess) {
    const formMessage = document.getElementById('new-form-message');
    if (formMessage) {
        formMessage.textContent = message;
        
        if (isSuccess) {
            formMessage.style.color = '#474973';
            formMessage.classList.remove('error-message');
            formMessage.classList.add('success-message');
            // 일정 시간 후 메시지 숨기기 (성공 메시지의 경우)
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.classList.remove('success-message');
            }, 5000);
        } else {
            formMessage.style.color = '#e74c3c';
            formMessage.classList.add('error-message');
            formMessage.classList.remove('success-message');
        }
    }
}

// 새로운 메시지 표시 함수 (두 번째 폼)
function showNewMessage2(message, isSuccess) {
    const formMessage = document.getElementById('new-form-message-2');
    if (formMessage) {
        formMessage.textContent = message;
        
        if (isSuccess) {
            formMessage.style.color = '#474973';
            formMessage.classList.remove('error-message');
            formMessage.classList.add('success-message');
            // 일정 시간 후 메시지 숨기기 (성공 메시지의 경우)
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.classList.remove('success-message');
            }, 5000);
        } else {
            formMessage.style.color = '#e74c3c';
            formMessage.classList.add('error-message');
            formMessage.classList.remove('success-message');
        }
    }
}

// 사용자 브라우저 및 장치 정보 수집 함수
function logUserInfo() {
    const userAgent = navigator.userAgent;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);
    
    // 사용자 정보 로깅
    logEvent('user_info', {
        browser: getBrowserInfo(),
        device_type: isMobile ? 'mobile' : 'desktop',
        screen_resolution: `${screenWidth}x${screenHeight}`,
        referrer: document.referrer || 'direct'
    });
}

// 브라우저 정보 가져오기
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    
    if (userAgent.indexOf('Chrome') > -1) return 'Chrome';
    if (userAgent.indexOf('Safari') > -1) return 'Safari';
    if (userAgent.indexOf('Firefox') > -1) return 'Firefox';
    if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) return 'IE';
    if (userAgent.indexOf('Edge') > -1) return 'Edge';
    
    return 'Unknown';
}

// 스크롤 추적 설정
function setupScrollTracking() {
    let scrollDepth = 0;
    const scrollThresholds = [25, 50, 75, 100];
    let reachedThresholds = new Set();
    
    window.addEventListener('scroll', function() {
        // 스크롤 깊이 계산 (%)
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const newScrollDepth = Math.floor((currentScroll / pageHeight) * 100);
        
        // 이전에 기록되지 않은 특정 스크롤 임계값에 도달한 경우 이벤트 로깅
        scrollThresholds.forEach(threshold => {
            if (newScrollDepth >= threshold && !reachedThresholds.has(threshold)) {
                reachedThresholds.add(threshold);
                logEvent('scroll_depth', { depth_percentage: threshold });
            }
        });
    });
}

// 페이지 로드 시간 측정 (성능 최적화 확인용)
window.addEventListener('load', function() {
    // 페이지 로드 시간을 콘솔에 출력 및 로깅
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log('페이지 로드 시간:', loadTime + 'ms');
    
    // 페이지 로드 성능 이벤트 로깅
    logEvent('page_load_performance', {
        load_time_ms: loadTime,
        connection_type: getConnectionType()
    });
});

// 연결 타입 확인
function getConnectionType() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return connection ? connection.effectiveType : 'unknown';
}
