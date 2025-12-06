import { questions } from '../data/questions';
import { diagnosisTypes } from '../data/resultTypes';
import { Answer, DiagnosisResult } from '../data/types';

export const calculateResult = (answers: Answer[]): DiagnosisResult => {
  const scores = {
    axis1: 0,  // story(+) vs structure(-)
    axis2: 0,  // community(+) vs solo(-)
    axis3: 0,  // recognition(+) vs watch(-)
    axis4: 0,  // center(+) vs balance(-)
  };

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (question) {
      scores[question.dimension] += answer.value * question.direction;
    }
  });

  // タイプコード生成
  const typeCode = [
    scores.axis1 > 0 ? 'story' : 'structure',
    scores.axis2 > 0 ? 'community' : 'solo',
    scores.axis3 > 0 ? 'recognition' : 'watch',
    scores.axis4 > 0 ? 'center' : 'balance',
  ].join('-');

  return {
    type: diagnosisTypes[typeCode],
    scores,
  };
};
