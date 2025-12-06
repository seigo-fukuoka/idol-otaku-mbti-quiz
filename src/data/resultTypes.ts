import { DiagnosisType } from './types';
import img1 from '../img/idol_otaku_mbti_01.png';
import img2 from '../img/idol_otaku_mbti_02.png';
import img3 from '../img/idol_otaku_mbti_03.png';
import img4 from '../img/idol_otaku_mbti_04.png';
import img5 from '../img/idol_otaku_mbti_05.png';
import img6 from '../img/idol_otaku_mbti_06.png';
import img7 from '../img/idol_otaku_mbti_07.png';
import img8 from '../img/idol_otaku_mbti_08.png';
import img9 from '../img/idol_otaku_mbti_09.png';
import img10 from '../img/idol_otaku_mbti_10.png';
import img11 from '../img/idol_otaku_mbti_11.png';
import img12 from '../img/idol_otaku_mbti_12.png';
import img13 from '../img/idol_otaku_mbti_13.png';
import img14 from '../img/idol_otaku_mbti_14.png';
import img15 from '../img/idol_otaku_mbti_15.png';
import img16 from '../img/idol_otaku_mbti_16.png';

export const diagnosisTypes: Record<string, DiagnosisType> = {
  'story-community-recognition-center': {
    id: 'story-community-recognition-center',
    name: '全てを捧げるTO（トップオタ）型',
    catchphrase: '「最前列は私の指定席。有給は全て推しのために」',
    description: 'いわゆるTO（トップオタ）。アイドル以外の全てを犠牲にし、最前管理に命をかける生粋の現場至上主義者。仕事も有給も全ては「推しに会うため」の手段に過ぎません。界隈を仕切り、圧倒的な財力と行動力で推しを支えますが、推しが卒業したら何も残らない危うさも秘めています。',
    imageUrl: img1,
  },
  'story-community-recognition-balance': {
    id: 'story-community-recognition-balance',
    name: 'イッパソ布教型オタク',
    catchphrase: '「この子マジで可愛いから！一回見て！」',
    description: 'リア充とオタクのハイブリッド。一般人の友人に息をするように布教を行い、実際に現場へ連れてくる営業力の持ち主。私生活も充実しており、アイドルからも「安心できるファン」として認知されやすい、最もバランスの取れた陽キャオタクです。',
    imageUrl: img2,
  },
  'story-community-watch-center': {
    id: 'story-community-watch-center',
    name: '古参イキリマウント型',
    catchphrase: '「昔の現場はもっと近かったんだけどねぇ（後方腕組み）」',
    description: '界隈の生き字引。認知やファンサよりも「推しが幸せならそれでいい」という境地に達していますが、新規ファンに対して無意識に「昔はこうだった」とマウントを取りがち。現場では後方で古参仲間と固まり、同窓会のような空気を出しています。',
    imageUrl: img3,
  },
  'story-community-watch-balance': {
    id: 'story-community-watch-balance',
    name: '後方推し見守り型',
    catchphrase: '「尊い...（語彙力喪失）」',
    description: '現場では後方で双眼鏡を構え、オタク友達とひたすら「尊い」を連呼する平和主義者。私生活も充実しており、深入りしすぎず、アイドルの良いところだけを摂取して生きる賢いスタイル。平和な推し活ライフを謳歌しています。',
    imageUrl: img4,
  },
  'story-solo-recognition-center': {
    id: 'story-solo-recognition-center',
    name: '同担拒否ガチ恋型',
    catchphrase: '「私以外のファンサ、見たくない...」',
    description: '推しへの愛が重すぎて重力が発生しています。現場では常に単独行動。推しの一挙手一投足にメンタルを乱され、常に病みツイートをしてしまう繊細な心の持ち主。推しが人生の全てであり、同時に最大の弱点でもあります。',
    imageUrl: img5,
  },
  'story-solo-recognition-balance': {
    id: 'story-solo-recognition-balance',
    name: '現実バランス型ガチ恋',
    catchphrase: '「推しは恋人。でも現実は現実」',
    description: '坂道系や地上アイドルオタクに多いタイプ。リアルに「恋」をしていますが、現実生活もしっかり充実させている器用な人。脳内では推しとの結婚生活を送りつつ、現実では社会人として完璧に振る舞う、ある意味で最強のメンタルを持っています。',
    imageUrl: img6,
  },
  'story-solo-watch-center': {
    id: 'story-solo-watch-center',
    name: '金積み全肯定型',
    catchphrase: '「推しが息してるだけで偉い。課金は養育費」',
    description: '推しを産んだ記憶があるタイプ。見返りを一切求めず、ただ「推しにお金を落とすこと」自体に喜びを感じます。SNSアカウントは持っているもののフォロワーは一桁、フォロー欄は推しのみ。誰にも知られず、莫大な金額を溶かすサイレントATMです。',
    imageUrl: img7,
  },
  'story-solo-watch-balance': {
    id: 'story-solo-watch-balance',
    name: '隠れキリシタン型',
    catchphrase: '「グッズ購入履歴だけが私の信仰の証」',
    description: 'SNSもやらず、現場にもあまり現れませんが、グッズやCDはしっかり購入して密かに楽しむタイプ。現実世界ではオタクであることを隠し通している場合も多く、誰にもバレずに推し活を完結させています。',
    imageUrl: img8,
  },
  'structure-community-recognition-center': {
    id: 'structure-community-recognition-center',
    name: 'ご意見番インフルエンサー型',
    catchphrase: '「今回の運営のムーブ、悪手だったな」',
    description: 'アイドルをコンテンツとして分析し、その鋭い考察をSNSで発信することに快感を覚えるタイプ。頭が良く弁が立つため信者も多いですが、運営批判がヒートアップして炎上の火種になることもしばしば。界隈の「論客」です。',
    imageUrl: img9,
  },
  'structure-community-recognition-balance': {
    id: 'structure-community-recognition-balance',
    name: '情報屋（データバンク）型',
    catchphrase: '「あ、そのソースこれね（URL貼り）」',
    description: '古参に多いタイプ。推しのスケジュールから過去の発言まで全てを網羅し、界隈で「あの人に聞けばわかる」と頼りにされています。現場にはたまにしか来ませんが、知識量と情報収集能力はプロ並みです。',
    imageUrl: img10,
  },
  'structure-community-watch-center': {
    id: 'structure-community-watch-center',
    name: 'ライブ後居酒屋語り型',
    catchphrase: '「あの曲のBメロの転調、神がかってたよな」',
    description: 'おじさんオタクに多い傾向。認知は求めず、パフォーマンスの技術論や楽曲の構成について、ライブ後の居酒屋で仲間と熱く語り合うのがメインイベント。推しへの愛は「評価」という形で表現されます。',
    imageUrl: img11,
  },
  'structure-community-watch-balance': {
    id: 'structure-community-watch-balance',
    name: 'エンタメ評論家気取り型',
    catchphrase: '「アイドルも一つの文化芸術として興味深いね」',
    description: 'アイドルを一歩引いた視点から「面白いコンテンツ」として楽しむ余裕のある大人。自分はオタクではなく「観察者」だと思っており、界隈の騒動も含めてエンターテインメントとして消費しています。',
    imageUrl: img12,
  },
  'structure-solo-recognition-center': {
    id: 'structure-solo-recognition-center',
    name: '孤高のP（プロデューサー）気取り型',
    catchphrase: '「俺ならあそこでレス飛ばさせるけどな」',
    description: '友達もおらず一人で現場に通い、常に運営目線でダメ出しをし続けるストイックな存在。いつか自分が運営側に回るという野望を抱いており、特典会では推しに対して少し上から目線のアドバイスをしてしまいがちです。',
    imageUrl: img13,
  },
  'structure-solo-recognition-balance': {
    id: 'structure-solo-recognition-balance',
    name: '特典会重視DDおじさん型',
    catchphrase: '「全員可愛い！全員推せる！」',
    description: '「誰でも大好き（DD）」の極み。お金はそこまで積めませんが、認知欲求は強く、様々なアイドルの特典会に一人で並んでいます。一瞬の会話で爪痕を残そうと必死になりますが、推しからは「よく来る面白いおじさん」枠で処理されています。',
    imageUrl: img14,
  },
  'structure-solo-watch-center': {
    id: 'structure-solo-watch-center',
    name: '修行僧（アーカイブ職人）型',
    catchphrase: '「記録。それが私の全て」',
    description: '感情の揺らぎを捨て、ただ淡々と推しの活動を記録・保存し続けるアーカイブ勢。認知も不要、交流も不要。あるのは圧倒的な「記録への執念」のみ。推しの歴史を後世に残すための生きたデータベースです。',
    imageUrl: img15,
  },
  'structure-solo-watch-balance': {
    id: 'structure-solo-watch-balance',
    name: 'イッパソ（一般人）型',
    catchphrase: '「えっ、アイドル？ 普通に好きだよ」',
    description: '【UR：激レア】おめでとうございます。あなたは極めて健全な精神状態でアイドルを楽しめています。構造を理解し、依存せず、見守る。この診断にたどり着いたのが不思議なくらい、まともな感性の持ち主です。',
    imageUrl: img16,
  },
};
