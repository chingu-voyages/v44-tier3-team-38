const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const { sequelize } = require("./db/models");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(
  session.Store
);
const tripsRouter = require("./routes/api/trips");
const locationsRouter = require("./routes/api/locations");
const usersRoutes = require("./routes/api/users");
const indexRoutes = require("./routes/api/index");
const yelpRoutes = require("./routes/api/yelp");
const { encryptPassword } = require("./controllers/userHelper");
const Users = require("./db/models/")["users"];

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: "superSecret",
    store,
    saveUninitialized: false,
    resave: false,
  })
);

// create Session table if it doesn't already exist
store.sync();
// adding alter true to check table current state and make changes to always match models
sequelize
  .sync({ alter: true })
  .then(async () => {
    // creating demo user on table creation
    const user = {
      username: "jon",
      password: "snow",
      email: "jonsnow@email.com",
    };
    const isUser = await Users.findOne({
      where: { username: user.username },
    });
    if (!isUser) {
      await Users.create({
        username: user.username,
        email: user.email,
        password: encryptPassword(user.password),
      });
      console.log(user.username, "was created");
    }
  })
  .catch((error) => console.log(error));

app.use(indexRoutes);

app.use(
  "/trips/:tripId/locations",
  (req, res, next) => {
    req.tripId = req.params.tripId; // Assign the tripId to a property on the request object
    next();
  },
  locationsRouter
);

app.use(
  "/users/:userId/trips",
  (req, res, next) => {
    req.userId = req.params.userId;
    next();
  }, 
  tripsRouter
);
app.use("/users", usersRoutes);
app.use("/yelp", yelpRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
