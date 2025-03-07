import sqlite3 from "sqlite3"


const db = new sqlite3.Database("./database.sqlite");

const initializeDB = async () => {
    console.log("DB initialization");
    await dbRun("CREATE TABLE IF NOT EXISTS kutyaszerviz (id INTEGER PRIMARY KEY AUTOINCREMENT, fajta TEXT, haviDij INTEGER, kezelesSzam TEXT, uzenetek TEXT)");
    const dogs = await dbQuery("SELECT * FROM kutyaszerviz")
    console.log(dogs)
}

function dbRun(sql, params = []){
   return new Promise((resolve, reject) => {
        db.run(sql, params, (err, rows) => {
            if(err) reject(err)
            else resolve(rows)
        })
   })
}

function dbQuery(sql, params = []){
    console.log("dbQuery: " + sql)
    return new Promise((resolve, reject) => {
        db.all(sql, params, function(err){
            if(err) reject(err)
            else resolve(this)
        })
    })
}


export {db, initializeDB, dbRun, dbQuery};
