import express from "express"
let router = express.Router()


import controlVaccinations from "../control/VaccinationControl.js";


router.get("/",controlVaccinations.getAllVaccinationsControl);
router.get("/:vaccinationCode",controlVaccinations.getVaccinationByCodeControl);
router.post("/",controlVaccinations.addVaccinationControl);

export default router;