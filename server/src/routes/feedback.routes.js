import express from 'express';
import { getFeedbackForResume } from '../controllers/feedback.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();
router.get('/:resumeId', protect, getFeedbackForResume);

export default router;