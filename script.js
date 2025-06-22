document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Swiper
    const swipers = [];
    document.querySelectorAll('.artist-swiper').forEach((swiperContainer, index) => {
        const swiper = new Swiper(swiperContainer, {
            autoplay: false, // Отключаем стандартный автоплей
            loop: true,
            speed: 600, // Увеличиваем скорость для плавности
            effect: 'fade', // Меняем эффект на fade для плавного появления
            fadeEffect: {
                crossFade: true
            },
            lazy: true,
            navigation: {
                nextEl: swiperContainer.querySelector('.swiper-button-next'),
                prevEl: swiperContainer.querySelector('.swiper-button-prev'),
            },
            allowTouchMove: true,
            simulateTouch: true,
            grabCursor: true,
        });
        
        swipers.push(swiper);
    });

    // Хаотичная смена изображений
    function startChaoticSlideshow() {
        swipers.forEach((swiper, index) => {
            // Создаем случайный интервал для каждой карточки (от 2 до 6 секунд)
            const randomInterval = Math.random() * 4000 + 2000;
            
            function changeSlideRandomly() {
                if (swiper && swiper.slides && swiper.slides.length > 1) {
                    // Получаем случайный индекс слайда
                    const currentIndex = swiper.realIndex;
                    let randomIndex;
                    
                    // Убеждаемся, что новый индекс отличается от текущего
                    do {
                        randomIndex = Math.floor(Math.random() * swiper.slides.length);
                    } while (randomIndex === currentIndex && swiper.slides.length > 1);
                    
                    // Переходим к случайному слайду
                    swiper.slideTo(randomIndex);
                }
                
                // Устанавливаем новый случайный интервал для следующей смены
                const nextInterval = Math.random() * 4000 + 2000;
                setTimeout(changeSlideRandomly, nextInterval);
            }
            
            // Запускаем смену с начальной задержкой
            setTimeout(changeSlideRandomly, randomInterval);
        });
    }

    // Запускаем хаотичную смену после небольшой задержки
    setTimeout(startChaoticSlideshow, 1000);

    // Плавный скролл
    const scrollButton = document.querySelector('.scroll-button');
    if (scrollButton) {
        scrollButton.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#artists');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Анимация появления карточек
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    document.querySelectorAll('.artist-card').forEach(card => {
        observer.observe(card);
    });

    // Звёздный фон
    function createStars() {
        const starsContainer = document.getElementById('stars-container');
        if (!starsContainer) return;
        starsContainer.innerHTML = '';

        const isMobile = window.innerWidth <= 768;
        const starCount = isMobile ? 60 : 100;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (Math.random() * 2 + 2) + 's';

            const starType = Math.random();
            if (starType > 0.85) star.classList.add('large');
            else if (starType > 0.7) star.classList.add('bright');

            starsContainer.appendChild(star);
        }
    }

    createStars();
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(createStars, 150);
    });

    // Определение ориентации изображения
    document.querySelectorAll('.artist-card img').forEach(img => {
        function checkOrientation() {
            if (img.naturalWidth > img.naturalHeight * 1.25) {
                img.classList.add('horizontal');
            }
        }
        if (img.complete) {
            checkOrientation();
        } else {
            img.onload = checkOrientation;
        }
    });

    // Дополнительные эффекты при наведении - приостановка хаотичной смены
    document.querySelectorAll('.artist-card').forEach((card, index) => {
        let isHovered = false;
        
        card.addEventListener('mouseenter', () => {
            isHovered = true;
            // Можно добавить дополнительные эффекты при наведении
        });
        
        card.addEventListener('mouseleave', () => {
            isHovered = false;
        });
    });
});
