import Feedback from '../models/feedback.model.js';
import Resume from '../models/resume.model.js';

export const getFeedbackForResume = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findById(resumeId);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        if (resume.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to view this feedback' });
        }

        const feedback = await Feedback.findOne({ resumeId });

        if (feedback) {
            res.json(feedback);
        } else {
            res.status(404).json({ message: 'Feedback for this resume has not been generated yet.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};