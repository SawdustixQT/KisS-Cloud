export function createFooter() {
    return `
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Услуги</h3>
                    <ul>
                        <li><a href="#">Арендовать сервер</a></li>
                        <li><a href="#">Арендовать хостинг</a></li>
                        <li><a href="#">Интегрировать хостинг</a></li>
                        <li><a href="#">Интегрировать CMS систему</a></li>
                        <li><a href="#">Мониторинг сервера</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Клиентам</h3>
                    <ul>
                        <li><a href="#">О компании</a></li>
                        <li><a href="#">Контакты</a></li>
                        <li><a href="#">Документы</a></li>
                        <li><a href="#">Отзывы</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Присоединяйтесь</h3>
                    <div class="social-links">
                        <a href="#" class="social-link">
                            <i class="fab fa-telegram"></i>
                            <span>Telegram</span>
                        </a>
                        <a href="#" class="social-link">
                            <i class="fab fa-vk"></i>
                            <span>ВКонтакте</span>
                        </a>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h3>Помощь</h3>
                    <ul>
                        <li><a href="#">Служба поддержки</a></li>
                        <li><a href="#">Вакансии</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>2025-2026 KisS Cloud. Все права защищены. Сделано в рамках учебного проекта MIREA</p>
            </div>
        </footer>
    `;
}

export function initFooter() {
    // Инициализация обработчиков для футера
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.querySelector('span').textContent;
            alert(`Переход на ${platform} будет реализован позже`);
        });
    });
}