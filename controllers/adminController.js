const User=require("../models/userModel");
const bcrypt=require("bcrypt");
//load login
const loginLoad=async(req,res)=>{
try{res.render('login');}
catch(e){console.log(e.message);}
}

const  loadDashboard=async(req,res)=>{
    try{
        const user=await User.find({_id:req.session._id});
       res.render('home',{admin:user}); }
    catch(e){console.log(e.message);}
}

//login
const verifyLogin=async(req,res)=>{
try{
    const email=req.body.email;
    const password=req.body.password;
    const userData=await User.findOne({email:email});
    if(userData){
        const passwordMatch=await bcrypt.compare(password,userData.password);
        userData.is_admin = 1;
        userData.save()
        if(passwordMatch){
            if(userData.is_admin==0){ res.render('login',{message:"Email and Password is incorrect"});}
            else{
                req.session.user_id=userData._id;
                res.render('home');
            }
        }
        else{ res.render('login',{message:"Email and Password is incorrect"});}
    }
    else{
        res.render('login',{message:"No User"});
    }
}
    catch(e){console.log(e.message);}
}

//logout
const  logout=async(req,res)=>{
    try{req.session.destroy();
       res.redirect('/admin'); }
    catch(e){console.log(e.message);}
}

//admin dsahboard
const  adminDashboard=async(req,res)=>{
    try{
        const user=await User.find({is_admin:0});
       res.render('dashboard',{users:user}); }
    catch(e){console.log(e.message);}
}

//edit user
const  editUser=async(req,res)=>{
    try{
        const id=req.query.id;
        
        const userData=await User.find({_id:id});
        console.log({userData});
        if(userData) {res.render('edit-user',{users:userData})}

    else{res.redirect('/admin/dashboard')} }

    catch(e){console.log(e.message);}
}
//update user
const  updateUsers=async(req,res)=>{
    try{
        const id=req.query.id;
        console.log(id)
        const userData=await User.find({_id:id});
        const Done = await User.findOneAndUpdate({_id: id}, {statuss: req.body.statuss});
        res.render('edit-user',{users:userData})
        }
    catch(e){console.log(e.message);}
}
module.exports={
    loginLoad,verifyLogin,logout,loadDashboard,
    adminDashboard,editUser,updateUsers
}