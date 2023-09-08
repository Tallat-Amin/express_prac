const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cookieParser = require("cookie-parser");

// const mongoose = require("mongoose");
// const passport = require("passport");
// const passportJWT = require("passport-jwt");
// const jwt = require("jsonwebtoken");

const authRoutes = require("./routes/authRoutes");

app.set("view engine", "ejs");

// <------------------------------------- Middleware ------------------------------------->
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(passport.initialize());

// <------------------------------------- Strategy ------------------------------------->
const dbConnect = require("./config/dbConnect");
dbConnect();

// <------------------------------------- Strategy ------------------------------------->
// const JWTStrategy = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;
//
// const users = [
//   { id: "0", username: "admin", password: "password" },
//   { id: "1", username: "user", password: "password" },
// ];
// const secretKey = "my_secret_key";
// const opts = {
//   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//   secretOrKey: secretKey,
// };
//
// passport.use(
//   new JWTStrategy(opts, (jwtPayload, done) => {
//     const user = users.find((u) => u.id === jwtPayload.sub);
//     if (user) {
//       return done(null, user);
//     } else {
//       return done(null, false);
//     }
//   }),
// );

// <------------------------------------- Routes ------------------------------------->
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const user = users.find(u => (u.username === username && u.password === password));
//     if (user) {
//         const payload = { sub: user.id, username: user.username };
//         const token = jwt.sign(payload, secretKey);
//         res.json({ token: token });
//     } else {
//         res.status(401).json({ message: 'Authentication failed!' });
//     }
// });
//
// app.get("/protected", passport.authenticate('jwt', { session: false }), (req, res) => {
//     res.json({ message: 'Protected route access success' });
// });

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.use(authRoutes);

// <------------------------------------- Cookies ------------------------------------->
// app.get("/set-cookies", (req, res) => {
//   // res.setHeader("Set-Cookie", "newUser=true");
//   res.cookie("newUser", true, { httpOnly: true });
//   res.send("cookie received");
// });

// <------------------------------------- End ------------------------------------->
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
