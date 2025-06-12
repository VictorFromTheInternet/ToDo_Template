import express from 'express';
import fs from 'fs/promises';
import {fileURLToPath} from 'url';
import path from 'path';
import dotenv from 'dotenv'
dotenv.config();
import {v4 as uuidv4} from 'uuid';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_PATH = path.join(__dirname, '..', 'db.json');

// get all
export const getAll = async (req,res) =>{
    try{
        
        const response = await fs.readFile(FILE_PATH, 'utf-8')
        const data = JSON.parse(response).todoList

        res.status(200).json(data);

    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

// get by id
export const getById = async (req,res) =>{
    try{
        
        const response = await fs.readFile(FILE_PATH, 'utf-8')
        const data = JSON.parse(response).todoList
        const record = data.filter((elm)=>{
            return elm.id === req.params.id;
        })

        res.status(200).json(record);

    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

// create
export const create = async (req,res) =>{
    try{

        const {title, description} = req.body;
        const newRecord = {
            "id": uuidv4(),
            "title": title,
            "description": description,
            "completed": false
        }

        const response = await fs.readFile(FILE_PATH, 'utf-8');
        const data = JSON.parse(response).todoList

        const updatedData = JSON.stringify({
            todoList: [...data, newRecord]
        })

        await fs.writeFile(FILE_PATH, updatedData);

        res.status(201).json(newRecord);

    }catch(err){
        console.error(err)
        res.status(500).json({error: 'Internal Server Error'});
    }
}

// update
export const update = async (req,res) =>{
    try{

        const {title, description, completed} = req.body;
        const updateRecord = {            
            "title": title,
            "description": description,
            "completed": completed
        }

        const response = await fs.readFile(FILE_PATH, 'utf-8');
        let data = JSON.parse(response).todoList
        let originalRecord 
        let originalIndex
        for(let i=0; i<data.length; i++){
            if(data[i].id === req.params.id){
                originalRecord = data[i];
                originalIndex = i;
                break; // verify if this will actually break the loop
            }
        }

        // update the index in data
        const patchedRecord = {...updateRecord, ...originalRecord}
        data[originalIndex] = patchedRecord;
        const updatedData = JSON.stringify({
            todoList: data
        })


        await fs.writeFile(FILE_PATH, updatedData);

        res.status(201).json(patchedRecord);

    }catch(err){
        console.error(err)
        res.status(500).json({error: 'Internal Server Error'});
    }
}

// delete by id
export const deleteById = async (req,res) =>{
    try{

        const response = await fs.readFile(FILE_PATH, 'utf-8');
        let data = JSON.parse(response).todoList
        const filteredData = data.filter((elm)=>{
            return elm.id !== req.params.id;
        })        

        // update the data
        const updatedData = JSON.stringify({
            todoList: filteredData
        })


        await fs.writeFile(FILE_PATH, updatedData);

        res.status(204).json({message: 'Record deleted successfully'});

    }catch(err){
        console.error(err)
        res.status(500).json({error: 'Internal Server Error'});
    }
}


export default router; 