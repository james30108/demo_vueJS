const { Sequelize } = require("sequelize")

module.exports = () => {    
    
    // create
    const create = require("mysql2").createConnection({
        host     : "localhost",
        user     : "root",
        password : "",

    })

    create.query("CREATE DATABASE IF NOT EXISTS demo_nodeJS")

    // connect
    const connect = new Sequelize("demo_nodeJS", "root", "", {
        host: "localhost",
        dialect: "mysql",
        sync: true,
        define: {
          timestamps: false
        }
    })

    return connect

}