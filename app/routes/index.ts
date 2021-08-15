import { Router } from "../../deps.ts";
import { router as routerBook } from "./book.ts";

const router = new Router();

router.use(routerBook.routes());

export default router;