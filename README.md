# 📝 To-Do List App (Vue + AWS)

Цей проект — проста серверна to-do аплікація з авторизацією через AWS Cognito та збереженням завдань у DynamoDB.

## 📁 Структура проекту

├── frontend/ # Інтерфейс користувача на Vue 3
├── backend/ # AWS Lambda функції та Serverless конфігурація
├── README.md
└── .gitignore


---

## 🚀 Деплой фронтенду

### 📦 Встановлення

```bash
cd frontend
npm install

🏗️ Збірка

npm run build

☁️ Завантаження на S3

Після збірки, вміст папки dist/ до S3 бакету з увімкненим static website hosting. У CloudFront для доставки:
➡️ https://dua9bykxw0d0w.cloudfront.net

⚙️ Деплой бекенду (Serverless)

📦 Встановлення

cd backend
npm install

🚀 Деплой

npx serverless deploy

Використовується Serverless Framework v3 для деплою Lambda функцій до AWS.

🔐 Авторизація

Проєкт використовує Amazon Cognito Hosted UI для:

Реєстрації

Входу

Виходу

🔁 Після входу користувач отримує userId, який зберігається в localStorage та використовується для CRUD операцій у DynamoDB.

📡 API Endpoints
Базовий URL: https://vvlfs6eugb.execute-api.eu-north-1.amazonaws.com/dev

GET /getUserTasks

POST /addTask

PUT /updateTask

POST /deleteTask

GET /callback — обробка redirect після входу

🛠 Технології
Vue 3 + Vite

AWS Lambda

Amazon Cognito

DynamoDB

CloudFront + S3

Serverless Framework

👩‍💻 Автор
Розроблено з ❤️ для навчального використання.
Автор: @kariinix