require("dotenv").config();
const Express = require('express');
const app = Express();
const databaseConnection = require("./database")

app.use(Express.json())

const controllers = require("./controllers")

/*
app.use('/test', (req,res) =>{
    res.send('Testing endpoints on the server')
})

//test endpoint works
*/


app.use("/user", controllers.userControllers)

app.use("/log", controllers.logControllers)





databaseConnection.authenticate()
    .then(() => databaseConnection.sync())
    .then(() => {
        app.listen(4000, () => {
            console.log(`[Server]: App is listening on 4000`)
        })
    })
    .catch((err) => {
       console.log(`[Server]: Server crashed. Error = ${err}`)
    })