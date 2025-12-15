const incidentsTableBody = document.getElementById('incidentsTableBody');
const welcomeMessage = document.getElementById('welcomeMessage');
const incidentFormSection = document.getElementById('incidentFormSection');
const incidentsTableSection = document.getElementById('incidentsTableSection');
const incidentNameInput = document.getElementById('incidentName');
const incidentDetailsInput = document.getElementById('incidentDetails');
const formMessage = document.getElementById('formMessage');
const REDIRECT_URL_AUTH = 'kis_auth.html';

let currentUserRole = '';
let currentUserId = '';

document.addEventListener('DOMContentLoaded', (event) => {
    // Получаем данные пользователя
    const username = localStorage.getItem('user') || 'Гость';
    console.log(localStorage.getItem('user'))
    currentUserRole = localStorage.getItem('role') || 'guest';
    currentUserId = localStorage.getItem('userId') || 'guest_' + Date.now();

    welcomeMessage.textContent = `Вы вошли как ${username} с ролью ${currentUserRole}.`;

    // Настраиваем видимость секций в зависимости от роли
    setupUIByRole();

    // Загружаем данные для админов и поддержки
    if (currentUserRole === 'admin' || currentUserRole === 'support') {
        fetchIncidents();
    }
});

function setupUIByRole() {
    // Показываем форму создания для гостей и пользователей
    if (currentUserRole === 'guest' || currentUserRole === 'user') {
        incidentFormSection.style.display = 'block';
        incidentsTableSection.style.display = 'none';
    }
    // Показываем таблицу для администраторов и поддержки
    else if (currentUserRole === 'admin' || currentUserRole === 'support') {
        incidentFormSection.style.display = 'none';
        incidentsTableSection.style.display = 'block';

        // Загружаем инциденты только если есть токен
        const token = localStorage.getItem('authToken');
        if (token) {
            fetchIncidents();
        }
    }
    // По умолчанию скрываем обе секции для других ролей
    else {
        incidentFormSection.style.display = 'none';
        incidentsTableSection.style.display = 'none';
    }
}

// Создание нового инцидента
// Создание нового инцидента
async function createIncident() {
    const name = incidentNameInput.value.trim();
    const details = incidentDetailsInput.value.trim();

    if (!name) {
        formMessage.textContent = 'Пожалуйста, введите название инцидента';
        formMessage.style.color = 'red';
        return;
    }

    if (!details) {
        formMessage.textContent = 'Пожалуйста, введите детали инцидента';
        formMessage.style.color = 'red';
        return;
    }

    // Получаем токен из localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
        formMessage.textContent = 'Ошибка авторизации. Пожалуйста, войдите заново.';
        formMessage.style.color = 'red';
        return;
    }
    const username = localStorage.getItem('user') || '';

    const incidentData = {
        username: username,
        name: name,
        details: details
    };

    try {
        const response = await fetch('/api/incidents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(incidentData)
        });

        if (!response.ok) {
            // Получаем текст ошибки от сервера
            const errorText = await response.text();
            throw new Error(`Ошибка при создании инцидента: ${response.status} ${errorText}`);
        }

        const data = await response.json();

        // Очищаем форму и показываем сообщение об успехе
        incidentNameInput.value = '';
        incidentDetailsInput.value = '';
        formMessage.textContent = 'Инцидент успешно создан!';
        formMessage.style.color = 'green';

        // Если пользователь админ или поддержка, обновляем таблицу
        if (currentUserRole === 'admin' || currentUserRole === 'support') {
            fetchIncidents();
        }

    } catch (error) {
        console.error("Ошибка создания инцидента:", error);
        formMessage.textContent = error.message || 'Не удалось создать инцидент';
        formMessage.style.color = 'red';
    }
}

// Загрузка инцидентов для админов и поддержки
async function fetchIncidents() {
    console.log("Загрузка списка инцидентов...");

    // Получаем токен из localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error("Токен авторизации отсутствует");
        return;
    }

    try {
        const response = await fetch('/api/incidents', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            if (response.status === 403) {
                console.error("Недостаточно прав для просмотра инцидентов");
                incidentsTableBody.innerHTML = '<tr><td colspan="4">Недостаточно прав для просмотра инцидентов</td></tr>';
                return;
            }
            throw new Error('Ошибка сети или сервера');
        }

        const incidents = await response.json();
        renderIncidentsTable(incidents);

    } catch (error) {
        console.error("Не удалось загрузить инциденты:", error);
        incidentsTableBody.innerHTML = '<tr><td colspan="4">Ошибка загрузки данных</td></tr>';
    }
}

// Отображение таблицы инцидентов
function renderIncidentsTable(incidents) {
    incidentsTableBody.innerHTML = '';

    incidents.forEach(incident => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${incident.id || 'N/A'}</td>
            <td>${incident.user_id || currentUserId}</td>
            <td>${incident.name}</td>
            <td style="max-width: 300px; word-wrap: break-word;">${incident.details}</td>
        `;
        incidentsTableBody.appendChild(row);
    });
}




// Выход из системы
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('guestUsername');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    window.location.href = REDIRECT_URL_AUTH;
}