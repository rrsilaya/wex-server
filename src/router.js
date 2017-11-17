import { Router } from 'express';

import questionRouter from './entities/question/router';

const router = Router();

router.use(questionRouter);

export default router;
