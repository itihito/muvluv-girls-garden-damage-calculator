interface Character {
  name: string; // 名前
  rarity: "SSR" | "SR" | "R"; // レア
  school: string; // 所属校舎
  team: string; // チーム
  attribute: string; // 属性
  type: string; // タイプ
  role: string; // ロール
  proficiency: string[]; // 適正
  implementation_date: string; // 実装日
  detail_link: string; // 詳細ページへのリンク
  skills: Skill[]; // スキルデータ
}

interface Skill {
  name: string; // スキル名
  skill_type: "EX" | "AS" | "PS"; // スキルタイプ (EX: EXスキル, AS: アクティブスキル, PS: パッシブスキル)
  power_per_level: (number | undefined)[]; // Lvごとの威力 (Lv1からLv15まで存在し、詳細ページにデータがない場合はundefined)
  hit_count: number | null; // ヒット数 (ヒット数が無い場合はnull)
}

export const characters: Character[] = [
  {
    name: "【シリウスシュガーのエース】桃園める",
    rarity: "SSR",
    school: "柊校舎",
    team: "シリウスシュガー",
    attribute: "アグレッシブ",
    type: "敏捷タイプ",
    role: "サポート",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E3%82%B7%E3%83%AA%E3%82%A6%E3%82%B9%E3%82%B7%E3%83%A5%E3%82%AC%E3%83%BC%E3%81%AE%E3%82%A8%E3%83%BC%E3%82%B9%E3%80%91%E6%A1%83%E5%9C%92%E3%82%81%E3%82%8B",
    skills: [
      {
        name: "ふわとろのきもち",
        skill_type: "EX",
        power_per_level: [75, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 117, undefined, undefined, undefined, undefined, 117],
        hit_count: 1
      },
      {
        name: "ペンタブレイド",
        skill_type: "AS",
        power_per_level: [18, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 28.08, undefined, undefined, undefined, undefined, 28.08],
        hit_count: 5
      },
      {
        name: "レストブレイカー",
        skill_type: "AS",
        power_per_level: [50, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 78, undefined, undefined, undefined, undefined, 78],
        hit_count: 1
      },
      {
        name: "チェイスブレイダー",
        skill_type: "PS",
        power_per_level: [55, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 85.8, undefined, undefined, undefined, undefined, 85.8],
        hit_count: 1
      },
      {
        name: "リストリクションエッジ",
        skill_type: "PS",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 156, undefined, undefined, undefined, undefined, 156],
        hit_count: 1
      }
    ]
  },
  {
    name: "【オールラウンダーな統率者】鳴滝七彩",
    rarity: "SSR",
    school: "柊校舎",
    team: "シリウスシュガー",
    attribute: "キュート",
    type: "ENタイプ",
    role: "サポート",
    proficiency: [
      "前衛",
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E3%82%AA%E3%83%BC%E3%83%AB%E3%83%A9%E3%82%A6%E3%83%B3%E3%83%80%E3%83%BC%E3%81%AA%E7%B5%B1%E7%8E%87%E8%80%85%E3%80%91%E9%B3%B4%E6%BB%9D%E4%B8%83%E5%BD%A9",
    skills: [
      {
        name: "七彩の庭園",
        skill_type: "EX",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      },
      {
        name: "イグナイト",
        skill_type: "AS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      },
      {
        name: "スタンサプレッション",
        skill_type: "AS",
        power_per_level: [60, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 93.6],
        hit_count: 1
      },
      {
        name: "セントリストア",
        skill_type: "PS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      },
      {
        name: "リベンジシュート",
        skill_type: "PS",
        power_per_level: [50, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 106],
        hit_count: 1
      }
    ],
  },
  {
    name: "【博識なメイズの探求者】月ヶ瀬ちゆる",
    rarity: "SSR",
    school: "柊校舎",
    team: "シリウスシュガー",
    attribute: "シャイ",
    type: "敏捷タイプ",
    role: "コントロール",
    proficiency: [
      "前衛",
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E5%8D%9A%E8%AD%98%E3%81%AA%E3%83%A1%E3%82%A4%E3%82%BA%E3%81%AE%E6%8E%A2%E6%B1%82%E8%80%85%E3%80%91%E6%9C%88%E3%83%B6%E7%80%AC%E3%81%A1%E3%82%86%E3%82%8B",
    skills: [
      {
        name: "Q.E.D",
        skill_type: "EX",
        power_per_level: [75, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 102.98, undefined, undefined, undefined, undefined, 117],
        hit_count: 1
      },
      {
        name: "Pスラスト",
        skill_type: "AS",
        power_per_level: [70, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 140.56, undefined, undefined, undefined, undefined, 140.56],
        hit_count: 1
      },
      {
        name: "多重連突",
        skill_type: "AS",
        power_per_level: [8.5, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 13.26],
        hit_count: 8
      },
      {
        name: "ポイズンチェイス",
        skill_type: "PS",
        power_per_level: [50, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 78, undefined, undefined, undefined, undefined, 106],
        hit_count: 1
      },
      {
        name: "ポイズンライド",
        skill_type: "PS",
        power_per_level: [18, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 38.16],
        hit_count: null
      }
    ]
  },
  {
    name: "【純白のラッキーガール】一条白奈",
    rarity: "SSR",
    school: "柊校舎",
    team: "シリウスシュガー",
    attribute: "スマート",
    type: "物理タイプ",
    role: "タンク",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E7%B4%94%E7%99%BD%E3%81%AE%E3%83%A9%E3%83%83%E3%82%AD%E3%83%BC%E3%82%AC%E3%83%BC%E3%83%AB%E3%80%91%E4%B8%80%E6%9D%A1%E7%99%BD%E5%A5%88",
    skills: [
      {
        name: "薄暦の宵火",
        skill_type: "EX",
        power_per_level: [75, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 117, undefined, undefined, undefined, undefined, 117],
        hit_count: 1
      },
      {
        name: "クールスラッシュ・トリプル",
        skill_type: "AS",
        power_per_level: [50, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 78, undefined, undefined, undefined, undefined, 106],
        hit_count: 3
      },
      {
        name: "バックエイムファイヤ",
        skill_type: "AS",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 156],
        hit_count: 1
      }
    ]
  },
  {
    name: "【負けず嫌いな不屈少女】朽葉ラミ",
    rarity: "SSR",
    school: "柊校舎",
    team: "シリウスシュガー",
    attribute: "シャイ",
    type: "物理タイプ",
    role: "タンク",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E8%B2%A0%E3%81%91%E3%81%9A%E5%AB%8C%E3%81%84%E3%81%AA%E4%B8%8D%E5%B1%88%E5%B0%91%E5%A5%B3%E3%80%91%E6%9C%BDS%E8%91%89%E3%83%A9%E3%83%9F",
    skills: [
      {
        name: "あっかんべー♡",
        skill_type: "EX",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 78, undefined, undefined, undefined, undefined, 156],
        hit_count: 1
      },
      {
        name: "クライシスドライブ",
        skill_type: "AS",
        power_per_level: [50, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 78, undefined, undefined, undefined, undefined, 106],
        hit_count: 1
      },
      {
        name: "まだ終わんないけど？",
        skill_type: "PS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      }
    ]
  },
  {
    name: "【厳格な規律の守護者】生駒葵",
    rarity: "SSR",
    school: "柊校舎",
    team: "カラフルブーケ",
    attribute: "キュート",
    type: "物理タイプ",
    role: "タンク",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E5%8E%B3%E6%A0%BC%E3%81%AA%E8%A6%8F%E5%BE%8B%E3%81%AE%E5%AE%88%E8%AD%B7%E8%80%85%E3%80%91%E7%94%9F%E4%BF%B1%E8%91%B5",
    skills: [
      {
        name: "規律遵守の精神",
        skill_type: "EX",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      },
      {
        name: "旱天の慈雨",
        skill_type: "AS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      },
      {
        name: "一閃",
        skill_type: "AS",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 212],
        hit_count: 1
      },
      {
        name: "腹が減っては戦ができぬ",
        skill_type: "PS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      },
      {
        name: "捲土重来",
        skill_type: "PS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      }
    ]
  },
  {
    name: "【臆病な褒められたがり少女】波瀬うるう",
    rarity: "SSR",
    school: "柊校舎",
    team: "カラフルブーケ",
    attribute: "アグレッシブ",
    type: "ENタイプ",
    role: "ENアタッカー",
    proficiency: [
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E8%86%A9%E7%97%85%E3%81%AA%E8%A4%92%E3%82%81%E3%82%89%E3%82%8C%E3%81%9F%E3%81%8C%E3%82%8A%E5%B0%91%E5%A5%B3%E3%80%91%E6%B3%A2%E7%80%AC%E3%81%86%E3%82%8B%E3%81%86",
    skills: [
      {
        name: "一日一不憫",
        skill_type: "EX",
        power_per_level: [15, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 21.02, undefined, undefined, undefined, undefined, 28.44],
        hit_count: 5
      },
      {
        name: "エクスペクトボーダー",
        skill_type: "AS",
        power_per_level: [60, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 93.6, undefined, undefined, undefined, undefined, 93.6],
        hit_count: 1
      },
      {
        name: "アフターライズ",
        skill_type: "PS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      }
    ]
  },
  {
    name: "【自称腹黒の深謀策士】姫川泉花",
    rarity: "SSR",
    school: "柊校舎",
    team: "カラフルブーケ",
    attribute: "シャイ",
    type: "敏捷タイプ",
    role: "コントロール",
    proficiency: [
      "前衛",
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E8%87%AA%E7%A7%B0%E8%85%B9%E9%BB%92%E3%81%AE%E6%B7%B1%E8%AC%80%E7%AD%96%E5%A3%AB%E3%80%91%E5%A7%AB%E5%B7%9D%E6%B3%89%E8%8A%B1",
    skills: [
      {
        name: "柊校舎の優等生",
        skill_type: "EX",
        power_per_level: [90, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 109.6, undefined, undefined, undefined, undefined, 170.64],
        hit_count: 1
      },
      {
        name: "イグニスファング",
        skill_type: "AS",
        power_per_level: [20, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 42.4],
        hit_count: 5
      },
      {
        name: "ファーストファング",
        skill_type: "AS",
        power_per_level: [90, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 190.8],
        hit_count: 1
      },
      {
        name: "ブレイブリフト",
        skill_type: "PS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      },
      {
        name: "テンションアップ",
        skill_type: "PS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      }
    ]
  },
  {
    name: "【正々堂々なミス・ツンデレ】綺羅クララ",
    rarity: "SSR",
    school: "柊校舎",
    team: "カラフルブーケ",
    attribute: "キュート",
    type: "敏捷タイプ",
    role: "コントロール",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E6%AD%A3%E3%80%85%E5%A0%82%E3%80%85%E3%81%AA%E3%83%9F%E3%82%B9%E3%83%BB%E3%83%84%E3%83%B3%E3%83%87%E3%83%AC%E3%80%91%E7%B6%BA%E7%BE%85%E3%82%AF%E3%83%A9%E3%83%A9",
    skills: [
      {
        name: "フェアボルゲネ・ゲフューレ",
        skill_type: "EX",
        power_per_level: [75, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 150.6],
        hit_count: 1
      },
      {
        name: "クアッドエッジ",
        skill_type: "AS",
        power_per_level: [18, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 28.08, undefined, undefined, undefined, undefined, 36.14],
        hit_count: 4
      },
      {
        name: "アーマークラッシュ",
        skill_type: "AS",
        power_per_level: [75, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 117],
        hit_count: 1
      }
    ]
  },
  {
    name: "【温厚篤実な面倒くさがり】夕凪舞亜",
    rarity: "SSR",
    school: "柊校舎",
    team: "カラフルブーケ",
    attribute: "スマート",
    type: "ENタイプ",
    role: "サポート",
    proficiency: [
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E6%B8%A9%E5%8E%9A%E7%AF%A4%E5%AE%9F%E3%81%AA%E9%9D%A2%E5%80%92%E3%81%8F%E3%81%95%E3%81%8C%E3%82%8A%E3%80%91%E5%A4%95%E5%87%AA%E8%88%9E%E4%BA%9C",
    skills: [
      {
        name: "さて……準備はできたわ",
        skill_type: "EX",
        power_per_level: [50, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 78, undefined, undefined, undefined, undefined, 94.8],
        hit_count: 1
      },
      {
        name: "スナイプリフレクター",
        skill_type: "AS",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 156, undefined, undefined, undefined, undefined, 156],
        hit_count: 1
      },
      {
        name: "アライヒーリング",
        skill_type: "AS",
        power_per_level: [35, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 45, undefined, undefined, undefined, undefined, 55],
        hit_count: null
      },
      {
        name: "パワーアプライ",
        skill_type: "AS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      },
      {
        name: "シングル・スナイプ",
        skill_type: "AS",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 156, undefined, undefined, undefined, undefined, 212],
        hit_count: 1
      }
    ]
  },
  {
    name: "【享楽のワイルドカード】ユリア・バーンズ",
    rarity: "SSR",
    school: "スカラ校舎",
    team: "カオスメイデン",
    attribute: "スマート",
    type: "物理タイプ",
    role: "物理アタッカー",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E4%BA%AB%E6%A5%BD%E3%81%AE%E3%83%AF%E3%82%A9%E3%83%AB%E3%83%89%E3%82%AB%E3%83%BC%E3%83%89%E3%80%91%E3%83%A6%E3%83%AA%E3%82%A2%E3%83%BB%E3%83%90%E3%83%BC%E3%83%B3%E3%82%BA",
    skills: [
      {
        name: "びしょ濡れだねー！",
        skill_type: "EX",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 156, undefined, undefined, undefined, undefined, 200.8],
        hit_count: 1
      },
      {
        name: "カオスキャノン",
        skill_type: "AS",
        power_per_level: [120, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 187.2, undefined, undefined, undefined, undefined, 254.4],
        hit_count: 1
      },
      {
        name: "マッドブレイドオーバーロード",
        skill_type: "AS",
        power_per_level: [30, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 46.8, undefined, undefined, undefined, undefined, 60.24],
        hit_count: 4
      },
      {
        name: "フレンジーキャノン",
        skill_type: "PS",
        power_per_level: [150, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 234, undefined, undefined, undefined, undefined, 301.2],
        hit_count: 1
      }
    ]
  },
  {
    name: "【混沌の立役者】劉翠蘭",
    rarity: "SSR",
    school: "スカラ校舎",
    team: "カオスメイデン",
    attribute: "アグレッシブ",
    type: "ENタイプ",
    role: "サポート",
    proficiency: [
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E6%B7%B7%E6%B2%8C%E3%81%AE%E7%AB%8B%E5%BD%B9%E8%80%85%E3%80%91%E5%8A%89%E7%BF%A0%E8%93%8B",
    skills: [
      {
        name: "ブラック・スタイル",
        skill_type: "EX",
        power_per_level: [150, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 234, undefined, undefined, undefined, undefined, 318],
        hit_count: 1
      },
      {
        name: "一破能弾",
        skill_type: "AS",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 156, undefined, undefined, undefined, undefined, 156],
        hit_count: 1
      },
      {
        name: "代助一避",
        skill_type: "PS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      },
      {
        name: "再起律動",
        skill_type: "PS",
        power_per_level: [35, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 45, undefined, undefined, undefined, undefined, 45],
        hit_count: null
      },
      {
        name: "追撃符",
        skill_type: "PS",
        power_per_level: [23, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 35.88, undefined, undefined, undefined, undefined, 35.88],
        hit_count: null
      }
    ]
  },
  {
    name: "【渇望秘めし淑女】紫雲沙耶",
    rarity: "SSR",
    school: "スカラ校舎",
    team: "カオスメイデン",
    attribute: "スマート",
    type: "ENタイプ",
    role: "ENアタッカー",
    proficiency: [
      "前衛",
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E6%B8%87%E6%9C%9B%E7%A7%91%E3%82%81%E3%81%97%E6%B7%91%E5%A5%B3%E3%80%91%E7%B4%AB%E9%9B%B2%E6%B2%99%E8%80%B6",
    skills: [
      {
        name: "乙女の高ぶり",
        skill_type: "EX",
        power_per_level: [60, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 93.6, undefined, undefined, undefined, undefined, 120.48],
        hit_count: 1
      },
      {
        name: "禅刃再生",
        skill_type: "AS",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 156, undefined, undefined, undefined, undefined, 189.6],
        hit_count: 1
      },
      {
        name: "桜花の舞",
        skill_type: "AS",
        power_per_level: [40, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 62.4, undefined, undefined, undefined, undefined, 62.4],
        hit_count: 1
      }
    ]
  },
  {
    name: "【空っぽのアクター】フィー・ドレーゼ",
    rarity: "SSR",
    school: "スカラ校舎",
    team: "カオスメイデン",
    attribute: "シャイ",
    type: "ENタイプ",
    role: "ENアタッカー",
    proficiency: [
      "前衛",
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E7%A9%BA%E3%81%A3%E3%81%B1%E3%81%AE%E3%82%A2%E3%82%AF%E3%82%BF%E3%83%BC%E3%80%91%E3%83%95%E3%82%A3%E3%83%BC%E3%83%BB%E3%83%89%E3%83%AC%E3%83%BC%E3%82%BC",
    skills: [
      {
        name: "幕間の微睡み",
        skill_type: "EX",
        power_per_level: [75, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 117, undefined, undefined, undefined, undefined, 159],
        hit_count: 1
      },
      {
        name: "カーテンショット",
        skill_type: "AS",
        power_per_level: [75, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 117, undefined, undefined, undefined, undefined, 142.2],
        hit_count: 1
      },
      {
        name: "アタックアンプリファイ",
        skill_type: "PS",
        power_per_level: [18, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 28.08, undefined, undefined, undefined, undefined, 28.08],
        hit_count: null
      }
    ]
  },
  {
    name: "【愛を求めるトラブルメーカー】アニス・ベネット",
    rarity: "SSR",
    school: "スカラ校舎",
    team: "カオスメイデン",
    attribute: "キュート",
    type: "敏捷タイプ",
    role: "コントロール",
    proficiency: [
      "前衛",
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E6%84%9B%E3%82%92%E6%B1%82%E3%82%81%E3%82%8B%E3%83%88%E3%83%A9%E3%83%96%E3%83%AB%E3%83%A1%E3%82%A4%E3%82%AB%E3%83%BC%E3%80%91%E3%82%A2%E3%83%8B%E3%82%B9%E3%83%BB%E3%83%99%E3%83%8D%E3%83%83%E3%83%88",
    skills: [
      {
        name: "Accept Love",
        skill_type: "EX",
        power_per_level: [75, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 150.6],
        hit_count: 1
      },
      {
        name: "Sweet Cleave",
        skill_type: "AS",
        power_per_level: [23, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 40, undefined, undefined, 46.18],
        hit_count: 4
      },
      {
        name: "Obsession Rocket",
        skill_type: "AS",
        power_per_level: [85, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 170.68],
        hit_count: 1
      },
      {
        name: "Emotional Edge",
        skill_type: "PS",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 143.54, undefined, undefined, undefined, undefined, 200.8],
        hit_count: 1
      }
    ]
  },
  {
    name: "【緋色の一匹狼】榊野ヒイロ",
    rarity: "SSR",
    school: "スカラ校舎",
    team: "インスカーレット",
    attribute: "クレバー",
    type: "敏捷タイプ",
    role: "物理アタッカー",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E7%B7%8B%E8%89%B2%E3%81%AE%E4%B8%80%E5%8C%B9%E7%8B%BC%E3%80%91%E7%A5%9B%E9%87%8E%E3%83%92%E3%82%A4%E3%83%AD",
    skills: [
      {
        name: "スカーレット・ネイル",
        skill_type: "EX",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 156],
        hit_count: 1
      },
      {
        name: "ペネトレイトバレット",
        skill_type: "AS",
        power_per_level: [90, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 140.4, undefined, undefined, undefined, undefined, 180.72],
        hit_count: 1
      },
      {
        name: "ピアースショット",
        skill_type: "AS",
        power_per_level: [90, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 180.72],
        hit_count: 1
      },
      {
        name: "ファーストストライク",
        skill_type: "PS",
        power_per_level: [120, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 227.52],
        hit_count: 1
      }
    ]
  },
  {
    name: "【ノーブル・グレイス】ドロテア・カークランド",
    rarity: "SSR",
    school: "ユーロ・タワー",
    team: "ピクシス・マスール",
    attribute: "コミカル",
    type: "物理タイプ",
    role: "物理アタッカー",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E3%83%8E%E3%83%BC%E3%83%96%E3%83%AB%E3%83%BB%E3%82%B0%E3%83%AC%E3%82%A4%E3%82%B9%E3%80%91%E3%83%89%E3%83%AD%E3%83%86%E3%82%A2%E3%83%BB%E3%82%AB%E3%83%BC%E3%82%AF%E3%83%A9%E3%83%B3%E3%83%89",
    skills: [
      {
        name: "Lumina Grace",
        skill_type: "EX",
        power_per_level: [190, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 296.4, undefined, undefined, undefined, undefined, 381.52],
        hit_count: 1
      },
      {
        name: "Sauvignon",
        skill_type: "AS",
        power_per_level: [110, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 171.6, undefined, undefined, undefined, undefined, 233.2],
        hit_count: 1
      }
    ]
  },
  {
    name: "【ギャルインフルエンサー】フルート・メルヴィル",
    rarity: "SSR",
    school: "LOC",
    team: "トレブルクインテット",
    attribute: "キュート",
    type: "ENタイプ",
    role: "サポート",
    proficiency: [
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E3%82%AE%E3%83%A3%E3%83%AB%E3%82%A4%E3%83%B3%E3%83%95%E3%83%AB%E3%82%A8%E3%83%B3%E3%82%B5%E3%83%BC%E3%80%91%E3%83%95%E3%83%AB%E3%83%BC%E3%83%88%E3%83%BB%E3%83%A1%E3%83%AB%E3%83%B4%E3%82%A3%E3%83%AB",
    skills: [
      {
        name: "ライブストリーミング！",
        skill_type: "EX",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      },
      {
        name: "いいね☆で元気だそ？",
        skill_type: "AS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      },
      {
        name: "ぽよビ～～ム♡",
        skill_type: "AS",
        power_per_level: [80, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 124.8, undefined, undefined, undefined, undefined, 124.8],
        hit_count: 1
      },
      {
        name: "ぽよぽよプロテクト",
        skill_type: "PS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      },
      {
        name: "イケてる♡イケてる",
        skill_type: "PS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      }
    ]
  },
  {
    name: "【省エネ主義の天才ハッカー】エヴィ・レーナルト",
    rarity: "SSR",
    school: "LOC",
    team: "トレブルクインテット",
    attribute: "アグレッシブ",
    type: "物理タイプ",
    role: "タンク",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E7%9C%81%E3%82%A8%E3%83%8D%E4%B8%BB%E7%BE%A9%E3%81%AE%E5%A4%A9%E6%89%8D%E3%83%8F%E3%83%83%E3%82%AB%E3%83%BC%E3%80%91%E3%82%A8%E3%83%B4%E3%82%A3%E3%83%BB%E3%83%AC%E3%83%BC%E3%83%8A%E3%83%AB%E3%83%88",
    skills: [
      {
        name: "スタックオーバーフロー",
        skill_type: "EX",
        power_per_level: [150, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 234, undefined, undefined, undefined, undefined, 301.2],
        hit_count: 1
      },
      {
        name: "グリッチストライク",
        skill_type: "AS",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 156, undefined, undefined, undefined, undefined, 156],
        hit_count: 1
      },
      {
        name: "バニッシュ",
        skill_type: "AS",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 156, undefined, undefined, undefined, undefined, 212],
        hit_count: 1
      }
    ]
  },
  {
    name: "【舞台を降りた元歌姫】シエナ・クラーク",
    rarity: "SSR",
    school: "LOC",
    team: "トレブルクインテット",
    attribute: "スマート",
    type: "ENタイプ",
    role: "ENアタッカー",
    proficiency: [
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E8%88%9E%E5%8F%B0%E3%82%92%E9%99%8D%E3%82%8A%E3%81%9F%E5%85%83%E6%AD%8C%E5%A7%AB%E3%80%91%E3%82%B7%E3%82%A8%E3%83%8A%E3%83%BB%E3%82%AF%E3%83%A9%E3%83%BC%E3%82%AF",
    skills: [
      {
        name: "ヴィヴァーチェ",
        skill_type: "EX",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 156, undefined, undefined, undefined, undefined, 189.6],
        hit_count: 1
      },
      {
        name: "リリカルブラスト",
        skill_type: "AS",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 212],
        hit_count: 1
      },
      {
        name: "アリアエナジー",
        skill_type: "AS",
        power_per_level: [85, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 180.2],
        hit_count: 1
      }
    ]
  },
  {
    name: "【戦うアントレプレナー】レイラ・ジェンキンス",
    rarity: "SSR",
    school: "LOC",
    team: "トレブルクインテット",
    attribute: "アグレッシブ",
    type: "敏捷タイプ",
    role: "コントロール",
    proficiency: [
      "前衛",
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E6%88%A6%E3%81%86%E3%82%A2%E3%83%B3%E3%83%88%E3%83%AC%E3%83%97%E3%83%AC%E3%83%8A%E3%83%BC%E3%80%91%E3%83%AC%E3%82%A4%E3%83%A9%E3%83%BB%E3%82%B8%E3%82%A7%E3%83%B3%E3%82%AD%E3%83%B3%E3%82%B9",
    skills: [
      {
        name: "大儲けだー！",
        skill_type: "EX",
        power_per_level: [12, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 18.72],
        hit_count: 7
      },
      {
        name: "フォーカススラスト",
        skill_type: "AS",
        power_per_level: [120, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 187.2, undefined, undefined, undefined, undefined, 187.2],
        hit_count: 1
      },
      {
        name: "四連突",
        skill_type: "AS",
        power_per_level: [20, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 42.4],
        hit_count: 4
      }
    ]
  },
  {
    name: "【空想造形アーティスト】ロージー・ヒューズ",
    rarity: "SSR",
    school: "LOC",
    team: "トレブルクインテット",
    attribute: "シャイ",
    type: "物理タイプ",
    role: "物理アタッカー",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E7%A9%BA%E6%83%B3%E9%80%A0%E5%BD%A2%E3%82%A2%E3%83%BC%E3%83%86%E3%82%A3%E3%82%B9%E3%83%88%E3%80%91%E3%83%AD%E3%83%BC%E3%82%B8%E3%83%BC%E3%83%BB%E3%83%92%E3%83%A5%E3%83%BC%E3%82%BA",
    skills: [
      {
        name: "あたしのアイデアになって",
        skill_type: "EX",
        power_per_level: [60, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 93.6, undefined, undefined, undefined, undefined, 93.6],
        hit_count: 1
      },
      {
        name: "メタル・ワイドバレット",
        skill_type: "AS",
        power_per_level: [75, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 117, undefined, undefined, undefined, undefined, 117],
        hit_count: 1
      },
      {
        name: "ラスト・プレゼント",
        skill_type: "PS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      },
      {
        name: "ヒール・アクティブ",
        skill_type: "PS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      },
      {
        name: "エクストラ・パワーアップ！",
        skill_type: "PS",
        power_per_level: [25, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 39, undefined, undefined, undefined, undefined, 43.75],
        hit_count: 1
      }
    ]
  },
  {
    name: "【風紀委員会の策謀家】姜小花",
    rarity: "SSR",
    school: "スカラ校舎",
    team: "風紀委員会",
    attribute: "アグレッシブ",
    type: "敏捷タイプ",
    role: "コントロール",
    proficiency: [
      "後衛"
    ],
    implementation_date: "2025/09/09",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E9%A2%A8%E7%B4%80%E5%A7%94%E5%93%A1%E4%BC%9A%E3%81%AE%E7%AD%96%E8%AC%80%E5%AE%B6%E3%80%91%E5%A7%9C%E5%B0%8F%E8%8A%B1",
    skills: [
      {
        name: "チェックメイト",
        skill_type: "EX",
        power_per_level: [75, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 150.6],
        hit_count: 1
      },
      {
        name: "ストライクリリース",
        skill_type: "AS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      },
      {
        name: "スキュア",
        skill_type: "AS",
        power_per_level: [85, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 132.6],
        hit_count: 1
      },
      {
        name: "インクリメントアタック",
        skill_type: "AS",
        power_per_level: [80, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 124.8],
        hit_count: 1
      },
      {
        name: "アフターシェイブ",
        skill_type: "PS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      }
    ]
  },
  {
    name: "【正義のヒーロー】リリー・ラヴォア",
    rarity: "SSR",
    school: "LOC",
    team: "風紀委員会",
    attribute: "スマート",
    type: "物理タイプ",
    role: "物理アタッカー",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/16",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E6%AD%A3%E7%BE%A9%E3%81%AE%E3%83%92%E3%83%BC%E3%83%AD%E3%83%BC%E3%80%91%E3%83%AA%E3%83%AA%E3%83%BC%E3%83%BB%E3%83%A9%E3%83%B4%E3%82%A9%E3%82%A2",
    skills: [
      {
        name: "SLAAAAASH!!!",
        skill_type: "EX",
        power_per_level: [200, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 312, undefined, undefined, undefined, undefined, undefined],
        hit_count: 1
      },
      {
        name: "アイム・ア・ヒーロ",
        skill_type: "AS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: 1
      },
      {
        name: "カムズレイト",
        skill_type: "AS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 156, undefined, undefined, undefined, undefined, undefined],
        hit_count: 1
      },
      {
        name: "テイルウインド",
        skill_type: "PS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      },
      {
        name: "リゲイン",
        skill_type: "PS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      }
    ]
  },
  {
    name: "【忠義の狂犬メイド】リュシー・ムーアクロフト",
    rarity: "SSR",
    school: "ユーロ・タワー",
    team: "ピクシス・マスール",
    attribute: "シャイ",
    type: "物理タイプ",
    role: "タンク",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/22",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E5%BF%A0%E7%BE%A9%E3%81%AE%E7%8B%82%E7%8A%AC%E3%83%A1%E3%82%A4%E3%83%89%E3%80%91%E3%83%AA%E3%83%A5%E3%83%BC%E3%82%B7%E3%83%BC%E3%83%BB%E3%83%A0%E3%83%BC%E3%82%A2%E3%82%AF%E3%83%AD%E3%83%95%E3%83%88",
    skills: [
      {
        name: "お嬢に近づくな……！",
        skill_type: "EX",
        power_per_level: [35, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 54.6],
        hit_count: 3
      },
      {
        name: "スタンディクライン",
        skill_type: "AS",
        power_per_level: [95, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 148.2, undefined, undefined, undefined, undefined, 190.76],
        hit_count: 1
      },
      {
        name: "シングル・プラス",
        skill_type: "AS",
        power_per_level: [90, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 140.4],
        hit_count: 1
      },
      {
        name: "スタート・プリエンプティブ",
        skill_type: "PS",
        power_per_level: [80, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 169.6],
        hit_count: 1
      }
    ]
  },
  {
    name: "【ドジで純粋な未来のエース】桃園める",
    rarity: "SR",
    school: "柊校舎",
    team: "シリウスシュガー",
    attribute: "アグレッシブ",
    type: "ENタイプ",
    role: "ENアタッカー",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E3%83%89%E3%82%B8%E3%81%A7%E7%B4%94%E7%B2%8B%E3%81%AA%E6%9C%AA%E6%9D%A5%E3%81%AE%E3%82%A8%E3%83%BC%E3%82%B9%E3%80%91%E6%A1%83%E5%9C%92%E3%82%81%E3%82%8B",
    skills: [
      {
        name: "トライパルスショット",
        skill_type: "AS",
        power_per_level: [40, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 62.4, undefined, undefined, undefined, undefined, undefined],
        hit_count: 3
      },
      {
        name: "ブーストトリガー",
        skill_type: "PS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      },
      {
        name: "エナジーバリア",
        skill_type: "PS",
        power_per_level: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        hit_count: null
      }
    ]
  },
  {
    name: "【器用貧乏なお嬢様リーダー】鳴滝七彩",
    rarity: "SR",
    school: "柊校舎",
    team: "シリウスシュガー",
    attribute: "スマート",
    type: "ENタイプ",
    role: "サポート",
    proficiency: [
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E5%99%A8%E7%94%A8%E8%B2%A7%E4%B9%8F%E3%81%AA%E3%81%8A%E5%AC%A2%E6%A7%98%E3%83%AA%E3%83%BC%E3%83%80%E3%83%BC%E3%80%91%E9%B3%B4%E6%BB%9D%E4%B8%83%E5%BD%A9",
    skills: [
      {
        name: "レイディアントシフト",
        skill_type: "AS",
        power_per_level: [70, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 109.2, undefined, undefined, undefined, undefined, undefined],
        hit_count: 1
      }
    ]
  },
  {
    name: "【紙一重なメイズオタク】月ヶ瀬ちゆる",
    rarity: "SR",
    school: "柊校舎",
    team: "シリウスシュガー",
    attribute: "シャイ",
    type: "物理タイプ",
    role: "タンク",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E7%B4%99%E4%B8%80%E9%87%8D%E3%81%AA%E3%83%A1%E3%82%A4%E3%82%BA%E3%82%AA%E3%82%BF%E3%82%AF%E3%80%91%E6%9C%88%E3%83%B6%E7%80%AC%E3%81%A1%E3%82%86%E3%82%8B",
    skills: [
      {
        name: "アブノーマルポイント",
        skill_type: "AS",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 156, undefined, undefined, undefined, undefined, undefined],
        hit_count: 1
      }
    ]
  },
  {
    name: "【お金大好きな生意気娘】朽葉ラミ",
    rarity: "SR",
    school: "柊校舎",
    team: "シリウスシュガー",
    attribute: "キュート",
    type: "物理タイプ",
    role: "タンク",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E3%81%8A%E9%87%91%E5%A4%A7%E5%A5%BD%E3%81%8D%E3%81%AA%E7%94%9F%E6%84%8F%E6%B0%97%E5%A8%98%E3%80%91%E6%9C%BD%E8%91%89%E3%83%A9%E3%83%9F",
    skills: [
      {
        name: "Speed Thrust",
        skill_type: "AS",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 156, undefined, undefined, undefined, undefined, undefined],
        hit_count: 1
      }
    ]
  },
  {
    name: "【ミステリアスガール】一条白奈",
    rarity: "SR",
    school: "柊校舎",
    team: "シリウスシュガー",
    attribute: "シャイ",
    type: "敏捷タイプ",
    role: "物理アタッカー",
    proficiency: [
      "前衛",
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E3%83%9F%E3%82%B9%E3%83%86%E3%83%AA%E3%82%A2%E3%82%B9%E3%82%AC%E3%83%BC%E3%83%AB%E3%80%91%E4%B8%80%E6%9D%A1%E7%99%BD%E5%A5%88",
    skills: [
      {
        name: "スケープゴート・スラッシュ",
        skill_type: "AS",
        power_per_level: [120, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 187.2],
        hit_count: 1
      }
    ]
  },
  {
    name: "【腕白メイド娘】ミリアム・ヘイワード",
    rarity: "SR",
    school: "ユーロ・タワー",
    team: "ピクシス・マスール",
    attribute: "スマート",
    type: "敏捷タイプ",
    role: "タンク",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E8%85%95%E7%99%BD%E3%83%A1%E3%82%A4%E3%83%89%E5%A8%98%E3%80%91%E3%83%9F%E3%83%AA%E3%82%A2%E3%83%A0%E3%83%BB%E3%83%98%E3%82%A4%E3%83%AF%E3%83%BC%E3%83%89",
    skills: [
      {
        name: "W Drain Shot",
        skill_type: "AS",
        power_per_level: [70, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 109.2],
        hit_count: 1
      },
      {
        name: "Drain Shot",
        skill_type: "AS",
        power_per_level: [100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 156],
        hit_count: 1
      }
    ]
  },
  {
    name: "【毒舌メイド娘】ハリエット・ミルズ",
    rarity: "SR",
    school: "ユーロ・タワー",
    team: "ピクシス・マスール",
    attribute: "キュート",
    type: "ENタイプ",
    role: "コントロール",
    proficiency: [
      "前衛",
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E6%AF%92%E8%88%8C%E3%83%A1%E3%82%A4%E3%83%89%E5%A8%98%E3%80%91%E3%83%8F%E3%83%AA%E3%82%A8%E3%83%83%E3%83%88%E3%83%BB%E3%83%9F%E3%83%AB%E3%82%BA",
    skills: [
      {
        name: "Acid Cannon",
        skill_type: "AS",
        power_per_level: [75, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 117],
        hit_count: 1
      },
      {
        name: "Purge Shot",
        skill_type: "AS",
        power_per_level: [85, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 132.6],
        hit_count: 1
      }
    ]
  },
  {
    name: "【臆病メイド娘】ケイト・フルニエ",
    rarity: "SR",
    school: "ユーロ・タワー",
    team: "ピクシス・マスール",
    attribute: "アグレッシブ",
    type: "敏捷タイプ",
    role: "コントロール",
    proficiency: [
      "前衛",
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E8%87%86%E7%97%85%E3%83%A1%E3%82%A4%E3%83%89%E5%A8%98%E3%80%91%E3%82%B1%E3%82%A4%E3%83%88%E3%83%BB%E3%83%95%E3%83%AB%E3%83%8B%E3%82%A8",
    skills: [
      {
        name: "キャプチャスラッシュ",
        skill_type: "AS",
        power_per_level: [85, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 132.6, undefined, undefined, undefined, undefined, undefined],
        hit_count: 1
      }
    ]
  },
  {
    name: "【爆走お転婆少女】ジュリー・ステイシー",
    rarity: "R",
    school: "特別養成校舎",
    team: "プレ・クラス－A",
    attribute: "アグレッシブ",
    type: "物理タイプ",
    role: "物理アタッカー",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E7%88%86%E8%B5%B0%E3%81%8A%E8%BB%A2%E5%A9%86%E5%B0%91%E5%A5%B3%E3%80%91%E3%82%B8%E3%83%A5%E3%83%AA%E3%83%BC%E3%83%BB%E3%82%B9%E3%83%86%E3%82%A4%E3%82%B7%E3%83%BC",
    skills: [
      {
        name: "二連切り",
        skill_type: "AS",
        power_per_level: [35, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 54.6],
        hit_count: 2
      },
      {
        name: "カウンター",
        skill_type: "PS",
        power_per_level: [86, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 134.16],
        hit_count: 1
      }
    ]
  },
  {
    name: "【プレクラス－Aのお姉さん】黒森ラウラ",
    rarity: "R",
    school: "特別養成校舎",
    team: "プレ・クラス－A",
    attribute: "シャイ",
    type: "ENタイプ",
    role: "サポート",
    proficiency: [
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%83%97%E3%83%AC%E3%82%AF%E3%83%A9%E3%82%B9%EF%BC%8DA%E3%81%AE%E3%81%8A%E5%A7%8A%E3%81%95%E3%82%93%E3%80%91%E9%BB%92%E6%A3%AE%E3%83%A9%E3%82%A6%E3%83%A9",
    skills: []
  },
  {
    name: "【ストイックな努力家】樋向心香",
    rarity: "R",
    school: "特別養成校舎",
    team: "プレ・クラス－A",
    attribute: "スマート",
    type: "物理タイプ",
    role: "コントロール",
    proficiency: [
      "前衛",
      "後衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E3%82%B9%E3%83%88%E3%82%A4%E3%83%83%E3%82%AF%E3%81%AA%E5%8A%AA%E5%8A%9B%E5%AE%B6%E3%80%91%E6%A8%8B%E5%90%91%E5%BF%83%E9%A6%99",
    skills: [
      {
        name: "プレ・スナイプ",
        skill_type: "AS",
        power_per_level: [60, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 93.6, undefined, undefined, undefined, undefined, undefined],
        hit_count: 1
      }
    ]
  },
  {
    name: "【制御不能の破壊者】ノエル・アルエ",
    rarity: "R",
    school: "特別養成校舎",
    team: "プレ・クラス－A",
    attribute: "キュート",
    type: "物理タイプ",
    role: "物理アタッカー",
    proficiency: [
      "前衛"
    ],
    implementation_date: "2025/09/03",
    detail_link: "https://muvluv-girls-garden.wikiru.jp/?%E3%80%90%E5%88%B6%E5%BE%A1%E4%B8%8D%E8%83%BD%E3%81%AE%E7%A0%B4%E5%A3%8A%E8%80%85%E3%80%91%E3%83%8E%E3%82%A8%E3%83%AB%E3%83%BB%E3%82%A2%E3%83%AB%E3%82%A8",
    skills: [
      {
        name: "ダブルショット",
        skill_type: "AS",
        power_per_level: [50, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 78, undefined, undefined, undefined, undefined, undefined],
        hit_count: 2
      },
      {
        name: "ワーニングショット",
        skill_type: "PS",
        power_per_level: [30, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 46.8, undefined, undefined, undefined, undefined, undefined],
        hit_count: 1
      }
    ]
  }
];
