const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("config");
const app = express();
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");

//Body Parser
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

const db = config.get("mongoURI");

//Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

if (process.env.NODE_ENV == "production") {
  //Set static folder
  app.use(express.static("crud-app-react/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "crud-app-react", "build", "index.html"));
  });
}
//Routes
app.use("/api/register", require("./routes/api/register"));
app.use("/api/service-centre-register", require("./routes/api/service-centre-register"));
app.use("/api/login", require("./routes/api/login"));
app.use("/api/service-centre-login", require("./routes/api/service-centre-login"));
app.use("/api/auth", require("./routes/api/auth-user"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/service", require("./routes/api/service"));
app.use("/api/service-details", require("./routes/api/service-details"));
app.use("/api/service-provided", require("./routes/api/service-provided"));
app.use("/api/service-centres", require("./routes/api/service-centres"));
app.use("/api/requested-service", require("./routes/api/requested-service"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
