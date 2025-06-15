# 📝 To-Do List App (Vue 3 + AWS Serverless)

🔗 **[Перейти до вебсайту →](https://eu-north-1lpg5os4os.auth.eu-north-1.amazoncognito.com/signup?client_id=5pldnhj00tdp1gqu4jqsk0983r&response_type=code&scope=email+openid&redirect_uri=https://vvlfs6eugb.execute-api.eu-north-1.amazonaws.com/dev/callback)**

Простий to-do app з авторизацією через **AWS Cognito** та збереженням завдань у **DynamoDB**.
Фронтенд реалізовано на **Vue 3**, бекенд — за допомогою **AWS Lambda** та **Serverless Framework**.

---

## 📁 Структура проєкту

```
👍 frontend/          # Інтерфейс користувача на Vue 3
👍 backend/           # Lambda-функції та конфігурація Serverless Framework
📄 README.md          # Цей файл
🔒 .gitignore         # Ігнорує node_modules, dist, env тощо
```

---

## 🚀 Фронтенд: деплой та запуск

### 📦 Встановлення залежностей

```bash
cd frontend
npm install
```

### 💠 Збірка проєкту

```bash
npm run build
```

### ☁️ Розгортання

📅 Завантажено вміст `dist/` у **S3-бакет**, налаштовано як static website hosting.
🚀 Використано **CloudFront** .

🔗 Приклад:
[https://dua9bykxw0d0w.cloudfront.net](https://dua9bykxw0d0w.cloudfront.net)

---

## ⚙️ Бекенд: AWS Lambda + Serverless

### 📦 Встановлення

```bash
cd backend
npm install
```

### 🚀 Деплой

```bash
npx serverless deploy
```

🛠️ **Використовується:** Serverless Framework v3

---

## 🔐 Авторизація через Cognito Hosted UI

Підтримується:

* ✅ Реєстрація
* ✅ Вхід
* ✅ Вихід

🔄 Після входу Cognito редіректить на API Gateway, де функція `callback` зчитує `userId` (`sub`) та зберігає його в `localStorage`.
📂 Він використовується для виконання CRUD операцій з DynamoDB.

---

## 📡 API Endpoints

📍 Базовий URL:
`https://vvlfs6eugb.execute-api.eu-north-1.amazonaws.com/dev`

| Метод | Endpoint      | Опис                             |
| ----- | ------------- | -------------------------------- |
| GET   | /getUserTasks | Отримати список завдань          |
| POST  | /addTask      | Додати нове завдання             |
| PUT   | /updateTask   | Оновити статус чи вміст завдання |
| POST  | /deleteTask   | Видалити завдання                |
| GET   | /callback     | Обробка редіректу після логіну   |

---

## 🛠️ Технології

* ⚙️ Vue 3 + Vite
* ☁️ AWS Lambda
* 🔐 Amazon Cognito (Hosted UI)
* 📂 DynamoDB
* 🌐 CloudFront + S3
* 🚀 Serverless Framework

---

## 👩‍💻 Автор

📚 Розроблено з ❤️ для навчальних цілей.
Автор: [@kariinix](https://github.com/kariinix)
