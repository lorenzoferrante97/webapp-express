import express from 'express';

const router = express.Router();

import { index } from '../controllers/movieController.js';

router.get('/', index);

export default router;
