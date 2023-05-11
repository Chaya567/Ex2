
import connection from "../myDB.js";


//צפיה בכל חולי הקורונה
const getAllCoronaControl = async (req, res) => {
  const getAllCorona = `SELECT * FROM corona`
  const corona = await connection.query(getAllCorona);
  res.send(corona[0]);

}




//צפיה בחולה לפיID 
const getCoronaByIDControl = async (req, res) => {
  try {
    const { userId } = req.params;
    const getCoronaByID = `SELECT * FROM corona WHERE userId='${userId}'`;
    const corona = await connection.query(getCoronaByID);
    res.send(corona[0]);
  }
  catch (err) {
    console.log(err)
    res.status(400).send("שגיאה");
  }
}

const addCoronaControl = async (req, res) => {
  try {
    const {userId, recoveryDate, resultDate} = req.body;
    // בודק אם תאריך ההחלמה התוצאה החיובית קודם לתאריך ההחלמה
    if (new Date(resultDate) >= new Date(recoveryDate)) {
      return res.status(400).send("תאריך לא חוקי");
    }
    // בדיקה שהמשתמש קיים במערכת
    const checkUser = `SELECT * FROM corona WHERE userId='${userId}'`;
    const [existingRecord] = await connection.query(checkUser);
    if (existingRecord.length > 0) {
      return res.status(400).send("משתמש כבר קיים במערכת");
    }
    // הוספה
    const addCorona = `INSERT INTO corona (userId, recoveryDate, resultDate) VALUES ('${userId}',STR_TO_DATE('${req.body.recoveryDate}', '%Y-%m-%dT%H:%i:%s.%fZ'), STR_TO_DATE('${req.body.resultDate}', '%Y-%m-%dT%H:%i:%s.%fZ'))`;
    const corona = await connection.query(addCorona);
    res.send(corona)
  }
  catch (err) {
    console.log(err)
    res.status(400).send("שגיאה");
  }
}




export default { getCoronaByIDControl, getAllCoronaControl, addCoronaControl }