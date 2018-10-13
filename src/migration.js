
/**
*
* Resets the database.
*
**/ 


const { db } = require("../config/config")
const { client } = require("../config/db_conf")

client.connect()

const queries = [db.drop, db.schema]
const promises = queries.map((query) => client.query(query))

Promise.all(promises)
  .then(() => {
    console.log("Succesful migration.")
    client.end()
  })
  .catch(err => console.log(err.stack))
