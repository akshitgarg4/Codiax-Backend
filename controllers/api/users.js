const User = require('../../models/user');
const jwt=require('jsonwebtoken');


module.exports.createsession =async function(req,res)
{
    let user=await User.findOne({email:req.body.email});
    if(!user || user.password != req.body.password)
    {
        return res.json(422,{
            message:"Invalid User / Password"
        })
    }
    return res.json(200,{
        message:"Here is the token",
        data:{
            token:jwt.sign(user.toJSON(),'CODIAX',{expiresIn:'1000000'})
        }
    });
}
module.exports.signup =async function(req,res)
{
    let user=await User.findOne({email:req.body.email});
    console.log(req.body);
    if(user)
    {
        return res.json(422,{
            message:"User with this email id alreay exists"
        })
    }
    
    let user1=await User.create(req.body);
    if(user1)
    {
        return res.json(200,{
            message:"Sign up successful"
        });
    }
    else   
    {
        return res.json(200,{
            message:"Sign up not successful"
        });
    } 
}