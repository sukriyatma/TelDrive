# Telegram Drive with Elysia Frameworks 
Cloud storage using Telegram to store files. Save your files directly on Telegram and access them at your convenience, ensuring ease of use and efficient data management.

## Tech Stack
- Bun v1.1.7
- Typescript
- [Elysia](https://github.com/elysiajs/elysia) Web Framework
- [Postgresql](https://www.postgresql.org/) RDBMS
- [Prisma](https://github.com/prisma/prisma) ORM
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) Telegram Bot API module

## Usage
1. Clone the repository:
```bash
git clone https://github.com/sukriyatma/TelDrive
```
2. Install dependency
```bash
bun install
```

3. Migrate the database:
```bash
prisma migrate dev
```

4. To start the development server run:
```bash
bun run dev
```

## API Docs
All API documentation can be accessed on [TelDrive.postman_collection.json](TelDrive.postman_collection.json)