import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    avatarURL: {
        type: String,
        default: 'https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'
    },
    communityIDs: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Community' }],
        default: []
    },
    likedPosts: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
        default: []
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

const communitySchema = new mongoose.Schema({
    name: String,
    description: String,
    adminId: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    logoURL: {
        type: String,
        default: 'https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'
    },
    bannerURL: {
        type: String,
        default: 'https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg'
    },
    followingUserIDs: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: []
    }
}, { timestamps: true });

export const Community = mongoose.model('Community', communitySchema);

const postsSchema = new mongoose.Schema({
    title: String,
    text: String,
    attachmentURL: String,
    numberLikes: Number,
}, { timestamps: true });

export const Posts = mongoose.model('Post', postsSchema);

const commentSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    text: String
}, { timestamps: true });

export const Comments = mongoose.model('Comment', commentSchema);



