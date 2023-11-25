// const express = require("express");

// const app = express();

// app.use("/api/notification", require("./routes/api/notification"));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log("server started"));

const express = require("express");
const cors = require("cors");
const app = express();

// Middleware to handle CORS globally
app.use(cors());

// Middleware to handle OPTIONS requests for specific route
app.options("/api/notification/sendToAll", cors());

// Your API routes
app.use("/api/notification", require("./routes/api/notification"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started on port", PORT));
