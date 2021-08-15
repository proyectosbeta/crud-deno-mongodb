import { Application } from "./deps.ts";
import router from "./app/routes/index.ts";
import { APP_HOST, APP_PORT, APP_DOMAIN } from "./app/config/index.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on: ${APP_DOMAIN}`);

await app.listen(`${APP_HOST}:${APP_PORT}`);