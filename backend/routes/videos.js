import express from 'express';
import Video from '../models/Videos.js';

const router = express.Router();

// GET video by ID
router.get('/:id', async (req, res) => {
    try {
        const video = await Video.findOne({ _id: req.params.id });
        if (!video) return res.status(404).json({ message: 'Video not found' });
        res.json(video);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch video' });
    }
});

export default router;
