const express = require('express');
const router = express.Router();
const objectId = require('mongoose').Types.ObjectId;

const Employee = require('../model/employee.model.js');

// GET by id/salary/name

router.get('/:id', (req,res)=>
{
    if(objectId.isValid(req.params.id))
    {
        Employee.findById(req.params.id, (err, doc)=>
        {
            if(err)
            {
                console.log('Error in getting data by salary', +err);
            }
            else
            {
                res.send(doc);
            }
        });
    }
    else
    {
        return res.status(400).send(`No record found with Employee with id ${req.params.id}`);
    }
        
});


// GET
router.get('/', (req,res)=>
{
    Employee.find((err, doc)=>
    {
        if(err)
        {
            console.log('Error in getting data', +err);
        }
        else
        {
            res.send(doc);
        }
    });
});


// POST
router.post('/', (req, res)=>
{
    let emp = new Employee({
        ename: req.body.ename,
        eposition: req.body.eposition,
        elocation: req.body.elocation,
        esalary: req.body.esalary
    });
    emp.save((err, doc)=>
    {
        if(err)
        {
            console.log('Error in Posting Data', +err);
        }
        else
        {
            res.send(doc);
        }
    });
});

// UPDATE by id/salary/name

router.put('/:id', (req,res)=>
{
    if(objectId.isValid(req.params.id))
    {
        let emp = {
            ename: req.body.ename,
            eposition: req.body.eposition,
            elocation: req.body.elocation,
            esalary: req.body.esalary
        }
        Employee.findByIdAndUpdate(req.params.id, {$set: emp}, {new: true}, (err, doc)=>
        {
            if(err)
            {
                console.log('Error in updating data by salary', +err);
            }
            else
            {
                res.send(doc);
            }
        });
    }
        
});

// DELETE by id/salary/name

router.delete('/:id', (req,res)=>
{
    if(objectId.isValid(req.params.id))
    {
        Employee.findByIdAndRemove(req.params.id, (err, doc)=>
        {
            if(err)
            {
                console.log('Error in Deleting data by id', +err);
            }
            else
            {
                res.send(doc);
            }
        });
    }
        
});



module.exports = router; 