// import {Sequelize} from 'sequelize'
// const sequelize = new Sequelize({

// })


// {//method 2 for connected to db
// require('dotenv').config()
// const mysql = require('mysql2')
// const connection = mysql.createConnection(process.env.DATABASE_URL)
// console.log('Connected to PlanetScale!')
// // connection.end()

// export default connection;
//}
import * as dotenv from 'dotenv'
dotenv.config()
import {Sequelize} from "sequelize"
const seq=new Sequelize("rent-a-time",process.env.US,process.env.PAS ,{
    host: process.env.HOST,
    dialect:"mysql",
    "dialectOptions": {
        "ssl": {
          "rejectUnauthorized": true,
        }
    }
})

export default seq