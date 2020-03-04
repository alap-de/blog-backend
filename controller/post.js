const { body } = require('express-validator');

const User = require('../model/user');
const Post = require('../model/post');
const { Comment } = require('../model/comment');
const ErrorUtil = require('../util/error');


module.exports.getPosts = async (req, res) => {
    const posts = await Post.getPosts();

    res.status(200).json({posts: posts});
}

module.exports.getPost = async (req, res) => {
    const post = await Post.getPostWithReferences(req.params.id);

    if(!post){
        throw ErrorUtil.error('post does not exist', 404);
    }

    res.status(200).json({post: post});
}

module.exports.createPost = async (req, res) => {
    let post = new Post({
        title: req.body.title,
        body: req.body.body,
        author: req.user.id
    });
    post = await post.save();
    post = await post.populateAuthor();

    res.status(201).json({
        success: true,
        post: post
    });
}

module.exports.updatePost = async (req, res) => {
    const post = await Post.getPostWithReferences(req.params.id);

    if(!post){
        throw ErrorUtil.error('post does not exist', 404);
    }
    
    if(post.author.toString() !== req.user.id){
        throw ErrorUtil.error('not authorized', 401);
    }

    post.title = req.body.title;
    post.body = req.body.body;
    post = await post.save();

    res.status(200).json({
        success: true,
        post: post
    });
}

module.exports.deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if(!post){
        throw ErrorUtil.error('post does not exist', 404);
    }
    
    if(post.author.toString() !== req.user.id){
        throw ErrorUtil.error('not authorized', 401);
    }

    const deletedPost = await post.remove();

    const posts = await Post.getPosts();

    res.status(200).json({
        success: true,
        posts: posts
    });
}

module.exports.createComment = async (req, res) => {
    let post = await Post.findById(req.params.id);
    
    if(!User.exists({_id: req.body.user_id})){
        throw ErrorUtil.error('user does not exist', 404);
    }
    if(!post){
        throw ErrorUtil.error('post does not exist', 404);
    }
    

    post.comments.push(new Comment({
        body: req.body.body,
        by: req.body.user_id
    }));

    post = await post.save();
    post = await post.populateAuthor();
    post = await post.populateComments();
    
    res.status(200).json({
        success: true,
        post: post
    });
}

module.exports.deleteComment = async (req, res) => {
    let post = await Post.findById(req.params.id);
        
    if(!User.exists({_id: req.body.user_id})){
        throw ErrorUtil.error('user does not exist', 404);
    }
    if(!post){
        throw ErrorUtil.error('post does not exist', 404);
    }

    const comment = post.comments.id(req.body.comment_id);
    if(!comment){
        throw ErrorUtil.error('comment does not exist', 404);
    }

    post.comments.id(req.body.comment_id).remove();

    post = await post.save();

    res.status(200).json({
        success: true,
        post: post
    });
}

module.exports.validate = (toValidate) => {

    switch (toValidate) {
        case 'createPost':
            return [
                body('title', 'title is required').exists().bail().notEmpty().bail().trim(),
                body('body', 'body is required').exists().bail().notEmpty().bail().trim(),
            ]
            break;
        case 'updatePost':
            return [
                body('title', 'title is required').exists().bail().notEmpty().bail().trim(),
                body('body', 'body is required').exists().bail().notEmpty().bail().trim(),
            ]
            break;

        case 'createComment':
            return [
                body('user_id', 'user id is required').exists().bail().notEmpty().bail().isString().withMessage('user id must be a string'),
                body('body', 'body is required').exists().bail().notEmpty().bail().trim(),
            ]
            break;
        case 'deleteComment':
            return [
                body('user_id', 'user id is required').exists().bail().notEmpty().bail().isString().withMessage('user id must be a string'),
                body('comment_id', 'comment id is required').exists().bail().notEmpty().bail().isString().withMessage('comment id must be a string'),
            ]
            break;
    
        default:
            break;
    }
}
