const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
// Import passport middleware
require("./middlewares/passport-middleware");

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:4000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const applicantRoutes = require("./routes/applicants");

app.use("/api", authRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/apply", applicantRoutes);

// app.use(express.static(path.join(__dirname, "./client/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/dist/index.html"));
// });

const runApp = () => {
  try {
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

runApp();
