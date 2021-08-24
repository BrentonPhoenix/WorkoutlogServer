const { DataTypes } = require("sequelize");
const database = require("../database");

const Log = database.define("workoutLog", {
   description: {
       type: DataTypes.STRING,
       allowNull: false
       
    },
    definition: {
        type: DataTypes.STRING,
        allowNull: false
    },
    result: {
        type: DataTypes.STRING
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


module.exports = Log;