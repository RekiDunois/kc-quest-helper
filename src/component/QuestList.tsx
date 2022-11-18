import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Quest, QuestType } from '../utils'
import { QuestCard } from './QuestCard'

export interface QuestListProps {
  data: Quest[]
  type: QuestType
}

const BaseThead = () => (
  <>
    <Th>编号</Th>
    <Th>名称</Th>
    <Th>描述</Th>
  </>
)

const SorteThead = () => (
  <>
    <Th>旗舰</Th>
    <Th>其他要求</Th>
    <Th>海域</Th>
  </>
)

const CompositionThead = () => (
  <>
    <Th>旗舰</Th>
    <Th>僚舰</Th>
  </>
)

const ExerciseThead = () => <></>

const SupplyThead = () => <></>

const ArsenalThead = () => (
  <>
    <Th>拆解</Th>
    <Th>消耗</Th>
  </>
)

const ModernizationThead = () => (
  <>
    <Th>改修舰</Th>
    <Th>素材要求</Th>
  </>
)

const TheadType = {}

export const QuestList = (prop: QuestListProps) => {
  const cards = Object.values(prop.data).map((value, index) => (
    <QuestCard key={index} quest={value} />
  ))
  return (
    <TableContainer whiteSpace="-moz-pre-wrap">
      <Table>
        <Thead>
          <Tr>
            <BaseThead />
          </Tr>
        </Thead>
        <Tbody>{cards}</Tbody>
      </Table>
    </TableContainer>
  )
}
