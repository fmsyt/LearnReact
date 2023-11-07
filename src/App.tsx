import { Route, Routes } from 'react-router-dom'
import CatList from './page/CatList'
import NotFound from './page/NotFound'
import CatListContextProvider from './core/CatListContextProvider'
import WebSocketProvider from './core/WebSocketProvider'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CatListPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const CatListPage = () => {
  return (
    <WebSocketProvider>
      <CatListContextProvider>
        <CatList />
      </CatListContextProvider>
    </WebSocketProvider>
  )
}

export default App
