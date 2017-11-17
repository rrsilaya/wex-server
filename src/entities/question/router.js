import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.get('/api/question', async (req, res) => {
  try {
    const questions = await Ctrl.getAllQuestions();

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched questions',
      data: questions
    });
  } catch (status) {
    res
      .status(status)
      .json({
        status,
        message: 'Internal server error while getting questions'
      });
  }
});

router.get('/api/question/:id', async (req, res) => {
  try {
    const question = await Ctrl.getQuestion(req.params.id);

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched question',
      data: question
    });
  } catch (status) {
    let message = '';

    switch (status) {
      case 500:
        message = 'Internal server error while getting question';
        break;
      case 404:
        message = 'Question not found';
        break;
    }

    res.status(status).json({ status, message });
  }
});

router.post('/api/question', async (req, res) => {
  try {
    const question = await Ctrl.addQuestion(req.body);

    res.status(200).json({
      status: 200,
      message: 'Successfully added question',
      data: question
    });
  } catch (status) {
    res
      .status(status)
      .json({
        status,
        message: 'Internal server error while adding new question'
      });
  }
});

router.put('/api/question/:id', async (req, res) => {
  try {
    const question = await Ctrl.editQuestion(req.params.id, req.body);

    res.status(200).json({
      status: 200,
      message: 'Successfully edited question',
      data: question
    });
  } catch (status) {
    let message = '';

    switch (status) {
      case 500:
        message = 'Internal server error while editing question';
        break;
      case 404:
        message = 'Question not found';
        break;
    }

    res.status(status).json({ status, message });
  }
});

router.delete('/api/question/:id', async (req, res) => {
  try {
    await Ctrl.removeQuestion(req.params.id);

    res.status(200).json({
      status: 200,
      message: 'Successfully removed question'
    });
  } catch (status) {
    res
      .status(status)
      .json({
        status,
        message: 'Internal server error while removing question'
      });
  }
});

export default router;
