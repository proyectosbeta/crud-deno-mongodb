# Description

An example of an API in deno using Oak and MongoDB.

# Tecnologies

- DenoJS

# Development

## Config

Copy .env.example file

```
cp .env.example .env
```

#### Constants

Change the constants.

```
APP_PORT=4500
APP_HOST="0.0.0.0"
APP_DOMAIN="http://xxx.xxx.xxx.xxx:4500/"
```

## Run

```bash
deno run --allow-net --allow-read --unstable app.ts
```

## Upgrade Deno

```bash
deno upgrade
deno cache --reload app.ts
```

# Try in API client

Method GET:

- [All books](http://localhost:4500/api/book)
- [Book id](http://localhost:4500/api/book/1)