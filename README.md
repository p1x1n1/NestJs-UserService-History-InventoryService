# User Service API

Сервис для работы с пользователями, реализованный с использованием NestJS и TypeORM. В проекте подключен Swagger для удобной документации API.

## Описание

Сервис включает:

- Возможность работы с пользователями: хранение и управления данными, сброс флага проблем и подсчет пользователей с проблемами.
- Генерацию миллиона пользователей с помощью миграции TypeORM.
- Документацию API через Swagger.


## Настройка

### Переменные окружения

В проекте используются `.env` файлы для настройки различных окружений (production и development).

1. Создайте файлы `.development.env` и `.production.env` в корневой директории проекта. Пример:

   ```env
USER_SERVICE_PORT        =4000

USER_PORT                =4000
USER_POSTGRES_HOST       =localhost
USER_POSTGRES_USER       =postgres
USER_POSTGRES_PASSWORD   =password
USER_POSTGRES_PORT       =5432
USER_POSTGRES_DB         =user_db
   ```

2. Настройте другие переменные окружения в зависимости от ваших нужд.

## Swagger

Swagger подключен для документирования API. Документация доступна по адресу:

```
http://localhost:3000/api/docs
```

## Команды

- `npm run start:dev` — Запуск приложения в режиме разработки.
- `npm run start:prod` — Запуск приложения в production.
- `npm run migration:run` — Выполнение миграций.
- `npm run migration:revert` — Откат миграций.
- `docker-compose --env-file .production.env up` - Запуск через Docker
