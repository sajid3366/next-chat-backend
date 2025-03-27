import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMassage, getUsersSidebar, sendMessage } from "../controllers/message.controller.js";
const router = express.Router();




router.get("/users", protectRoute, getUsersSidebar)
router.get("/:id", protectRoute, getMassage)

router.post("/send/:id", protectRoute, sendMessage)

export default router;

