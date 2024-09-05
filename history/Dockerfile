# Использование базового образа Node.js 16
FROM node:18-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

RUN npm install -g typescript


# Копирование исходного кода в рабочую директорию
COPY . .

# Команда по умолчанию для запуска вашего приложения
CMD ["npm", "run", "start"]

# Указываем порт, который будет открыт в контейнере
EXPOSE 5000