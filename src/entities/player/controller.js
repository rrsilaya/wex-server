import { Player, Question } from '../../database';

export const newPlayer = player => {
  return new Promise((resolve, reject) => {
    const newPlayer = new Player({ ...player, isFinished: false });

    newPlayer.save((err, player) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve(player);
    });
  });
};

export const getRandQuestions = (categories, difficulty, qty) => {
  return new Promise((resolve, reject) => {
    Question.aggregate([
      {
        $match: {
          $or: [
            { category: categories[0] },
            { category: categories[1] },
            { category: categories[2] }
          ],
          difficulty
        }
      },
      { $sample: { size: qty } },
      { $project: { _id: 1, difficulty: 1, category: 1, answer: null } }
    ]).exec((err, questions) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!questions.length) {
        return reject(404);
      }

      return resolve(questions);
    });
  });
};

export const answerQuestion = (id, index, answer) => {
  return new Promise((resolve, reject) => {
    Player.findById(id, (err, player) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      player.questions[index - 1].answer = answer;
      player.qIndex += 1;
      player.markModified('questions');
      player.save((err, updated) => {
        if (err) {
          console.log(err);
          return reject(500);
        }

        return resolve(updated);
      });
    });
  });
};

export const logout = id => {
  return new Promise((resolve, reject) => {
    Player.findById(id, (err, player) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      player.isFinished = true;
      player.save((err, update) => {
        if (err) {
          console.log(err);
          return reject(500);
        }

        return resolve();
      });
    });
  });
};

export const computeScore = questions => {
  return new Promise(async (resolve, reject) => {
    let score = 0;

    for (const question of questions) {
      await Question.findById(question._id, (err, q) => {
        if (err) {
          console.log(err);
          return reject(500);
        }

        if (question.answer === q.answer) {
          switch (question.difficulty) {
            case 'Easy':
              score += 10;
              break;
            case 'Medium':
              score += 15;
              break;
            case 'Hard':
              score += 25;
              break;
          }
        }
      });
    }

    return resolve(score);
  });
};
