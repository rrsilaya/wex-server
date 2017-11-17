import { Router } from 'express';

import questionRouter from './entities/question/router';
import scoreRouter from './entities/score/router';

const router = Router();

router.use(questionRouter);
router.use(scoreRouter);

export default router;
