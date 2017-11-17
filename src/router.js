import { Router } from 'express';

import questionRouter from './entities/question/router';
import scoreRouter from './entities/score/router';
import categoryRouter from './entities/category/router';

const router = Router();

router.use(questionRouter);
router.use(scoreRouter);
router.use(categoryRouter);

export default router;
