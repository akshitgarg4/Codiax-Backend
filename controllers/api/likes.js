const User = require('../../models/user');
const Post = require('../../models/posts');
const Comment = require('../../models/comments');



//to create friendship
module.exports.toggleLike =async function(req,res)
{
    //deleted will be false when we like it 
    // if it was already liked and we removed like from it then deleted would be true
    var deleted=false;

    if(req.query.likeable_type == 'Post')
    {
        var newLikes=[];
        let post=await Post.findOne({_id:req.query.likeable_id});
        if(post)
        {
            post.likes.forEach(element => {
                if(element == req.user.id)
                {
                    deleted=true;
                }
                else{
                    newLikes.push(element);
                }
                
            });
            if(!deleted)
            {
                newLikes.push(req.user._id);
            }
            post.likes=newLikes;
            var a=await post.save();
        }
        return res.json(200,{
            message:"like toggled for posts",
            success:true,
            deleted:deleted
        });
    }
    else{
        var newLikes=[];
        let comment=await Comment.findOne({_id:req.query.likeable_id});
        if(comment)
        {
            comment.likes.forEach(element => {
                if(element == req.user.id)
                {
                    deleted=true;
                }
                else{
                    newLikes.push(element);
                }
                
            });
            if(!deleted)
            {
                newLikes.push(req.user._id);
            }
            comment.likes=newLikes;
            var a=await comment.save();
        }
        return res.json(200,{
            message:"like toggled for comment",
            success:true,
            deleted:deleted
        });
    }   
    
}

