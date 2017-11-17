import { Question } from '../../database';

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    return resolve();
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
