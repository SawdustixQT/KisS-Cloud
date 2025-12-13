const servicesTableBody = document.getElementById('servicesTableBody');
const addFormFields = document.getElementById('addFormFields');
const newServiceNameInput = document.getElementById('newServiceName');
const newServicePriceInput = document.getElementById('newServicePrice');
const welcomeMessage = document.getElementById('welcomeMessage');
const REDIRECT_URL_AUTH = 'kis_auth.html';
const actionsHeader = document.getElementById('actionsHeader');
const addButton = document.getElementById('addButton');
// Добавили константу для кнопки сохранения/отмены в addFormFields
const saveNewServiceButton = document.getElementById('addServiceButton');

let currentUserRole = ''; // Переменная для хранения текущей роли

document.addEventListener('DOMContentLoaded', (event) => {
    // Приветствие пользователя (логин или гость)
    const username = localStorage.getItem('guestUsername') || localStorage.getItem('user') || 'Гость';
    currentUserRole = localStorage.getItem('role') || 'guest';

    welcomeMessage.textContent = `Вы вошли как ${username} с ролью ${currentUserRole}.`;

    // Проверяем и отображаем элементы UI в зависимости от роли
    checkAndDisplayRoleElements();

    // Загрузка данных при старте
    fetchServices();
});

// --- НОВАЯ ФУНКЦИЯ: Управление видимостью элементов ---
function checkAndDisplayRoleElements() {
    // 1. Делаем видимым столбец "Действия" (actionsHeader)
    //    если роль 'admin' ИЛИ 'support'.
    if (currentUserRole === 'admin' || currentUserRole === 'support') {
        // Убираем класс 'role-restricted', чтобы элемент стал видимым
        actionsHeader.classList.remove('role-restricted');
    }

    // 2. Делаем видимыми кнопку "Добавить услугу" (addButton) и форму добавления (addFormFields),
    //    если роль ТОЛЬКО 'admin'.
    if (currentUserRole === 'admin') {
        // Убираем класс 'add-restricted' для кнопки и контейнера полей ввода
        addButton.classList.remove('add-restricted');
        // Обратите внимание: addFormFields изначально скрыт через display: none в JS toggleAddForm,
        // поэтому мы просто убираем у него класс ограничения доступа, чтобы он мог показаться при клике на кнопку.
        addFormFields.classList.remove('add-restricted');
    }
}


// --- Функции UI ---

function toggleAddForm() {
    // Простая проверка, чтобы пользователь не мог вызвать функцию через консоль, если он не админ
    if (currentUserRole !== 'admin') return;

    // Переключает видимость скрытых полей
    const isHidden = addFormFields.style.display === 'none' || addFormFields.style.display === '';
    // Используем 'block' или 'flex' в зависимости от вашего CSS,
    // чтобы форма отображалась корректно (ваши стили используют display: flex)
    addFormFields.style.display = isHidden ? 'flex' : 'none';
    if (isHidden) {
        newServiceNameInput.focus();
    }
}

// --- Функции работы с данными (требуют бэкенда) ---
// ... (fetchServices, editService, addService и logout остаются без изменений) ...


async function fetchServices() {
    console.log("Отправка запроса на получение списка услуг...");
    try {
        const response = await fetch('/api/services');
        if (!response.ok) throw new Error('Ошибка сети или сервера');

        const services = await response.json();
        renderTable(services);

    } catch (error) {
        console.error("Не удалось загрузить услуги:", error);
    }
}

function renderTable(services) {
    servicesTableBody.innerHTML = ''; // Очищаем таблицу
    const canDelete = (currentUserRole === 'admin')
    const canEdit = (currentUserRole === 'admin' || currentUserRole === 'support');

    services.forEach(service => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${service.name}</td>
            <td>${service.price} руб.</td>
            <!-- Ячейка действий. Если можно редактировать, наполняем контентом -->
            <td class="action-cell">
                ${canEdit ? `<a href="#" class="action-icon" onclick="editService(${service.id})">✏️ Редактировать</a>` : ''}
                ${canDelete ? `<a href="#" class="action-icon" onclick="deleteService(${service.id})">❌ Удалить услугу</a>` : ''}

            </td>
        `;
        servicesTableBody.appendChild(row);
    });

    // Если редактирование запрещено, скрываем все ячейки действий после рендера
    if (!canEdit) {
        document.querySelectorAll('.action-cell').forEach(cell => {
            cell.style.display = 'none';
        });
    }
}

function deleteService(serviceId) {
    try {
        const response = fetch(`/api/services/${serviceId}`, {
            method: 'DELETE' // Или 'POST'
        });
        if (response.ok) {
            // Удалить элемент из DOM после успешного ответа
            document.getElementById(`item-${serviceId}`).remove();
        } else {
            console.error('Ошибка удаления:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function editService(serviceId) {
    // Проверка роли перед выполнением действия
    if (currentUserRole === 'admin' || currentUserRole === 'support') {
        alert(`Переход в режим редактирования услуги с ID: ${serviceId}.`);
    } else {
        alert('У вас нет прав для редактирования.');
    }
}

async function addService() {
    // Проверка роли перед выполнением действия
    if (currentUserRole !== 'admin') {
        alert('У вас нет прав для добавления услуг.');
        return;
    }

    const name = newServiceNameInput.value;
    const price = newServicePriceInput.value;
    // ... (остальной код fetch POST /api/services) ...
    if (!name || !price) {
        alert("Пожалуйста, введите название и цену.");
        return;
    }
    // ... (try/catch блок для fetch POST) ...
    try {
        const response = await fetch('/api/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price })
        });

        if (!response.ok) throw new Error('Ошибка при добавлении услуги на сервере');

        newServiceNameInput.value = '';
        newServicePriceInput.value = '';
        toggleAddForm();
        fetchServices();

    } catch (error) {
        console.error("Ошибка добавления услуги:", error);
        alert("Демо-данные: Не удалось добавить услугу (нет бэкенда).");
    }
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('guestUsername');
    localStorage.removeItem('user');
    localStorage.removeItem('role'); // Очищаем роль при выходе
    window.location.href = REDIRECT_URL_AUTH;
}
