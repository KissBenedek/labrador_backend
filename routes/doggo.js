import express from "express"
import { db, dbQuery, dbRun } from "../database.js"


const router = express.Router()


router.get("/szerviz", async (req, res, next) => {
    try{
        const users = await dbQuery("SELECT * FROM kutyaszerviz");
        res.status(200).json(users);
    }
    catch (err){
        next(err);
    }
})

router.get("/szerviz/:id", async (req, res, next) => {
    try{
        const [user] = await dbQuery("SELECT * FROM kutyaszerviz WHERE id=?;", [req.params.id]);
        if(!user) res.status(404).json({ message: "Felhasználó nem található"})
        res.status(200).json(user);
    }
    catch (err){
        next(err);
    }
})

router.post("/szerviz", async (req, res, next) => {
    try{
        const result = await dbRun("INSERT INTO kutyaszerviz (fajta, haviDij, kezelesSzam, uzenetek) VALUES (?, ?, ?, ?);", [req.body.fajta, req.body.haviDij, req.body.kezelesSzam, req.body.uzenetek]);
        console.log(result)
        console.log(JSON.stringify(result))
        // res.status(201).json({id: result.lastID, ...req.body})
    }
    catch(err){
        next(err)
    }
})


export default router;