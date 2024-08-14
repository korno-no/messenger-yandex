import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Создание экземпляра приложения
const app = express();

// Определение порта
const PORT = process.env.PORT || 3000;

// Определение текущего модуля
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Использование папки dist как статической
app.use(express.static(path.join(__dirname, 'dist')));

// Обработка всех запросов и отдача index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}/`);
});