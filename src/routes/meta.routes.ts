import { Router } from "express";
import { MetaController } from "../controllers/meta.controller";
import { auth } from "../middleware/auth";

const router = Router();

router.use(auth);

router.get('/health', MetaController.health);
router.get('/sync', MetaController.sync);
router.get('/sync/status', MetaController.syncStatus);

export default router;