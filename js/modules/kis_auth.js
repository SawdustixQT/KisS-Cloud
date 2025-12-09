const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
// const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'super_secret_key_for_jwt';

// Подключение к базе данных SQLite
const db = new sqlite3.Database('../../kis.db', (err) => {
    if (err) {
        console.error('Ошибка подключения к БД:', err.message);
    } else {
        console.log('Подключено к базе данных kis.db');
        // Убедитесь, что таблица users существует
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            anon_status TEXT,
            role_id INTEGER
        )`);
    }
});

// Middleware для обработки JSON и форм
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Отдаем статический HTML файл из папки 'public'
app.use(express.static(path.join(__dirname, '../../', 'public')));
console.log(path.join(__dirname, '../../', 'public'));


// --- Маршрут регистрации (INSERT в БД) ---
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    // Вставка пользователя напрямую без хеширования
    const query = `INSERT INTO users (name, password, anon_status, role_id) VALUES (?, ?, ?, ?)`;
    // Устанавливаем базовые значения для anon_status и role_id при регистрации
    db.run(query, [username, password, '0', 4], function(err) {
        if (err) {
            console.error(err.message);
            // Обработка ошибки уникальности имени пользователя
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).send('Пользователь с таким именем уже существует.');
            }
            return res.status(500).send('Ошибка при регистрации.');
        }
        res.status(201).send(`Пользователь успешно зарегистрирован с ID: ${this.lastID}`);
    });
});


// --- Маршрут авторизации (SELECT из БД и сравнение) ---
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Ищем пользователя в БД по имени
    const query = `SELECT id, name, password FROM users WHERE name = ?`;
    db.get(query, [username], (err, user) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Ошибка сервера при поиске пользователя.');
        }

        // Если пользователь не найден
        if (!user) {
            return res.status(400).send('Неверное имя пользователя или пароль.');
        }

        if (user.password === password) {
            let role_name;
            db.get(`SELECT roles.name 
                        FROM users 
                        JOIN roles ON roles.id = users.role_id 
                        WHERE users.name = ?`, [username],
                (err, row) => {
                    role_name = row.name;

                    // Если пароль верен, создаем JWT токен
                    const accessToken = jwt.sign(
                        { name: user.name, id: user.id, role: role_name},
                        SECRET_KEY,
                        { expiresIn: '1h' }
                    );

                    // Отправляем токен клиенту
                    res.json({ message: 'Авторизация успешна', token: accessToken, role: role_name});
                }
            );
        } else {
            // Пароль не совпал
            res.status(400).send('Неверное имя пользователя или пароль');
        }
    });
});

app.get('/api/services', (req, res) => {
    const query = `SELECT * FROM services ORDER BY name ASC`;
    const roles_query = `SELECT * FROM services ORDER BY name ASC`;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Ошибка сервера при получении услуг.' });
        }
        // Отправляем массив данных в формате JSON
        res.json(rows);
    });
});

app.post('/api/services', (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: 'Требуется название (name) и цена (price).' });
    }

    const query = `INSERT INTO services (name, price) VALUES (?, ?)`;
    // db.run использует function(err) callback, чтобы получить this.lastID
    db.run(query, [name, price], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Ошибка при добавлении услуги в БД.' });
        }
        // Возвращаем успех и ID новой записи
        res.status(201).json({
            message: 'Услуга успешно добавлена.',
            id: this.lastID,
            name: name,
            price: price
        });
    });
});






// --- Middleware для защиты маршрутов (Проверка токена) ---
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Исправлено получение токена

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// --- Защищенный маршрут (требует токен) ---
app.get('/api/profile', authenticateToken, (req, res) => {
    res.json({
        message: `Добро пожаловать в профиль, ${req.user.name}!`,
        userData: req.user
    });
});

app.get('/', (req, res) => {
    res.send('Сервер авторизации работает. Используйте API-маршруты /api/login и /api/register.');
    // res.redirect(__dirname + '../../public/kis_auth.html');

});


app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
