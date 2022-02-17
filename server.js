// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const cookieSession = require("cookie-session");
const app = express();
const morgan = require("morgan");

app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// import the routers
const logoutRouter = require("./routes/logout-router");
const loginRouter = require("./routes/login-router");
const registerRouter = require("./routes/register-router");
const userSettingsRouter = require("./routes/user-settings-router");
const searchRouter = require("./routes/search-router");
const resourceRoutes = require("./routes/resource-router");

// tell express to use the routes as middleware
app.use("/logout", logoutRouter(db));
app.use("/login", loginRouter(db));
app.use("/register", registerRouter(db));
app.use("/user-settings", userSettingsRouter(db));
app.use("/search", searchRouter(db));
app.use("/resources", resourceRoutes(db));

// import the routers
// tell express to use the routes as middleware
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  const templateVars = {
    loggedIn: req.session.loggedIn,
    userID: req.session.userID,
    username: req.session.username,
  };
  res.render("index", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

module.exports = { db };
