const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pancard:{
        type:String,
        required:true
    },
    company_name:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    technical_skills:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    statuss:{
        type:Number,
        default:0
    },
    is_admin:{
        type:Number,
        required:true
    },
    q:{
        type:String,
        default:""
    },
    qdescription:{
        type:String,
        default:""
    },
    qstatus:{
    type:Number,
    default:0
    }
});

module.exports=mongoose.model('User',userSchema);