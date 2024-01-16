let currentIndex = 0;
const slides = document.querySelectorAll('.img-slide');
const totalSlides = slides.length;
const indicators = document.querySelector('.indicators');

// 인디케이터 초기화
function createIndicators() {
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        indicators.appendChild(indicator);
    }
}

function showSlide(index) {
    const slideWidth = 1920;
    const newLeft = index * -slideWidth;
    document.querySelector('.img-slides').style.transform = `translateX(${newLeft}px)`;
    updateIndicators();
}

function goToSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
}

function goToPrevSlide() {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
    showSlide(currentIndex);
}

function goToNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

function updateIndicators() {
    indicators.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.style.opacity = index === currentIndex ? 1 : 0.5;
    });
}

document.querySelector('.prev').addEventListener('click', goToPrevSlide);
document.querySelector('.next').addEventListener('click', goToNextSlide);
indicators.addEventListener('click', event => {
    const targetIndex = Array.from(indicators.children).indexOf(event.target);
    if (targetIndex !== -1) {
        goToSlide(targetIndex);
    }
});

createIndicators();
showSlide(currentIndex);

// 상단업 스크롤 버튼
document.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var button = document.getElementById('scrollToTopBtn');

    if (scrollPosition > 500) { // 500px 이상 스크롤 시 버튼 표시
        button.style.display = 'block';
    } else {
        button.style.display = 'none';
    }
});

document.getElementById('scrollToTopBtn').addEventListener('click', function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

//상단 메뉴바 색깔바꾸기
document.addEventListener('scroll', function() {
    var header = document.querySelector('.menu_wrapper'); // 상단바 선택
    var scrollPosition = window.scrollY;

    if (scrollPosition > 100) { // 스크롤 위치가 100px 이상일 때
        header.classList.add('purple-background'); // 클래스 추가
    } else {
        header.classList.remove('purple-background'); // 클래스 제거
    }
});
