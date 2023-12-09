import cors from "cors";
import express from "express";
import router from "./routes/index";
import database, { sqlConfig } from "./database/database";

const app = express();
const port = 3030;
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(router);
database.connect(sqlConfig, (err) => {
  if (err) {
    console.log("Error while connecting database: " + err);
  } else {
    console.log("Connected to database");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
