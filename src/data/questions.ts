import { Question } from './types';

export const questions: Question[] = [
  // 軸1: 物語没入 vs 構造認識（6問）
  { id: 1, text: '推しの成長エピソード、何回でも聞ける？', dimension: 'axis1', direction: 1 },
  { id: 2, text: '運営のマーケティング戦略を見抜くのが楽しい', dimension: 'axis1', direction: -1 },
  { id: 3, text: 'サバイバル番組が好き', dimension: 'axis1', direction: 1 },
  { id: 4, text: '推しを見る時、「搾取されてるな」と思うことがある', dimension: 'axis1', direction: -1 },
  { id: 5, text: '推しの過去や性格まで知りたい', dimension: 'axis1', direction: 1 },
  { id: 6, text: '「これはビジネス」と割り切って楽しめる', dimension: 'axis1', direction: -1 },

  // 軸2: 共同体依存 vs 孤高（6問）
  { id: 7, text: 'ライブは誰かと一緒に行きたい', dimension: 'axis2', direction: 1 },
  { id: 8, text: '界隈での自分の居場所が大事', dimension: 'axis2', direction: 1 },
  { id: 9, text: 'Xでよく推しについて発信する', dimension: 'axis2', direction: 1 },
  { id: 10, text: '現実の人間関係より、界隈の方が居心地いい', dimension: 'axis2', direction: 1 },
  { id: 11, text: '推しの良さを誰かに語りたい', dimension: 'axis2', direction: 1 },
  { id: 12, text: 'オフ会やファンイベントに興味がある', dimension: 'axis2', direction: 1 },

  // 軸3: 承認欲求 vs 見守り（6問）
  { id: 13, text: '推しに自分のことを認知されたい', dimension: 'axis3', direction: 1 },
  { id: 14, text: '推しの欠点も冷静に見られる', dimension: 'axis3', direction: -1 },
  { id: 15, text: '推しが炎上したら全力で擁護する', dimension: 'axis3', direction: 1 },
  { id: 16, text: '推しの言葉に、自分を重ねることがある', dimension: 'axis3', direction: 1 },
  { id: 17, text: '推しグッズと一緒に自撮りをSNSに投稿する', dimension: 'axis3', direction: 1 },
  { id: 18, text: '推しの幸せのためなら自分は我慢できる', dimension: 'axis3', direction: -1 },

  // 軸4: 生活中心 vs 趣味バランス（6問）
  { id: 19, text: '仕事を休んででも現場に行く', dimension: 'axis4', direction: 1 },
  { id: 20, text: '推し活は現実からの逃げ場だと思う', dimension: 'axis4', direction: 1 },
  { id: 21, text: '恋愛やプライベートも充実している', dimension: 'axis4', direction: -1 },
  { id: 22, text: 'アイドル中心に予定を組む', dimension: 'axis4', direction: 1 },
  { id: 23, text: '推し活以外の趣味も大事にしている', dimension: 'axis4', direction: -1 },
  { id: 24, text: '推し活は人生の一部だと思う', dimension: 'axis4', direction: -1 },
];

export const QUESTIONS_PER_PAGE = 6;

export const getTotalPages = () => Math.ceil(questions.length / QUESTIONS_PER_PAGE);

export const getQuestionsForPage = (page: number): Question[] => {
  const start = page * QUESTIONS_PER_PAGE;
  const end = start + QUESTIONS_PER_PAGE;
  return questions.slice(start, end);
};
