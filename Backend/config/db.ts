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
import {Sequelize} from "sequelize"
const seq=new Sequelize("rent-a-time","liztdtctdbhodz544pj0","pscale_pw_1rphZm2ijMFxxzXsEaNXCIPkcyrW9j3OfQQx4Ng3gPb",{
    host:"aws.connect.psdb.cloud",
    dialect:"mysql",
    "dialectOptions": {
        "ssl": {
          "rejectUnauthorized": true,
        }
    }
})

export default seq