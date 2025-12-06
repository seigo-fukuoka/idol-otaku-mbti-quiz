import { useState, useEffect } from 'react';
import { TopPage } from './components/TopPage';
import { QuizPage } from './components/QuizPage';
import { LoadingPage } from './components/LoadingPage';
import { ResultPage } from './components/ResultPage';
import { calculateResult } from './utils/logic';
import { saveDiagnosisLog } from './lib/supabase';
import { Answer, DiagnosisResult } from './data/types';

type Page = 'top' | 'quiz' | 'loading' | 'result';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('top');
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);

  // ページ遷移時にスクロールをトップに戻す
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleStart = () => {
    setCurrentPage('quiz');
  };

  const handleQuizComplete = async (answers: Answer[]) => {
    setCurrentPage('loading');

    const result = calculateResult(answers);
    setDiagnosisResult(result);

    await saveDiagnosisLog(result.type.id, { answers });
  };

  const handleLoadingComplete = () => {
    setCurrentPage('result');
  };

  const handleRestart = () => {
    setCurrentPage('top');
    setDiagnosisResult(null);
  };

  return (
    <>
      {currentPage === 'top' && <TopPage onStart={handleStart} />}
      {currentPage === 'quiz' && <QuizPage onComplete={handleQuizComplete} />}
      {currentPage === 'loading' && <LoadingPage onComplete={handleLoadingComplete} />}
      {currentPage === 'result' && diagnosisResult && (
        <ResultPage result={diagnosisResult.type} onRestart={handleRestart} />
      )}
    </>
  );
}

export default App;
