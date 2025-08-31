import Resume from '../models/resume.model.js';
import Feedback from '../models/feedback.model.js';
import { extractText } from '../services/resume.service.js';
import { analyzeWithGemini } from '../services/gemini.service.js';

export const uploadResume = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'Please upload a file' });
    try {
        const text = await extractText(req.file);
        const resume = await Resume.create({
            userId: req.user.id,
            filename: req.file.originalname,
            fileUrl: req.file.path,
            originalText: text,
        });
        res.status(201).json(resume);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing file' });
    }
};

export const analyzeResume = async (req, res) => {
    try {
        const { resumeId, jobTitle, industry } = req.body;
        const resume = await Resume.findById(resumeId);

        if (!resume || resume.userId.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Resume not found or not authorized' });
        }
        const analysis = await analyzeWithGemini(resume.originalText, jobTitle, industry);
        const feedback = await Feedback.create({ resumeId, analysis });
        res.json(feedback);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'AI analysis failed', error: error.message });
    }
};