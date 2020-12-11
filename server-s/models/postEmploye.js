import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    name: String,
    dateofbirth: String,
    salary: String,
    gender: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostEmploye = mongoose.model('PostEmploye', postSchema);

export default PostEmploye;