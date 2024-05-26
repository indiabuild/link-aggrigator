## IndiaBuild.tech

HackerNews like Link Aggrigation / Sharing.

Live: https://indiabuild.tech

### Development

#### Stack

- Solid.js
- SolidStart
- TailwindCSS
- Docker
- Task (Taskfile.dev)

After cloning

Create a `.env` and `.env.prod` file using

```bash
cp .example.env .env
cp .example.env .env.prod
```

Start Postgres db

```bash
task db:up
```

Migrate DB

```bash
task db:migrate:dev
```

1. Install the dependencies

```bash
pnpm install
```

2. Run Dev server

```bash
pnpm dev
```

Start Listenting on http://127.0.0.1:5555

### Docker setup

Required

- Docker
- Docker Compose

```bash
docker-compose up
```

### Reference

- [SolidStart For Newbies](https://vladislav-lipatov.medium.com/solid-start-guide-for-newbies-e1d65212dd07)
