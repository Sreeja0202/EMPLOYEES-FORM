const mongoose = require('mongoose');
const Employee = mongoose.model('Employee',
{
    ename:
    {
        type: String,
    },
    eposition:
    {
        type: String,
    },
    elocation:
    {
        type:String,
    },
    esalary:
    {
        type:Number,
    }
})

module.exports = Employee;