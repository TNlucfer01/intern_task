
const Userservice=require('../service/user.service');

 async function getUserById(req,res){
   try{
    const userId=req.params.id;
    const user=  await Userservice.getUserbyId(userId);
    if (!user) {                                                                               
          return res.status(404).json({ error: "User not found" });                                
        } 
    res.status(200).json(user);
   }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

async function getUserByEmail(req,res){
  try{
   const email=req.params.email;
    const user=  await Userservice.getUserByEmail(email);
  if (!user) {                                                                               
          return res.status(404).json({ error: "User not found" });                                
        } 
    res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

async function getallUsers(req,res){
  try{
    const users=  await Userservice.getallUsers();
    res.status(200).json(users);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

async function createUser(req,res){
  try{
    const userData=req.body;
    const user=  await Userservice.createUser(userData);
    res.status(201).json(user);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

async function updateUser(req,res){
  try{
    const userId=req.params.id;
    const userData=req.body;
    const user=  await Userservice.updateUserid(userId,userData);
   if (!user) {                                                                               
          return res.status(404).json({ error: "User not found" });                                
        } 
    res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

async function deleteUser(req,res){
    try{
        const userId=req.params.id;
        const result=  await Userservice.deleteUserbyId(userId);
        if (!result) {                                                                               
          return res.status(404).json({ error: "User not found" });                                
        } 
        res.status(200).json({message:"User deleted successfully"});
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
}

module.exports={getUserById, getUserByEmail, getallUsers, createUser,updateUser, deleteUser};
