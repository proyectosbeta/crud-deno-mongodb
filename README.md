# Description

An example of an API in deno using Oak and MongoDB.

# Tecnologies

- DenoJS
- Oak
- MongoDB

# Development

## Install

```bash
deno install --allow-read --allow-run --allow-write -f --unstable https://deno.land/x/denon/denon.ts
```

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
denon start
```

## Upgrade Deno

```bash
deno upgrade
deno cache --reload app.ts --unstable
```

# Try in API client

Method GET:

- [All books](http://localhost:4500/api/book)
- [Get a book](http://localhost:4500/api/book/id)

Method POST:

- [Create book](http://localhost:4500/api/book)
```json
{
    "title": "JavaScript",
    "description": "The best book for JavaScript developer",
    "author": "Peter Parker",
    "link": "www.amazon.com"
}
```

Method PUT:

- [Update book](http://localhost:4500/api/book/id)
```json
{
    "title": "JavaScript",
    "description": "The best book for JavaScript developer",
    "author": "Peter Parker Smith",
    "link": "www.amazon.de"
}
```

Method Delete:

- [Delete book](http://localhost:4500/api/book/id)
