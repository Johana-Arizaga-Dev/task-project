import { Router } from "express";
import {
  getTasks,
  createTask,
  deleteTask,
  toggleTask,
} from "../controllers/tasks.controller.js";

import { authRequired } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authRequired);

router.get("/", getTasks);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.put("/:id", toggleTask);


export default router;
