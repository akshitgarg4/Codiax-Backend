const User = require('../../models/user');



//to create friendship
module.exports.create =async function(req,res)
{
    let user=await User.findOne({_id:req.query.user_id});
    let user1=await User.findOne({_id:req.user._id});
    if(!user || !user1 )
    {
        
    }
    else{
        let status = await user1.friends.push(req.query.user_id);
        let updated = await user1.save();
    }
        let finalList= await User.findOne({_id:req.user._id}).populate('friends',"_id email name");
        console.log(finalList);
        return res.json(200,{
            message:"Friend added",
            success:true,
            data:finalList
        });
    
}