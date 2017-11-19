import { Router } from 'express';
import * as Ctrl from './controller';
import { addScore } from '../score/controller';

const router = Router();

router.post('/api/player', async (req, res) => {
  const { name, qty, categories } = req.body;
  const data = { name, qty, categories, qIndex: 0, questions: [] };

  try {
    let q = data.qty;
    const diff = ['Easy', 'Medium', 'Hard'];

    for (let i = 2; i >= 0; i--) {
      const randQ = await Ctrl.getRandQuestions(
        categories,
        diff[i],
        Math.floor(q / (i + 1))
      );
      data.questions.push(...randQ);
      q -= Math.floor(q / (i + 1));
    }
    data.questions.reverse();
  } catch (status) {
    res
      .status(status)
      .json({
        status,
        message: 'Internal server error while populating questions'
      });
  }

  try {
    const player = await Ctrl.newPlayer(data);
    req.session.player = player;

    res.status(200).json({
      status: 200,
      message: 'Successfully initiated new player',
      data: player
    });
  } catch (status) {
    res
      .status(status)
      .json({
        status,
        message: 'Internal server error while initiating new player'
      });
  }
});

router.get('/api/player', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully fetched current player',
    data: req.session.player ? req.session.player : null
  });
});

router.put('/api/player', async (req, res) => {
  if (!req.session.player) {
    res.status(401).json({
      status: 401,
      message: 'Unauthorized action'
    });
  }

  try {
    const { categories, name, questions, _id } = req.session.player;
    const player = {
      name,
      categories,
      score: await Ctrl.computeScore(questions)
    };

    await addScore(player);
    await Ctrl.logout(_id);

    req.session.player = null;
    res.status(200).json({
      status: 200,
      message: 'Successfully detached player',
      data: player
    });
  } catch (status) {
    res
      .status(status)
      .json({ status, message: 'Error while getting player data' });
  }
});

router.put('/api/player/:question', async (req, res) => {
  if (!req.session.player) {
    res.status(401).json({
      status: 401,
      message: 'Unauthorized action'
    });
  }

  if (req.params.question > req.session.player.qty) {
    res.status(400).json({
      status: 400,
      message: 'Invalid question index'
    });
  }

  try {
    const player = await Ctrl.answerQuestion(
      req.session.player._id,
      req.params.question,
      req.body.answer
    );
    req.session.player = player;

    res.status(200).json({
      status: 200,
      message: 'Successfully updated player answer',
      data: player
    });
  } catch (status) {
    res
      .status(status)
      .json({
        status,
        message: 'Internal server error while updating player answer'
      });
  }
});

export default router;
