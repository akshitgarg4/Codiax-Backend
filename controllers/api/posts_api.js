module.exports.index = function(req,res)
{
    return res.json(200,{
        message:"these are the posts",
        posts:[]
    });
}