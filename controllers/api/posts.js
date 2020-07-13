const Post = require('../../models/posts');


//to create a post
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


//to receive all the posts
module.exports.getPosts =function(req,res)
{
    Post.find({}).sort({'createdAt':-1}).populate('user',"name email _id").populate({
        path:'comments',populate:{path:'user'}
    }).exec(function(err,posts){
        if(err)
        {
            return res.json(422,{
                message:"Error in finding posts"
            });
        }
        else{
            return res.json(200,{
                message:"These are the posts",
                success:true,
                data:{
                	posts:posts
                }
            });
        }
    })
    
}