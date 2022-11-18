import pangu from 'pangu'
import { useState } from 'react'
import useSWR from 'swr'
import {
  kcanotifyDataContext,
  kcwikiDataContext,
  Quest,
  QuestNode,
  QuestType,
  QuestTypeMap,
} from '../utils'

const spacingQuest = (quest: Quest) => {
  const { code, name, desc, memo2, memo } = quest
  quest.code = code.trim()
  const type = quest.code.match(/^[A|B|C|D|E|F|G]\d/)
  if (type === null) quest.type = QuestType.Special
  else {
    quest.type = QuestTypeMap[quest.code[0]]
  }
  quest.name = pangu.spacing(name)
  quest.desc = pangu.spacing(desc)
  if (memo) quest.memo = pangu.spacing(memo)
  if (memo2) quest.memo2 = pangu.spacing(memo2)
  return quest
}

export const useFilterData = <T, S extends T>(
  predicate: (questdata: Quest) => boolean
) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json())
  const { data: questsCn, error } = useSWR<QuestNode>(
    kcwikiDataContext().DATA_URL,
    fetcher
  )
  const { data: questJp } = useSWR<QuestNode>(
    kcanotifyDataContext().DATA_URL,
    fetcher
  )
  const beautifyQuests = (data: QuestNode): QuestNode => {
    Object.entries(data).forEach((quest) => spacingQuest(quest[1]))
    return data
  }
  const replaceQuestName = (
    tobeReplace: QuestNode,
    replace: QuestNode
  ): QuestNode => {
    Object.entries(tobeReplace).forEach((quest) => {
      const jp = replace[quest[0]]
      if (jp === undefined) return
      quest[1].name = jp.name
    })
    return tobeReplace
  }
  return {
    filted:
      questsCn === undefined
        ? []
        : questJp === undefined
        ? Object.values(beautifyQuests(questsCn)).filter(predicate)
        : Object.values(
            replaceQuestName(beautifyQuests(questsCn), questJp)
          ).filter(predicate),
    isLoading: !error && !questsCn,
    isError: error,
  }
}
