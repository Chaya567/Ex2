import connection from "../myDB.js";


//צפייה בכל המשתמשים
const getAllUsersControl = async (req, res) => {
  const getAllUsers = `SELECT * FROM user`
  const user = await connection.query(getAllUsers);
  res.send(user[0]);

}


const getAllUserByIDControl = async (req, res) => {
  try {
    const { userId } = req.params;
    const getAllDetailes=`SELECT * FROM user JOIN vaccinationToUser ON user.userId = vaccinationToUser.userId JOIN corona ON  user.userId = corona.userId WHERE user.userId='${userId}'`;
    ;
    const user = await connection.query(getAllDetailes);
    res.send(user[0]);
  } catch (err) {
    console.log(err);
    res.status(400).send("שגיאה");
  }
}


//ID צפייה במשתמש לפי
const getUserByIDControl = async (req, res) => {
  try {

    const { userId } = req.params;
    const getUserByID = `SELECT * FROM user WHERE userId='${userId}'`;
    const user = await connection.query(getUserByID);
    res.send(user[0]);
  }
  catch (err) {
    console.log(err)
    res.status(400).send("שגיאה");
  }
}


const addUserControl = async (req, res) => {
  try {
    const { userId, firstName, lastName, city, adress, homeNumber, B_Day, telephone, phone} = req.body;
    // בודק שהמשתמש לא קיים כבר
    const checkUser = `SELECT * FROM user WHERE userId='${userId}'`;
    const [existingUser] = await connection.query(checkUser);
    if (existingUser.length > 0) {
      return res.status(400).send("משתמש קיים במערכת");
    }
    // הוספה
    const addUser = `INSERT INTO user (userId,firstName,lastName,city,adress,homeNumber,B_Day,telephone,phone) VALUES ('${req.body.userId}','${firstName}','${lastName}','${city}','${adress}','${homeNumber}',STR_TO_DATE('${req.body.B_Day}', '%Y-%m-%dT%H:%i:%s.%fZ'),'${telephone}','${phone}')`
    const user = await connection.query(addUser);
    res.send(user)
  }
  catch (err) {
    console.log(err)
    res.status(400).send("שגיאה");
  }
}


export default { getUserByIDControl, getAllUsersControl, addUserControl,getAllUserByIDControl }