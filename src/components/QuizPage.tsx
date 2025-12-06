import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getQuestionsForPage, getTotalPages } from '../data/questions';
import { Answer } from '../data/types';

interface QuizPageProps {
  onComplete: (answers: Answer[]) => void;
}

const ratingLabels = [
  { value: -2, label: '同意しない' },
  { value: -1, label: 'やや同意しない' },
  { value: 0, label: 'どちらでもない' },
  { value: 1, label: 'やや同意する' },
  { value: 2, label: '同意する' },
];

export const QuizPage = ({ onComplete }: QuizPageProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const totalPages = getTotalPages();
  const questions = getQuestionsForPage(currentPage);

  // クイズページ内でページ遷移したときにスクロールをトップに戻す
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const canGoNext = questions.every((q) => answers[q.id] !== undefined);

  const handleNext = () => {
    if (currentPage === totalPages - 1) {
      const answerArray: Answer[] = Object.entries(answers).map(
        ([questionId, value]) => ({
          questionId: parseInt(questionId),
          value,
        })
      );
      onComplete(answerArray);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const progress = ((currentPage + 1) / totalPages) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            {currentPage > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                戻る
              </button>
            )}
            <div className="ml-auto text-sm text-gray-600">
              {currentPage + 1} / {totalPages}
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="pt-28 pb-32 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="bg-white rounded-2xl p-6 shadow-md"
              >
                <div className="mb-4">
                  <span className="inline-block bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                    Q{currentPage * 6 + index + 1}
                  </span>
                  <p className="text-lg font-medium text-gray-800">
                    {question.text}
                  </p>
                </div>

                <div className="flex justify-between items-center gap-1">
                  {ratingLabels.map((rating) => (
                    <div key={rating.value} className="flex flex-col items-center gap-2 flex-1">
                      <motion.button
                        onClick={() => handleAnswer(question.id, rating.value)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        animate={
                          answers[question.id] === rating.value
                            ? { scale: [1, 1.2, 1] }
                            : {}
                        }
                        className={`w-12 h-12 rounded-full border-2 transition-all ${
                          answers[question.id] === rating.value
                            ? 'bg-gradient-to-br from-pink-500 to-blue-500 border-transparent shadow-lg'
                            : 'bg-white border-gray-300 hover:border-pink-300'
                        }`}
                      >
                        {answers[question.id] === rating.value && (
                          <span className="text-white font-bold">✓</span>
                        )}
                      </motion.button>
                      <span className="text-[10px] md:text-xs text-gray-600 text-center leading-tight px-0.5">
                        {rating.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <motion.button
            onClick={handleNext}
            disabled={!canGoNext}
            whileHover={canGoNext ? { scale: 1.02 } : {}}
            whileTap={canGoNext ? { scale: 0.98 } : {}}
            className={`w-full py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              canGoNext
                ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentPage === totalPages - 1 ? '診断結果を見る' : '次へ'}
            {currentPage !== totalPages - 1 && <ChevronRight className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
