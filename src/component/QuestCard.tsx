import { Box, Grid, GridItem, SimpleGrid, Text, Th, Tr } from '@chakra-ui/react'
import { Quest } from '../utils'

export interface QuestCardProps {
  quest: Quest
}

export const QuestCard = (props: QuestCardProps) => {
  const { name, desc, code } = props.quest
  return (
    <Tr>
      <Th>{code}</Th>
      <Th>{name}</Th>
      <Th>{desc}</Th>
    </Tr>
  )
}
