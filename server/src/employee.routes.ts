import * as express from 'express';
import {Employee} from './employee';
import {collections} from './database';
import { ObjectId } from 'mongodb';

export const employeeRouter = express.Router();

employeeRouter.use(express.json());

employeeRouter.get('/', async (_req, res) => {
    try {
        const page = parseInt(_req.query.page as string) || 1;
        const limit = parseInt(_req.query.limit as string) || 5;
        const employees = await collections?.employees?.find({}).skip((page - 1) * limit).limit(limit).toArray();
        const total = await collections?.employees?.countDocuments();
        res.status(200).send({data:employees, success: true, total});
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : 'An error occurred while fetching employees.');
    }
});

employeeRouter.get('/:id', async (req, res) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const employee = await collections?.employees?.findOne(query);
        if (employee) {
            res.status(200).send({data: employee, success: true});
        } else {
            res.status(404).send({success: false, message: 'Employee not found'});
        }
    } catch (error) {
        res.status(500).send({success: false, message: error instanceof Error ? error.message : 'An error occurred while fetching the employee.'});
    }
});

employeeRouter.post('/', async (req, res) => {
    try {
        const newEmployee = req.body as Employee;
        const result = await collections?.employees?.insertOne(newEmployee);
        console.log('Employee Insert One', result);    
        if (result?.acknowledged) {
            res.status(201).send({success: true, message: `Successfully created a new employee with id ${result.insertedId}`});
        } else {
            res.status(500).send({success: false, message: 'Failed to create a new employee'});
        }
    } catch (error) {
        res.status(500).send({success: false, message: error instanceof Error ? error.message : 'An error occurred while creating the employee.'});
    }
});

employeeRouter.put('/:id', async (req, res) => {
    const id = req?.params?.id;
    try {
        const updateEmployee = req.body as Employee;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.employees?.updateOne(query, { $set: updateEmployee });
        console.log('Employee Update One', result);
        if (result?.matchedCount) {
            res.status(200).send({success: true, message: `Successfully updated employee with id ${id}`});
        } else {
            res.status(404).send({success: false, message: 'Employee not found'});
        }
    } catch (error) {
        res.status(500).send({success: false, message: error instanceof Error ? error.message : 'An error occurred while updating the employee.'});
    }
});

employeeRouter.delete('/:id', async (req, res) => {
    const id = req?.params?.id;
    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections?.employees?.deleteOne(query);
        console.log('Employee Delete One', result);
        if (result?.deletedCount) {
            res.status(200).send({success: true, message: `Successfully deleted employee with id ${id}`});
        } else {
            res.status(404).send({success: false, message: 'Employee not found'});
        }
    } catch (error) {
        res.status(500).send({success: false, message: error instanceof Error ? error.message : 'An error occurred while deleting the employee.'});
    }
});