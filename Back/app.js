const express = require('express')
const appRoutes =  require('./app/routes/routes')
const cors = require("cors");
const app = express()

const port = process.env.PORT || 3000;


app.use(express.json());
app.use("/", appRoutes);
app.use(cors());


app.listen(port, () => console.log(`listening at port ${port}`))