const Express = require("express")
const router = Express.Router()
const validateJWT = require("../middleware/jwtValid")
const { LogModel } = require("../models")



//allows user to create a workout log from the model
router.post("/", validateJWT, async(req,res) =>{
    const { description, definition, result} = req.body
    const { id } = req.user
    const workLog = {
        description,
        definition,
        result,
        owner_id: id
    }
    try{
        const newWorkLog = await LogModel.create(workLog)
        res.status(200).json(newWorkLog)
    } catch(err) {
        res.status(500).json({error: err})
    }
})

//---------gets all logs for an existing user
router.get("/", validateJWT,  async(req,res) =>{
    const { id } = req.user
    try{
        const entries = await LogModel.findAll({
            where:{
                owner_id: id
            }
        })
        res.status(200).json(entries)
    } catch (err){
        res.status(500).json({error: err})
    }
})

//gets individual logs by id for a user   
//user id here?
router.get("/:owner_id", validateJWT, async (req,res) =>{
    const { owner_id } = req.params
    try{
        const results = await LogModel.findAll({
            where: {owner_id: owner_id}
        })
        res.status(200).json(results)
    } catch(err){
        res.status(500).json({error: err})
    }

})

//allows individual user to update a log use id on the log
router.put("/create/:Id",validateJWT , async(req,res) => {
    const { description, definition, result } = req.body
    const logId = req.params.Id
    const userid = req.user.id
    const query = {
        where: {
            id: logId,
            owner_id: userid
        }
    }
    const updatedLog = {
        description: description,
        definition: definition,
        result: result
    }
    try{
        const update = await LogModel.update(updatedLog, query)
        res.status(200).json(update)
    } catch(err) {
        res.status(500).json({error: err})
    }
})

//allows user to delete individual logs use id on the log
router.delete('/delete/:id', validateJWT, async(req,res) => {
    const ownerId = req.user.id;
    const logid = req.params.id
    
    try{
       const query ={
           where: {
               id: logid,
               owner_id: ownerId
           }
       }
       await LogModel.destroy(query)
       res.status(200).json({
           message: "Workout Log Deleted"
       })
    } catch(err){
        res.status(500).json({
            error: err
        })
    }
})
module.exports = router;