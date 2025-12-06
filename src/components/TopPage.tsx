import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface TopPageProps {
  onStart: () => void;
}

export const TopPage = ({ onStart }: TopPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="bg-gradient-to-br from-pink-400 to-blue-400 rounded-full p-6 shadow-lg"
            >
              <Sparkles className="w-16 h-16 text-white" />
            </motion.div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            アイドルオタク診断
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            あなたの推し活スタイルを診断します
          </p>
          <p className="text-sm text-gray-500">
            全24問・約3分で完了
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold text-lg px-12 py-4 rounded-full shadow-xl hover:shadow-2xl transition-shadow"
          >
            診断スタート
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-bold text-gray-800 mb-2">精密診断</h3>
            <p className="text-sm text-gray-600">
              24の質問から16タイプを判定
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-bold text-gray-800 mb-2">すぐわかる</h3>
            <p className="text-sm text-gray-600">
              約3分で完了、すぐに結果表示
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-md">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="font-bold text-gray-800 mb-2">シェア可能</h3>
            <p className="text-sm text-gray-600">
              結果画像を保存してSNSでシェア
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
