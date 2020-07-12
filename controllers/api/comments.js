const Comment = require('../../models/comments');
const Post = require('../../models/posts');


module.exports.createComment=async function(req,res)
{
    let post= await Post.findById(req.body.post_id);
    if(post)
    {
        let comment = await Comment.create({
            content:req.body.content,
            post:req.body.post_id,
            user:req.user._id
        });

        if(comment)
        {
            post.comments.push(comment);
            post.save();
        
            return res.json(200,{
                message:"Comment Created",
                success:true,
                data:{
                    comment:comment
                }
                });
        }
        else{
            return res.json(422,{
                message:"Error in creating comment"
            });
        }
    }
    else{
        return res.json(422,{
            message:"Error in Creating Comment"
        });
    }
}
