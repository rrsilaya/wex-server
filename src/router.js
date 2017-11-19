import { Router } from 'express';

import playerRouter from './entities/player/router';
import questionRouter from './entities/question/router';
import scoreRouter from './entities/score/router';
import categoryRouter from './entities/category/router';

const router = Router();

router.use(playerRouter);

/* Middleware */
router.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  res.status(403).json({
    status: 403,
    message: 'You are not allowed to access this while in-game'
  });
});

router.use(questionRouter);
router.use(scoreRouter);
router.use(categoryRouter);

export default router;
