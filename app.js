
import  express  from "express";
import path from "path";
import cors from "cors";

 import user from "./routes/UserRoute.js"
 import vaccination from "./routes/VaccinationRoute.js"
 import corona from "./routes/CoronaRoute.js"
 import vaccinationToUser from "./routes/VaccinationToUserRoute.js"



const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            
  optionSuccessStatus: 200
}


var app = express();
app.use(express.json({type:["application/json","text/plain"]}));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/user",user)
app.use("/vaccination",vaccination)
app.use("/corona",corona)
app.use("/vaccinationToUser",vaccinationToUser)

app.listen(8080);


