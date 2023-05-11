import connection from "../myDB.js";


//צפייה בכל החיסונים
const getAllVaccinationsControl = async (req, res) => {
  const getAllVaccinations = `SELECT * FROM vaccination`
  const vaccination = await connection.query(getAllVaccinations);
  res.send(vaccination[0]);

}

//צפיה בחיסון לפי קוד
const getVaccinationByCodeControl = async (req, res) => {
  try {
    const { vaccinationCode } = req.params;
    const getVaccinationByCode = `SELECT * FROM vaccination WHERE vaccinationCode='${vaccinationCode}'`;
    const vaccination = await connection.query(getVaccinationByCode);
    res.send(vaccination[0]);
  }
  catch (err) {
    console.log(err)
    res.status(400).send("שגיאה");
  }
}



const addVaccinationControl = async (req, res) => {
  try {
    const { vaccinationCode, vaccinationNumber, manufacurer} = req.body;
    // בודק שלא נכנסים ערכים כפולים
    const checkVaccination = `SELECT * FROM vaccination WHERE vaccinationNumber='${vaccinationNumber}' AND manufacurer='${manufacurer}'`;
    const [existingRecord] = await connection.query(checkVaccination);
    if (existingRecord.length > 0) {
      return res.status(400).send("Record with those values already exists");
    }

    // הוספה
    const addVaccination = `INSERT INTO vaccination (vaccinationCode, vaccinationNumber, manufacurer) VALUES ('${vaccinationCode}','${vaccinationNumber}','${manufacurer}')`;
    const vaccination = await connection.query(addVaccination);
    res.send(vaccination);
  } catch (err) {
    console.log(err);
    res.status(400).send("שגיאה");
  }
}


export default { getVaccinationByCodeControl, getAllVaccinationsControl, addVaccinationControl }