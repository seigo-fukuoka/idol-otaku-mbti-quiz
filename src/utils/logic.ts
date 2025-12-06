import { questions } from '../data/questions';
import { diagnosisTypes } from '../data/resultTypes';
import { Answer, DiagnosisResult } from '../data/types';

export const calculateResult = (answers: Answer[]): DiagnosisResult => {
  const scores = {
    IE: 0,
    SN: 0,
    TF: 0,
    JP: 0,
  };

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (question) {
      scores[question.dimension] += answer.value * question.direction;
    }
  });

  const typeString = [
    scores.IE >= 0 ? 'E' : 'I',
    scores.SN >= 0 ? 'N' : 'S',
    scores.TF >= 0 ? 'T' : 'F',
    scores.JP >= 0 ? 'J' : 'P',
  ].join('');

  return {
    type: diagnosisTypes[typeString],
    scores,
  };
};
