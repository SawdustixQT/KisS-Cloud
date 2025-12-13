import { createHeader, initHeader } from './components/header.js';
import { createFooter, initFooter } from './components/footer.js';
import { createBanner, initBanner } from './modules/banner.js';

// Основной контент главной страницы
function createMainContent() {
    return `
        <!-- Баннер с переключением -->
        ${createBanner()}

        <!-- Преимущества проекта -->
        // Преимущества проекта - 6 карточек
        <section class="advantages-section">
            <h2>Преимущества проекта</h2>
            <div class="advantages-grid">
                <div class="advantage-card">
                    <i class="fas fa-shield-alt"></i>
                    <h3>Максимальная безопасность</h3>
                    <p>Многоуровневая система защиты данных и DDoS-защита enterprise-класса</p>
                </div>
                <div class="advantage-card">
                    <i class="fas fa-rocket"></i>
                    <h3>Высокая производительность</h3>
                    <p>Современное оборудование и оптимизированная инфраструктура</p>
                </div>
                <div class="advantage-card">
                    <i class="fas fa-headset"></i>
                    <h3>Круглосуточная поддержка</h3>
                    <p>Техническая поддержка 24/7 от квалифицированных специалистов</p>
                </div>
                <div class="advantage-card">
                    <i class="fas fa-money-bill-wave"></i>
                    <h3>Доступные цены</h3>
                    <p>Гибкая система тарифов и специальные предложения</p>
                </div>
                <div class="advantage-card">
                    <i class="fas fa-globe"></i>
                    <h3>Глобальная инфраструктура</h3>
                    <p>Дата-центры в России, Европе и Азии для максимальной скорости</p>
                </div>
                <div class="advantage-card">
                    <i class="fas fa-sliders-h"></i>
                    <h3>Гибкая конфигурация</h3>
                    <p>Возможность тонкой настройки под ваши уникальные требования</p>
                </div>
            </div>
        </section>
        <!-- Последние отзывы с аватарками -->
        <section class="reviews-section">
            <h2>Последние отзывы от клиентов</h2>
            <div class="reviews-grid">
                <div class="review-card">
                    <div class="review-header">
                        <div class="review-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <h4>Аноним</h4>
                    </div>
                    <p>Отличный сервис! Быстрая техподдержка, стабильная работа серверов. Пользуюсь уже больше года, никаких нареканий.</p>
                </div>
                <div class="review-card">
                    <div class="review-header">
                        <div class="review-avatar">
                            <i class="fas fa-user-tie"></i>
                        </div>
                        <h4>Иван П.</h4>
                    </div>
                    <p>Перенес несколько проектов на хостинг KisS Cloud. Все работает идеально, скорость загрузки сайтов увеличилась.</p>
                </div>
                <div class="review-card">
                    <div class="review-header">
                        <div class="review-avatar">
                            <i class="fas fa-user-graduate"></i>
                        </div>
                        <h4>Мария К.</h4>
                    </div>
                    <p>Очень довольна качеством услуг. Помогли настроить CMS, теперь сайт работает как часы. Спасибо!</p>
                </div>
                <div class="review-card">
                    <div class="review-header">
                        <div class="review-avatar">
                            <i class="fas fa-user-secret"></i>
                        </div>
                        <h4>Аноним</h4>
                    </div>
                    <p>Лучшее соотношение цены и качества на рынке. Техподдержка отвечает мгновенно, проблемы решают быстро.</p>
                </div>
            </div>
        </section>  

        <!-- Помощь на разных уровнях -->
        <section class="help-section">
            <h2>Помощь на разных уровнях</h2>
            <div class="help-grid">
                <div class="help-card">
                    <h3>Техническая поддержка</h3>
                    <p>Наша команда технической поддержки доступна 24/7 для решения любых вопросов и проблем, связанных с вашими услугами. Мы гарантируем быстрый ответ и квалифицированную помощь по всем аспектам работы системы.</p>
                    <button class="help-btn">Написать нам</button>
                </div>
                <div class="help-card">
                    <h3>База знаний</h3>
                    <p>В нашей базе знаний собраны полезные статьи, руководства и FAQ, которые помогут вам самостоятельно решать распространенные проблемы. Этот ресурс постоянно обновляется, чтобы предоставить актуальную информацию и советы по использованию наших услуг.</p>
                    <button class="help-btn">Посмотреть материалы</button>
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section class="faq-section">
            <h2>FAQ</h2>
            <div class="faq-list">
                <div class="faq-item">
                    <div class="faq-question">
                        <span>Что такое VPS и VDS? Чем они отличаются?</span>
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">
                        <span>Правила списания средств за услугу виртуального сервера</span>
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">
                        <span>Какие преимущества у VPS и VDS?</span>
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">
                        <span>Как выбрать оптимальный тариф VPS и VDS?</span>
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">
                        <span>Какие операционные системы доступны?</span>
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">
                        <span>Можно ли получить скидку?</span>
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">
                        <span>Какие есть способы оплаты услуг?</span>
                        <i class="fas fa-plus"></i>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем шапку
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = createHeader();
        initHeader();
    }

    // Основной контент
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.innerHTML = createMainContent();

        // Баннер
        const clearBannerInterval = initBanner();

        // Обработчики для кнопок помощи
        const helpBtns = document.querySelectorAll('.help-btn');
        helpBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                alert('Переход на страницу помощи будет реализован позже');
            });
        });

        // FAQ
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                alert('Ответ на вопрос будет отображен позже');
            });
        });
    }

    // Подвал
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter();
        initFooter();
    }

    console.log('KisS Cloud application initialized successfully!');
});