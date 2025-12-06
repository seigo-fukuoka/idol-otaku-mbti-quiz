import { useRef, useState } from 'react';
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

      // Web Share API対応デバイス（iOS Safari、Android Chrome等）: Web Share APIを使用
      if (navigator.share && navigator.canShare) {
        // Data URLをBlobに変換
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], `otaku-mbti-${result.id}.png`, { type: 'image/png' });

        const shareData: ShareData & { files?: File[] } = {
          title: `アイドルオタク診断結果: ${result.name}`,
        };

        // ファイル共有がサポートされているか確認
        if (navigator.canShare({ ...shareData, files: [file] } as ShareData & { files: File[] })) {
          shareData.files = [file];
        }

        try {
          await navigator.share(shareData);
        } catch (shareError) {
          // ユーザーがキャンセルした場合やファイル共有ができない場合はフォールバック
          if ((shareError as Error).name !== 'AbortError') {
            // フォールバック: 従来の方法
            const link = document.createElement('a');
            link.download = `otaku-mbti-${result.id}.png`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
      } else {
        // その他のブラウザ: 従来の方法
        const link = document.createElement('a');
        link.download = `otaku-mbti-${result.id}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareX = async () => {
    const text = `私のアイドルオタク診断結果は「${result.name}」でした！\n${result.catchphrase}\n\n診断してみよう 👉`;
    const url = window.location.origin;

    try {
      // キャラクター画像を取得
      const imageResponse = await fetch(result.imageUrl);
      const imageBlob = await imageResponse.blob();
      const imageFile = new File([imageBlob], `idol-otaku-${result.id}.png`, { type: 'image/png' });

      // Web Share APIが利用可能で、画像を共有できる場合
      if (navigator.share && navigator.canShare) {
        const shareData: ShareData & { files?: File[] } = {
          title: `アイドルオタク診断結果: ${result.name}`,
          text: text,
          url: url,
        };

        // ファイル共有がサポートされているか確認
        if (navigator.canShare({ ...shareData, files: [imageFile] } as ShareData & { files: File[] })) {
          shareData.files = [imageFile];
        }

        try {
          await navigator.share(shareData);
          return;
        } catch (shareError) {
          // ユーザーがキャンセルした場合などはエラーを無視してフォールバック
          if ((shareError as Error).name === 'AbortError') {
            return;
          }
        }
      }

      // Web Share APIが使えない場合のフォールバック: Twitter Intent URL
      // 画像は直接添付できないが、テキストとURLでXアプリを開く
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, '_blank');
    } catch (error) {
      console.error('Error sharing:', error);
      // エラー時もフォールバック: Twitter Intent URL
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[550px] md:max-w-[900px] mx-auto px-4 py-8">
        {/* 見出し */}
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          あなたの推し活スタイルを診断しました
        </h2>

        {/* ファーストビュー: 画像 */}
        <div className="mb-8">
          <img
            src={result.imageUrl}
            alt={result.name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* 詳細セクション */}
        <div ref={resultRef} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {result.name}
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-gray-700 mb-8">
            {result.catchphrase}
          </p>
          <p className="text-gray-700 leading-relaxed text-lg mb-8">
            {result.description}
          </p>
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={handleDownloadImage}
            disabled={isDownloading}
            className="flex-1 bg-white text-gray-800 font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2 border-2 border-gray-300"
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
        </div>

        {/* 注釈 */}
        <div className="text-center">
          <p className="text-xs text-gray-400">※これはネタです</p>
        </div>
      </div>
    </div>
  );
};
