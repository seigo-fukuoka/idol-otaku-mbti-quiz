import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, RefreshCw } from 'lucide-react';
import { toPng } from 'html-to-image';
import { DiagnosisType } from '../data/types';

interface ResultPageProps {
  result: DiagnosisType;
  onRestart: () => void;
}

export const ResultPage = ({ result, onRestart }: ResultPageProps) => {
  const resultRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadImage = async () => {
    if (!resultRef.current) return;

    try {
      setIsDownloading(true);
      const dataUrl = await toPng(resultRef.current, {
        quality: 1,
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `otaku-mbti-${result.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareX = () => {
    const text = `私のオタク版MBTI診断結果は「${result.name}」でした！\n\n診断してみよう 👉`;
    const url = window.location.origin;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            ref={resultRef}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8"
          >
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={result.imageUrl}
                alt={result.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm mb-3">
                    診断結果
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    {result.name}
                  </h1>
                  <p className="text-xl font-medium opacity-90">{result.id}</p>
                </motion.div>
              </div>
            </div>

            <div className="p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  あなたの特徴
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {result.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {result.traits.map((trait, index) => (
                    <motion.span
                      key={trait}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="bg-gradient-to-r from-pink-100 to-blue-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {trait}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="flex-1 bg-white text-gray-800 font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              {isDownloading ? '生成中...' : '画像を保存'}
            </button>

            <button
              onClick={handleShareX}
              className="flex-1 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Xでシェア
            </button>

            <button
              onClick={onRestart}
              className="flex-1 bg-gray-800 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              もう一度診断
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 text-center text-sm text-gray-500"
          >
            <p>この診断は16Personalitiesを参考にした性格診断です</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
