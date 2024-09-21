import { Navbar } from "../components/Navbar"
import { Episode } from "../pages/Episode"

export const LayoutEpisode = () => {
  return (
    <div className="min-h-screen bg-gray-900 font-ubuntu">
        <Navbar/>
        <Episode/>
    </div>
  )
}
