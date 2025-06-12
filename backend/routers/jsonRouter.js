import express from 'express';
import {
    getAll,
    getById,
    create,
    update,
    deleteById
} from '../controllers/jsonController.js';

const router = express.Router();

// root
router.get('/', (req,res)=>{
    res.send('JSON Router is working!')
})


// get all
router.get('/get-all', getAll)

// get by id
router.get('/get/:id', getById)

// create
router.post('/create', create)

// update
router.patch('/update/:id', update)

// delete by id
router.delete('/delete/:id', deleteById)


export default router; 