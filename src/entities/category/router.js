import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.get('/api/category', async (req, res) => {
  try {
    const categories = await Ctrl.getCategories();

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched categories',
      data: categories
    });
  } catch (status) {
    res
      .status(status)
      .json({
        status,
        message: 'Internal server error while getting categories'
      });
  }
});

router.delete('/api/category/:category', async (req, res) => {
  try {
    await Ctrl.removeCategory(req.params.category);

    res.status(200).json({
      status: 200,
      message: 'Successfully removed categoy'
    });
  } catch (status) {
    res
      .status(status)
      .json({
        status,
        message: 'Internal server error while removing category'
      });
  }
});

export default router;
