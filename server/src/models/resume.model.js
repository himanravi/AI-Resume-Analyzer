import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    filename: String,
    fileUrl: String,
    originalText: String,
}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;