const User = require('../../models/user');
const jwt=require('jsonwebtoken');


//for the user to sign up
module.exports.signup =async function(req,res)
{
    let user=await User.findOne({email:req.body.email});
    if(user)
    {
        return res.json(422,{
            message:"User with this email id alreay exists"
        })
    }
    if(req.body.password != req.body.confirm_password)
    {
        return res.json(422,{
            message:"Password and Confirm Password Fields does not match"
        })
    }
    let user1=await User.create(req.body);
    if(user1)
    {
        return res.json(200,{
            message:"Sign up successful",
            success:true,
            data:{
                token:jwt.sign(user1.toJSON(),'CODIAX',{expiresIn:'100000000'})
            }
            });
    }
    else   
    {
        return res.json(200,{
            message:"Sign up not successful"
        });
    } 
}



module.exports.login =async function(req,res)
{
    let user=await User.findOne({email:req.body.email});
    if(!user || user.password != req.body.password)
    {
        return res.json(422,{
            message:"Invalid Email / Password"
        })
    }
    return res.json(200,{
        message:"Here is the token",
        success:true,
        data:{
            token:jwt.sign(user.toJSON(),'CODIAX',{expiresIn:'100000000'}),
            user:{
                email:user.email,
                name:user.name,
                id:user._id
            }
        }
    });
}
