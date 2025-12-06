import { useRef, useState, useEffect } from 'react';
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

  // OGPメタタグを動的に更新
  useEffect(() => {
    const url = window.location.origin;
    const title = `アイドルオタク診断結果: ${result.name}`;
    const description = `${result.catchphrase}\n${result.description}`;
    
    // 画像URLを絶対URLに変換（画像要素から実際のURLを取得）
    const getImageUrl = (): Promise<string> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          // 画像が読み込まれたら、そのsrc属性を絶対URLに変換
          let imageUrl = img.src;
          if (!imageUrl.startsWith('http')) {
            // 相対URLの場合は絶対URLに変換
            if (imageUrl.startsWith('/')) {
              imageUrl = `${url}${imageUrl}`;
            } else {
              imageUrl = `${url}/${imageUrl}`;
            }
          }
          resolve(imageUrl);
        };
        img.onerror = () => {
          // エラー時はデフォルト画像を使用
          resolve(`${url}/vite.svg`);
        };
        // result.imageUrlはimportされた画像なので、そのまま使用
        img.src = typeof result.imageUrl === 'string' ? result.imageUrl : '';
      });
    };

    getImageUrl().then((imageUrl) => {

    // OGPメタタグを更新
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const updateMetaTagName = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // タイトルを更新
    document.title = title;

      // OGPタグを更新
      updateMetaTag('og:title', title);
      updateMetaTag('og:description', description);
      updateMetaTag('og:url', `${url}/result/${result.id}`);
      if (imageUrl) {
        updateMetaTag('og:image', imageUrl);
      }
      updateMetaTag('og:type', 'website');

      // Twitter Cardタグを更新
      updateMetaTagName('twitter:card', 'summary_large_image');
      updateMetaTagName('twitter:title', title);
      updateMetaTagName('twitter:description', description);
      if (imageUrl) {
        updateMetaTagName('twitter:image', imageUrl);
      }
    });

    // クリーンアップ関数
    return () => {
      // ページを離れる時にデフォルトに戻す（オプション）
      document.title = 'アイドルオタク診断';
    };
  }, [result]);

  const handleDownloadImage = async () => {
    try {
      setIsDownloading(true);

      // キャラクター画像を取得
      const imageResponse = await fetch(result.imageUrl);
      const imageBlob = await imageResponse.blob();
      const imageFile = new File([imageBlob], `idol-otaku-${result.id}.png`, { type: 'image/png' });

      // Web Share API対応デバイス（iOS Safari、Android Chrome等）: Web Share APIを使用
      if (navigator.share && navigator.canShare) {
        const shareData: ShareData & { files?: File[] } = {
          title: `アイドルオタク診断結果: ${result.name}`,
        };

        // ファイル共有がサポートされているか確認
        if (navigator.canShare({ ...shareData, files: [imageFile] } as ShareData & { files: File[] })) {
          shareData.files = [imageFile];
        }

        try {
          await navigator.share(shareData);
        } catch (shareError) {
          // ユーザーがキャンセルした場合やファイル共有ができない場合はフォールバック
          if ((shareError as Error).name !== 'AbortError') {
            // フォールバック: 従来の方法
            const imageUrl = URL.createObjectURL(imageBlob);
            const link = document.createElement('a');
            link.download = `idol-otaku-${result.id}.png`;
            link.href = imageUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(imageUrl);
          }
        }
      } else {
        // その他のブラウザ: 従来の方法
        const imageUrl = URL.createObjectURL(imageBlob);
        const link = document.createElement('a');
        link.download = `idol-otaku-${result.id}.png`;
        link.href = imageUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(imageUrl);
      }
    } catch (error) {
      console.error('Error downloading image:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShareX = () => {
    const url = window.location.origin;
    const text = `私のアイドルオタク診断結果は「${result.name}」でした！\n${result.catchphrase}\n\n診断してみよう 👉\n${url}`;

    // Twitter Intent URLでXアプリを開く
    // OGP画像が設定されているので、URLをシェアすると自動的に画像が表示される
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank');
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
