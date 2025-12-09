export function createHeader() {
    return `
        <header class="header">
            <div class="header-top">
                <div class="logo">
                    <h1>KisS Cloud</h1>
                </div>
                
                <div class="search-system">
                    <input type="text" placeholder="Поиск по каталогам, синонимам..." class="search-input">
                    <button class="search-btn">Найти</button>
                </div>
                
                <div class="user-actions">
                    <div class="profile-icon">
                        <i class="fas fa-user"></i>
                    </div>
                    <button class="login-btn">Войти</button>
                </div>
            </div>
            
            <div class="header-line"></div>
            
            <nav class="header-nav">
                <div class="nav-item dropdown">
                    <span>Услуги</span>
                    <div class="dropdown-content">
                        <a href="#">Арендовать сервер</a>
                        <a href="#">Арендовать хостинг</a>
                        <a href="#">Интегрировать хостинг</a>
                        <a href="#">Интегрировать CMS систему</a>
                        <a href="#">Мониторинг сервера</a>
                    </div>
                </div>
                
                <div class="nav-item dropdown">
                    <span>Помощь</span>
                    <div class="dropdown-content">
                        <a href="#">База знаний</a>
                        <a href="#">Служба поддержки</a>
                        <a href="#">Способы оплаты</a>
                        <a href="#">Отзывы</a>
                        <a href="#">О компании</a>
                        <a href="#">Контакты</a>
                    </div>
                </div>
                
                <div class="nav-item">
                    <a href="#">Акции</a>
                </div>
                
                <div class="nav-item">
                    <a href="#">Вакансии</a>
                </div>
            </nav>
        </header>
    `;
}

export function initHeader() {
    // Инициализация обработчиков событий для шапки
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            const content = dropdown.querySelector('.dropdown-content');
            content.style.display = 'block';
        });

        dropdown.addEventListener('mouseleave', () => {
            const content = dropdown.querySelector('.dropdown-content');
            content.style.display = 'none';
        });
    });

    // Обработчик для кнопки входа
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            alert('Функция входа будет реализована позже');
        });
    }

    // Обработчик для поиска
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const searchInput = document.querySelector('.search-input');
            alert(`Поиск: ${searchInput.value}`);
        });
    }
}