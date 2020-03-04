const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    body: { type: String, required: true },
    by: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{ 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'},
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
    }}
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment, commentSchema };
