import express from 'express';

const router = express.Router();

import { index, show, storeReview } from '../controllers/movieController.js';

router.get('/', index);
router.get('/:id', show);
router.post('/:id/reviews', storeReview);

export default router;
