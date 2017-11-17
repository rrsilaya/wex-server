import { Question } from '../../database';

export const getAllQuestions = () => {
  return new Promise((resolve, reject) => {
    Question.find({}, (err, questions) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve(questions);
    });
  });
};

export const getQuestion = id => {
  return new Promise((resolve, reject) => {
    Question.findById(id, (err, movie) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!movie) {
        return reject(404);
      }

      return resolve(movie);
    });
  });
};

export const addQuestion = ({
  question,
  type,
  difficulty,
  category,
  choices,
  answer
}) => {
  return new Promise((resolve, reject) => {
    const newQuestion = new Question({
      question,
      type,
      difficulty,
      category,
      choices,
      answer
    });

    newQuestion.save((err, question) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve(question);
    });
  });
};

export const removeQuestion = _id => {
  return new Promise((resolve, reject) => {
    Question.findOneAndRemove({ _id }, err => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve();
    });
  });
};

export const editQuestion = (id, { type, difficulty, choices, answer }) => {
  return new Promise((resolve, reject) => {
    Question.findById(id, (err, question) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!question) {
        return reject(404);
      }

      question.type = type;
      question.difficulty = difficulty;
      question.choices = choices;
      question.answer = answer;

      question.save((err, newQuestion) => {
        if (err) {
          console.log(err);
          return reject(500);
        }

        return resolve(newQuestion);
      });
    });
  });
};
