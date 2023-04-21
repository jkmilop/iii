const express = require('express')
const appRoutes =  require('./app/routes/routes')
const cors = require("cors");
const morgan = require("morgan");
const app = express()

const port = process.env.PORT || 3000;

app.set("port", port);

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/", appRoutes);
app.use(express.urlencoded({ extended: false }));


app.listen(port, () => console.log(`listening at port ${port}`))