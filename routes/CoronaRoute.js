import express from "express"
let router = express.Router()

import controlCorona from "../control/CoronaControl.js";


router.get("/",controlCorona.getAllCoronaControl);
router.get("/:userId",controlCorona.getCoronaByIDControl);
router.post("/",controlCorona.addCoronaControl);

export default router;