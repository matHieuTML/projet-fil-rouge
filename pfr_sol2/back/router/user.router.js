import express from "express";

import { getUsers, signup, sign, userInfo, manageList } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/getUsers", getUsers)
router.post("/signup", signup);
router.post("/sign", sign);
router.post("/info", userInfo);
router.post("/manageList", manageList);



export default router;