const Post = require('../../models/posts');

module.exports.createPost=async function(req,res)
{
    let post= await Post.create({
        content:req.body.content,
        user:req.user._id
    });
    if(post)
    {
        return res.json(200,{
            message:"Post created",
            success:true,
            data:{
                post:post
            }
            });
    }
    else{
        return res.json(422,{
            message:"Error in creating post"
        });
    }
}



module.exports.getPosts = function(req,res)
{

    return res.json(200,{
        message:"These are the posts",
        posts:[]
    });
}