import { Router } from "express";
import ActionHistoryContoller from "./action.controller";

const router = Router();

router.get('/history',ActionHistoryContoller.getHistory);

export default router;