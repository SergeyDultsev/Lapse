# Lapse

Пет-проект блога на современном fullstack-стеке: NestJS + PostgreSQL на backend, Next.js (App Router, FSD) на frontend.

## Стек

**Backend**
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/) + [PostgreSQL](https://www.postgresql.org/)
- JWT в httpOnly-cookie (access + refresh), Passport, bcrypt, class-validator

**Frontend**
- [Next.js](https://nextjs.org/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query/latest), [SCSS Modules](https://sass-lang.com/) (BEM), Feature-Sliced Design

**Инфраструктура**
- Docker Compose: `backend` (Node 20), `frontend` (Node 20), `db` (PostgreSQL 16), `redis` (Redis 7)

## Требования

- [Node.js](https://nodejs.org/) v20+
- [Docker](https://www.docker.com/) с плагином Compose

## Быстрый старт (Docker)

```bash
git clone https://github.com/SergeyDultsev/Lapse.git
cd Lapse

docker compose up -d --build
```

Готово:
- 🖥 Frontend — http://localhost:5000
- ⚙️ Backend API — http://localhost:3000
- 🐘 PostgreSQL — `localhost:5432` (логин/пароль/БД: `lapse`)
- 🟥 Redis — `localhost:6379`

При старте контейнера backend сам:
1. создаёт `.env` из `.env-example` (если файла нет);
2. накатывает миграции (`migration:run`);
3. запускает сидер (`seed`) — создаёт демо-пользователя, если таблица пользователей пуста.

**Демо-доступ:** `admin@lapse.com` / `password`

## Повседневные команды

| Задача | Команда |
|---|---|
| Логи сервиса | `docker compose logs -f backend` |
| Шелл в контейнере backend | `docker compose exec backend sh` |
| Запустить сидеры вручную | `docker compose exec backend npm run seed` |
| Накатить миграции | `docker compose exec backend npm run migration:run` |
| Откатить последнюю миграцию | `docker compose exec backend npm run migration:revert` |
| Сгенерировать миграцию | `docker compose exec backend npm run migration:generate` |
| Пересобрать и перезапустить сервис | `docker compose up -d --build backend` |
| Остановить всё | `docker compose stop` |
| Остановить и удалить данные БД | `docker compose down -v` |

Сидеры идемпотентны: если пользователи уже есть в базе, повторный запуск ничего не изменит.

## Локальная разработка без Docker

<details>
<summary>Backend</summary>

```bash
cd backend
npm install
cp .env-example .env
# в .env поменять POSTGRES_HOST=db → POSTGRES_HOST=localhost
npm run start:dev
```

</details>

<details>
<summary>Frontend</summary>

```bash
cd frontend
npm install --legacy-peer-deps
cp .env-example .env
# при локальном запуске API_URL=http://localhost:3000
npm run dev
```

Откроется на http://localhost:5000.

</details>

## Переменные окружения

Создавайте из `.env-example` в каждом пакете (в Docker это происходит автоматически).

**Backend (`backend/.env`)**

| Переменная | По умолчанию | Описание |
|---|---|---|
| `POSTGRES_HOST` | `db` | Хост БД (`db` в Docker, `localhost` — локально) |
| `POSTGRES_PORT` | `5432` | Порт PostgreSQL |
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | `lapse` | Доступ к БД |
| `JWT_SECRET` | — | Секрет access-токена |
| `JWT_REFRESH_SECRET` | — | Секрет refresh-токена |
| `JWT_ACCESS_EXPIRES_IN` | `15m` | Время жизни access-токена |
| `JWT_REFRESH_EXPIRES_IN` | `7d` | Время жизни refresh-токена |
| `COOKIE_SECURE` | `false` | `Secure`-куки (включать только за HTTPS) |

**Frontend (`frontend/.env`)**

| Переменная | По умолчанию | Описание |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3000` | Адрес API для браузера |
| `API_URL` | `http://backend:3000` | Адрес API для server components (`localhost:3000` вне Docker) |

> ⚠️ `NODE_ENV=production` отключает автосинхронизацию схемы TypeORM — в production схема накатывается только миграциями.

## Структура проекта

```
├── backend/            # NestJS API
│   └── src/
│       ├── resources/  # auth, user, post, comment (модули NestJS)
│       ├── config/     # БД, JWT, CORS, cookie
│       ├── database/   # seeds
│       └── common/     # dto, фильтры, декораторы, утилиты
├── frontend/           # Next.js (FSD)
│   └── src/
│       ├── app/        # роутинг: (public) и (protected) группы
│       ├── modules/    # фичи: auth, posts, users, settings
│       ├── widgets/    # app-header, nav-bar
│       ├── shared/     # ui-kit, api-клиент, конфиги, утилиты
│       └── providers/  # Query, Theme, Modal
└── docker-compose.yaml
```

## Полезные npm-скрипты

**Backend:** `start:dev` (watch-режим), `build`, `lint`, `test`, `seed`, `migration:generate` / `migration:run` / `migration:revert`, `shell` (шелл в docker-контейнере).

**Frontend:** `dev` (порт 5000), `build`, `lint`, `format`.

## Автор

- [Сергей Дульцев](https://t.me/sergey_dultsev) — FullStack Engineer
