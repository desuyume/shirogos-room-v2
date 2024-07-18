# Shirogos room

Website for Twitch streamer [GODofDANGO](https://www.twitch.tv/godofdango). 

## Features
- spending currency received for watching a stream
- receiving that currency for completing tasks
- integration with Twitch and other platforms
- huge variety of customization of personal pages
- wiki/manga/story readers
- full admin panel
- and much more... 

## Stack

- React
- NestJS
- TypeScript
- TanStack Query
- Tailwind CSS
- PostgreSQL
- Prisma

## Development

### Requirements

* [Node.js](https://nodejs.org/en)
* [Pnpm](https://pnpm.io/)

### Run project

* Clone repository
```bash
git clone https://github.com/desuyume/shirogos-room-v2.git
```

* Create a .env file and transfer the data from .env.dev into it (both in the client and server folder)
  
* In .env for DATABASE_URL and SHADOW_DATABASE_URL variables create two databases in Postgres and edit them with your created data

* For Twitch .env variables go to https://dev.twitch.tv/console/apps and create Twitch application then fill them with your created data (set http://localhost:3000/api/auth/twitch/callback for OAuth Redirect URL)

* Install dependencies (both in the client and server folder)
```bash
pnpm install
```

* Prepare db and prisma (in the server folder)
```bash
pnpm run db:prepare
```

* Start dev mode (run both in the client and server)
```bash
pnpm run dev
```

* Visit http://localhost:5173
