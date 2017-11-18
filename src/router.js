import { Router } from 'express';

import questionRouter from './entities/question/router';
import scoreRouter from './entities/score/router';
import categoryRouter from './entities/category/router';
import playerRouter from './entities/player/router';

const router = Router();

router.use(questionRouter);
router.use(scoreRouter);
router.use(categoryRouter);
router.use(playerRouter);

export default router;
