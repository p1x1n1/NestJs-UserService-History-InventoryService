# Проект: Сервис управления остатками товаров

## Описание
Этот проект состоит из двух микросервисов: 
1. **Inventory Service** — управляет товарами и остатками на складах и полках.
2. **History Service** — ведет запись всех изменений и действий с товарами и остатками в системе.

Для взаимодействия между микросервисами используется брокер сообщений RabbitMQ, а в качестве базы данных используется PostgreSQL. Проект поддерживает регистрацию товаров, управление их остатками и запись всех изменений в историю.


### 3. Настройка переменных окружения

#### Файл `.development.env` - для запуска локально

##### Для **Inventory Service**:
```ini
INVENTORY_PORT      = 7000
INVENTORY_PG_USER   = postgres
INVENTORY_PG_PASS   = password
INVENTORY_PG_DB     = inventory
INVENTORY_PG_PORT   = 5432
INVENTORY_PG_HOST   = localhost

RABBITMQ_URL        = amqp://localhost:5672
```

##### Для **History Service**:
```ini
HISTORY_PORT        = 5000
HISTORY_PG_USERNAME = postgres
HISTORY_PG_PASS     = password
HISTORY_PG_DB       = history
HISTORY_PG_PORT     = 5432
HISTORY_PG_HOST     = localhost
RABBITMQ_URL        = amqp://localhost:5672
```

#### Файл `.production.env` - для запуска с помощью Docker

```ini
RABBIT_USER                 = guest
RABBIT_PASSWORD             = guest
RABBITMQ_IMAGE              = rabbitmq:3-management
RABBITMQ_PORT               = 5672
RABBITMQ_MANAGEMENT_PORT    = 15672

INVENTORY_PORT      = 7000
INVENTORY_PG_USER   = postgres
INVENTORY_PG_PASS   = password
INVENTORY_PG_DB     = inventory
INVENTORY_PG_PORT   = 5432
INVENTORY_PG_HOST   = inventory-db

DB_IMAGE            = postgres:latest

HISTORY_PORT        = 5000
HISTORY_PG_USERNAME = postgres
HISTORY_PG_PASS     = password
HISTORY_PG_DB       = history
HISTORY_PG_PORT     = 5433
HISTORY_PG_HOST     = history-db

RABBIT_PORT         =5672
RABBITMQ_URL        = amqp://rabbitmq:${RABBIT_PORT}
PG_DATA             = /var/lib/postgresql/data
```


##### Для **Inventory Service**:
```ini
INVENTORY_PORT      = 7000
INVENTORY_PG_USER   = postgres
INVENTORY_PG_PASS   = password
INVENTORY_PG_DB     = inventory
INVENTORY_PG_PORT   = 5432
INVENTORY_PG_HOST   = inventory-db

RABBIT_PORT         =5672
RABBITMQ_URL        = amqp://rabbitmq:${RABBIT_PORT}
```

##### Для **History Service**:
```ini
HISTORY_PORT        = 5000
HISTORY_PG_USERNAME = postgres
HISTORY_PG_PASS     = password
HISTORY_PG_DB       = history
HISTORY_PG_PORT     = 5432
HISTORY_PG_HOST     = history-db

RABBIT_PORT         =5672
RABBITMQ_URL        = amqp://rabbitmq:${RABBIT_PORT}
```

### 4. Запуск приложений

#### Запуск **Inventory Service**:
```bash
cd inventory
npm start
```

#### Запуск **History Service**:
```bash
cd history
npm start
```

#### Запуск из Docker
```bash
docker-compose --env-file .production.env \
  -f docker-compose.rabbitmq.yml \
  -f ./history/docker-compose.history.yml \
  -f ./inventory/docker-compose.inventory.yml \
  up --build
```

## Использование API
/api/
### Inventory Service
1. **Создание товара**
   - `POST /product`
   - Тело запроса:
     ```json
     {
       "plu": 12345,
       "name": "Товар 1"
     }
     ```

2. **Создание остатка**
   - `POST /stock`
   - Тело запроса:
     ```json
     {
       "product_id": 1,
       "shop_id": 1,
       "quantity_on_shelf": 10,
       "quantity_in_order": 5
     }
     ```

3. **Увеличение/уменьшение остатков**
   - `PATCH /stock/increase` и `PATCH /stock/decrease`
   - Тело запроса:
     ```json
     {
       "stock_id": 1,
       "quantity_on_shelf": 5,
       "quantity_in_order": 2
     }
     ```
4.  **Получение остатков**
 - `GET /stock`
   - Параметры запроса:
     - `shop_id` — ID магазина
     - `plu` — артикул товара
     - `quantity_on_shelf_min`, `quantity_on_shelf_max` — диапазон количества товаров на полке
      - `quantity_on_order_min`, `quantity_on_order_max` — диапазон количества товаров в заказе

### History Service
1. **Получение истории действий**
   - `GET /history`
   - Параметры запроса:
     - `shop_id` — ID магазина
     - `plu` — артикул товара
     - `date_from`, `date_to` — диапазон дат
     - `action` — тип действия (create, update и т.д.)
     - `page` - номер страницы
     - `pageSize` - количество элментов на странице

