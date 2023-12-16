const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:['HOD', 'Chairman', 'Faculty Advisor', 'Course Instructor', 'Student', 'Student Representative'],
    },
    departmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Department',
        required: function (){return this.role !== 'Student' && this.role !== 'Student Representative'}
    },
    
},{
    timestamps:true,
    collection:'users',
});


const User = mongoose.model('User', userSchema );
module.exports = User;