const mongoose = require('mongoose');

const { commentSchema } = require('./comment');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    body: String,
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [
        commentSchema
    ] 
}, { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'},
    toJSON: {transform: function (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      }}
 });



postSchema.statics.getPosts = function(){
    return this.find().sort({_id: -1}).populate('author', 'name _id');
}

postSchema.statics.getPostWithReferences = function(id){
    return this.findById(id).populate('author', 'name _id').populate('comments.by', 'name _id');
}

postSchema.methods.populateAuthor = function(){
    return this.populate('author', 'name _id').execPopulate();
}

postSchema.methods.populateComments = function(){
    return this.populate('comments.by', 'name _id').execPopulate();
}

const Post = mongoose.model('Post', postSchema);



module.exports = Post;