import connection from "../myDB.js";

const getVaccinationToUserByIDControl = async (req, res) => {
    try {
      const { userId } = req.params;
      const getVaccinationToUserByID = `SELECT * FROM vaccinationtouser WHERE userId='${userId}'`;
      const vaccinationoser = await connection.query(getVaccinationToUserByID);
      res.send(vaccinationoser[0]);
    }
    catch (err) {
      console.log(err)
      res.status(400).send("שגיאה");
    }
  }

  
const addVaccinationToUserControl = async (req, res) => {
  try {
    const { vaccinationToUserCode, userId, vaccinationCode,receiptOfVaccinationDate} = req.body;
    //בדיקה אם משתמש קיים בטבלת משתמשים
    const checkUser = `SELECT * FROM user WHERE userId='${userId}'`;
    const [existingUser] = await connection.query(checkUser);
    if (existingUser.length === 0) {
      return res.status(400).send("פציינט לא קיים במערכת");
    }
    // בדיקה אם קיבל פחות מ4 חיסונים
    const checkVaccinationToUser = `SELECT COUNT(*) as count FROM vaccinationtouser WHERE userId='${userId}'`;
    const [result] = await connection.query(checkVaccinationToUser);
    if (result[0].count >= 4) {
      return res.status(400).send("פציינט יכול לקבל עד 4 חיסונים");
    }
    // הוספה
    const addVaccinationToUser = `INSERT INTO vaccinationtouser (vaccinationToUserCode, userId, vaccinationCode, receiptOfVaccinationDate) VALUES ('${vaccinationToUserCode}','${userId}','${vaccinationCode}',STR_TO_DATE('${req.body.receiptOfVaccinationDate}', '%Y-%m-%dT%H:%i:%s.%fZ'))`;
    const vaccinationToUser = await connection.query(addVaccinationToUser);
    res.send(vaccinationToUser);
  } catch (err) {
    console.log(err);
    res.status(400).send("שגיאה");
  }
}

  
  export default { getVaccinationToUserByIDControl,addVaccinationToUserControl}