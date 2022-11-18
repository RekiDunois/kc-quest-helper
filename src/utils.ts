export interface Quest {
  code: string
  desc: string
  memo?: string
  memo2?: string
  name: string
  pre?: string[]
  type: QuestType
}

export type QuestNode = { [key: string]: Quest }

export enum QuestType {
  Composition, //编成
  Sortie, //出击
  Exercise, //演习
  Expedition, //远征
  Supply, //补给
  Arsenal, //工厂
  Modernization, //改修
  Special,
}

type QuestTypeIndex = { [key: string]: QuestType }

export const QuestTypeMap: QuestTypeIndex = {
  A: QuestType.Composition,
  B: QuestType.Sortie,
  C: QuestType.Exercise,
  D: QuestType.Expedition,
  E: QuestType.Supply,
  F: QuestType.Arsenal,
  G: QuestType.Modernization,
}

export interface IDictionary {
  [index: string]: string
}

export interface QuestDataSource {
  URL_PREFIX: string
  VERSION_URL?: string
  LANGS: string[]
  LOCATES?: string[]
  DATA_URL: string
  DATA_FILE_NAME: string
}

export const kcanotifyDataContext = (): QuestDataSource => {
  const result: QuestDataSource = {
    URL_PREFIX:
      'https://raw.githubusercontent.com/antest1/kcanotify-gamedata/master',
    LANGS: ['scn', 'tcn', 'jp', 'en', 'ko'],
    LOCATES: ['zh-CN', 'zh-TW', 'ja-JP', 'en-US', 'ko-KR'],
    DATA_FILE_NAME: 'quests-jp.json',
    DATA_URL: '',
  }

  result.DATA_URL = `${result.URL_PREFIX}/files/${result.DATA_FILE_NAME}`
  result.VERSION_URL = `${result.URL_PREFIX}/KCAINFO`

  return result
}

export const kcwikiDataContext = (): QuestDataSource => {
  const result: QuestDataSource = {
    URL_PREFIX: 'https://kcwikizh.github.io/kcQuests/',
    LANGS: ['scn'],
    DATA_URL: '',
    DATA_FILE_NAME: 'quests-scn.json',
    VERSION_URL: 'https://api.github.com/repos/kcwikizh/kcQuests/branches/main',
  }

  result.DATA_URL = `${result.URL_PREFIX}/${result.DATA_FILE_NAME}`
  return result
}
