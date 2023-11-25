// const express = require("express");

// const app = express();

// app.use("/api/notification", require("./routes/api/notification"));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log("server started"));

const express = require("express");
const cors = require("cors"); // Import middleware CORS

const app = express();

// Gunakan middleware CORS
app.use(cors());

app.use("/api/notification", require("./routes/api/notification"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started on port", PORT));
