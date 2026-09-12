## Реализовано
- Авторизация/Регистрация

## Docker (только с запущенными контейнерами)
```bash
# Генерация миграций
docker compose exec backend npm run migration:generate
```

```bash
# Запуск миграций
docker compose exec backend npm run migration:run
```

## Технологии
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)