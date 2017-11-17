import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.get('/api/score', async (req, res) => {
  try {
    const scores = await Ctrl.getAllScores();

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched scores',
      data: scores
    });
  } catch (status) {
    res
      .status(status)
      .json({ status, message: 'Internal server error while getting scores' });
  }
});

router.get('/api/score/arcade', async (req, res) => {
  try {
    const scores = await Ctrl.getArcadeScores();

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched arcade scores',
      data: scores
    });
  } catch (status) {
    res
      .status(status)
      .json({
        status,
        message: 'Internal server error while getting arcade scores'
      });
  }
});

router.post('/api/score', async (req, res) => {
  try {
    const score = await Ctrl.addScore(req.body);

    res.status(200).json({
      status: 200,
      message: 'Successfully added score',
      data: score
    });
  } catch (status) {
    res
      .status(status)
      .json({ status, message: 'Internal server error while adding score' });
  }
});

router.delete('/api/score/:id', async (req, res) => {
  try {
    await Ctrl.removeScore(req.params.id);

    res.status(200).json({
      status: 200,
      message: 'Successfully removed score'
    });
  } catch (status) {
    res
      .status(status)
      .json({ status, message: 'Internal server error while removing score' });
  }
});

export default router;
