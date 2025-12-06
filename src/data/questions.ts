import { Question } from './types';

export const questions: Question[] = [
  { id: 1, text: '大人数のイベントよりも、少人数で深く語り合う方が好きだ', dimension: 'IE', direction: -1 },
  { id: 2, text: '初対面の人とでもすぐに打ち解けられる', dimension: 'IE', direction: 1 },
  { id: 3, text: '週末は家で過ごす方が充電できる', dimension: 'IE', direction: -1 },
  { id: 4, text: '新しい人との出会いにワクワクする', dimension: 'IE', direction: 1 },
  { id: 5, text: '1人の時間がないとストレスが溜まる', dimension: 'IE', direction: -1 },

  { id: 6, text: '細かいディテールよりも、全体像を把握する方が得意だ', dimension: 'SN', direction: 1 },
  { id: 7, text: '実用的で現実的なアイデアを好む', dimension: 'SN', direction: -1 },
  { id: 8, text: '「もしも」を考えるのが好きだ', dimension: 'SN', direction: 1 },
  { id: 9, text: '今ここにあるものを大切にする', dimension: 'SN', direction: -1 },
  { id: 10, text: '抽象的な議論に興味がある', dimension: 'SN', direction: 1 },

  { id: 11, text: '意思決定では、感情よりも論理を優先する', dimension: 'TF', direction: 1 },
  { id: 12, text: '友人の悩みには、解決策より共感を示す', dimension: 'TF', direction: -1 },
  { id: 13, text: '議論では、正しさが何より大切だ', dimension: 'TF', direction: 1 },
  { id: 14, text: '相手の気持ちを考えて行動を決める', dimension: 'TF', direction: -1 },
  { id: 15, text: '効率性は人間関係より重要だ', dimension: 'TF', direction: 1 },

  { id: 16, text: '計画を立ててからじゃないと行動できない', dimension: 'JP', direction: 1 },
  { id: 17, text: '臨機応変に対応する方が得意だ', dimension: 'JP', direction: -1 },
  { id: 18, text: 'To-Doリストを作るのが好きだ', dimension: 'JP', direction: 1 },
  { id: 19, text: '締め切りギリギリでも慌てない', dimension: 'JP', direction: -1 },
  { id: 20, text: '整理整頓された環境が好きだ', dimension: 'JP', direction: 1 },

  { id: 21, text: '直感よりもデータを信じる', dimension: 'TF', direction: 1 },
  { id: 22, text: '独自の理論を構築するのが好きだ', dimension: 'SN', direction: 1 },
  { id: 23, text: '複数のことを同時進行するのが得意だ', dimension: 'JP', direction: -1 },
  { id: 24, text: '人から注目されるのは苦手だ', dimension: 'IE', direction: -1 },
];

export const QUESTIONS_PER_PAGE = 6;

export const getTotalPages = () => Math.ceil(questions.length / QUESTIONS_PER_PAGE);

export const getQuestionsForPage = (page: number): Question[] => {
  const start = page * QUESTIONS_PER_PAGE;
  const end = start + QUESTIONS_PER_PAGE;
  return questions.slice(start, end);
};
