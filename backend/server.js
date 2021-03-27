const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const logger = require('express-logger')
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db')

const usersRoutes = require('./routes/users')


dotenv.config({ path: './config/config.env' })

connectDB()

const app = express();


app.use(cors())



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/backend/nodeserver/images", express.static('images'))

// app.use("/images", express.static(path.join("nodeserver/images")));
//app.use(session({ secret: 'feeling hot hot hot' }));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(logger({ path: "log/express.log" }));
app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use("/api/auth", usersRoutes)

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const PORT = 4000


app.listen(PORT, () => {
  console.log(`Server up on ${PORT}` )
})