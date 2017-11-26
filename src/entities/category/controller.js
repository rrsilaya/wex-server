import { Question } from '../../database';

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    Question.aggregate([
      {
        $group: {
          _id: '$category',
          questions: {
            $push: {
              _id: '$_id',
              question: '$question',
              difficulty: '$difficulty',
              choices: '$choices',
              type: '$type'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          questions: 1
        }
      }
    ]).exec((err, categories) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve(categories);
    });
  });
};

export const removeCategory = category => {
  return new Promise((resolve, reject) => {
    Question.remove({ category }, err => {
      if (err) {
        return reject(500);
      }

      return resolve();
    });
  });
};
