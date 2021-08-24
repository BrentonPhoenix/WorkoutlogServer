const { DataTypes } = require("sequelize");
const database = require("../database")

const User = database.define("user", {
    username: {
       type: DataTypes.STRING,
       allowNull: false,
       unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
     },
    password: {
        type:DataTypes.STRING
    }
})

module.exports = User;