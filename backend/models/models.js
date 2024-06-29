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
    communityId: {
        type: Schema.Types.ObjectId,
        ref: 'Community'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    body: String,
    attachmentURL: {
        type: String,
        default: ""
    },
    numLikes: {
        type: Number,
        default: 0
    },
    numComments: {
        type: Number,
        default: 0
    },
    likedUserIds: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        default: []
    },
    commentIds: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
        default: []
    }
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



