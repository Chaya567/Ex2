import express from "express"
let router = express.Router()

import controlVaccinationToUser from "../control/VaccinationToUserControl.js";



router.get("/:userId",controlVaccinationToUser.getVaccinationToUserByIDControl);
router.post("/",controlVaccinationToUser.addVaccinationToUserControl);


export default router;