import { Score } from '../../database';

export const getAllScores = () => {
  return new Promise((resolve, reject) => {
    Score.find({}, (err, scores) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve(scores);
    });
  });
};

export const getArcadeScores = () => {
  return new Promise((resolve, reject) => {
    Score.find({})
      .sort({ score: -1 })
      .limit(5)
      .exec((err, scores) => {
        if (err) {
          console.log(err);
          return reject(500);
        }

        return resolve(scores);
      });
  });
};

export const addScore = ({ name, score, categories }) => {
  return new Promise((resolve, reject) => {
    const newScore = new Score({ name, score, categories });

    newScore.save((err, score) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve(score);
    });
  });
};

export const removeScore = _id => {
  return new Promise((resolve, reject) => {
    Score.findOneAndRemove({ _id }, err => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve();
    });
  });
};
