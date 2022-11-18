import pangu from 'pangu'
import { useState } from 'react'
import useSWR from 'swr'
import {
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
  const { data, error } = useSWR<QuestNode>(
    kcwikiDataContext().DATA_URL,
    (url: string) => fetch(url).then((res) => res.json())
  )
  const beautifyQuests = (data: QuestNode): QuestNode => {
    Object.entries(data).forEach((quest) => spacingQuest(quest[1]))
    return data
  }
  return {
    filted:
      data === undefined
        ? []
        : Object.values(beautifyQuests(data)).filter(predicate),
    isLoading: !error && !data,
    isError: error,
  }
}
