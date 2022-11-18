import { Box } from '@chakra-ui/react'
import './App.css'
import { QuestList } from './component/QuestList'
import { QuestType } from './utils'
import { useFilterData } from './hooks/fetchQuestData'

function App() {
  const { filted, isError, isLoading } = useFilterData((quest) => {
    return quest.desc.match('1-2') !== null
  })
  if (isLoading) return <Box>fetching quests</Box>
  if (isError) return <Box>quest fetch failed</Box>
  return (
    <Box>
      <QuestList type={QuestType.Exercise} data={filted} />
    </Box>
  )
}

export default App
