import express from "express"
let router = express.Router()

import controlUsers from "../control/UserControl.js";

router.get("/all/:userId",controlUsers.getAllUserByIDControl);
router.get("/",controlUsers.getAllUsersControl);
router.get("/:userId",controlUsers.getUserByIDControl);
router.post("/",controlUsers.addUserControl);


export default router;