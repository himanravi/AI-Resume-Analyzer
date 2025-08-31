import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: true },
    analysis: Object,
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;