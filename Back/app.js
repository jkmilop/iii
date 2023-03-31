const express = require('express')
const appRoutes =  require('./src/client/routes')

const app = express()

const port = 3000;


app.use(express.json());
app.use("/", appRoutes);


app.listen(port, () => console.log(`listening at port ${port}`))