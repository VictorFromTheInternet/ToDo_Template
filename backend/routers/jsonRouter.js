import { error } from 'console';
import { FILE } from 'dns';
import express from 'express';
import fs from 'fs:node/promises';
import path from 'path';

const router = express.Router();

const FILE_PATH = path.join('..', 'db.json');

// get all
router.get('/', (req,res)=>{
    try{
        console.log(FILE_PATH)
        res.send(FILE_PATH)

    }catch(err){
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// get by id


// create


// update


// delete by id



export default router; 