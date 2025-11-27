export function createBanner() {
    return `
        <section class="banner-section">
            <div class="banner-container">
                <div class="banner-slide active">
                    <img src="images/banners/banner-1.jpg" alt="Аренда серверов">
                    <div class="banner-content">
                        <h2>Аренда серверов из различных стран</h2>
                        <p>Мы поможем вам подключиться Виртуальные серверы в России, Нидерландах, Турции и Австрии</p>
                        <button class="banner-btn">Подробнее</button>
                    </div>
                </div>
                
                <div class="banner-slide">
                    <img src="images/banners/banner-2.jpg" alt="Аренда хостинга">
                    <div class="banner-content">
                        <h2>Аренда хостинга</h2>
                        <p>Готовое решение для размещения сайтов</p>
                        <button class="banner-btn">Подробнее</button>
                    </div>
                </div>
                
                <div class="banner-slide">
                    <img src="images/banners/banner-3.jpg" alt="Интегрировать CMS систему">
                    <div class="banner-content">
                        <h2>Интегрировать CMS систему</h2>
                        <p>Мы настроим вашу систему управления контентом для оптимальной работы на сервере</p>
                        <button class="banner-btn">Подробнее</button>
                    </div>
                </div>
                
                <button class="banner-arrow prev">‹</button>
                <button class="banner-arrow next">›</button>
                
                <div class="banner-dots">
                    <span class="dot active" data-slide="0"></span>
                    <span class="dot" data-slide="1"></span>
                    <span class="dot" data-slide="2"></span>
                </div>
            </div>
        </section>
    `;
}

export function initBanner() {
    const slides = document.querySelectorAll('.banner-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');
    const bannerBtns = document.querySelectorAll('.banner-btn');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(n, direction = 'next') {
        // Убираем классы у всех слайдов
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        dots.forEach(dot => dot.classList.remove('active'));

        const prevSlideIndex = currentSlide;
        currentSlide = (n + slides.length) % slides.length;

        // Добавляем класс для анимации
        if (direction === 'prev') {
            slides[prevSlideIndex].classList.add('prev');
        }

        // Показываем новый слайд
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1, 'next');
    }

    function prevSlide() {
        showSlide(currentSlide - 1, 'prev');
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 10000); // 10 секунд
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    if (slides.length > 0) {
        // Обработчики для стрелок
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoSlide();
                startAutoSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoSlide();
                startAutoSlide();
            });
        }

        // Обработчики для точек
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const direction = index > currentSlide ? 'next' : 'prev';
                showSlide(index, direction);
                stopAutoSlide();
                startAutoSlide();
            });
        });

        // Обработчики для кнопок баннера
        bannerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                alert('Переход на страницу услуги будет реализован позже');
            });
        });

        // Пауза автопрокрутки при наведении
        const bannerContainer = document.querySelector('.banner-container');
        if (bannerContainer) {
            bannerContainer.addEventListener('mouseenter', stopAutoSlide);
            bannerContainer.addEventListener('mouseleave', startAutoSlide);
        }

        // Запуск автопрокрутки
        startAutoSlide();

        return () => {
            stopAutoSlide();
            if (bannerContainer) {
                bannerContainer.removeEventListener('mouseenter', stopAutoSlide);
                bannerContainer.removeEventListener('mouseleave', startAutoSlide);
            }
        };
    }
}