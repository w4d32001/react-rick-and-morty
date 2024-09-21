import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./layouts/LayoutCharacter"
import { LayoutEpisode } from "./layouts/LayoutEpisode"

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}></Route>
          <Route path="/episode" element={<LayoutEpisode/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
