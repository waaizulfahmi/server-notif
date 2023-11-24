const express = require("express");

const app = express();

app.use("/api/notification", require("./routes/api/notification"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server started"));
