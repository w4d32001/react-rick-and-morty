import { FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"
import { Home } from "../pages/Home"
import { useState } from "react"

export const Layout = () => {
  const [name, setName] = useState("")
  const [specie, setSpecie] = useState("")
  const [status, setStatus] = useState("")

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
      console.log(e.target.value); 
  }
  const species: { [key: string]: string } = {
    Human: 'bg-blue-500',
    Alien: 'bg-cyan-500',
    Humanoid: 'bg-purple-500',
    Robot: 'bg-gray-500',
    Animal: 'bg-yellow-500',
    Mythological: 'bg-red-500',
    Cronenberg: 'bg-pink-500',
    Vampire: 'bg-indigo-500',
    Parasite: 'bg-orange-500',
    Poopybutthole: 'bg-teal-500',
    Unknown: 'bg-black',
  };
  const states: { [key: string]: string } = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500',
  };
  return ( 
    <div className="min-h-screen bg-gray-900 font-ubuntu">
      <nav className="flex items-center justify-between px-4">
      <div>
        <img src="https://1000logos.net/wp-content/uploads/2022/03/Rick-and-Morty-500x281.png" alt="" className="w-auto h-28" />
      </div>
      <ul className="text-gray-100 flex items-center gap-4">
        <li><Link to="" className="font-bold hover:text-primary transition-colors hover:cursor-pointer">Personajes</Link></li>
        <li><Link to="" className="font-bold hover:text-primary transition-colors hover:cursor-pointer">Episodios</Link></li>
        <li><Link to="" className="font-bold hover:text-primary transition-colors hover:cursor-pointer">Ubicaciones</Link></li>
      </ul>
      </nav>
      <div className="p-8">
      <div className="bg-gray-100 py-4 px-8 rounded-lg flex items-center w-full relative mb-8">
        <input type="search" className="bg-gray-900 py-2 px-4 w-full rounded-lg
        font-ubuntu placeholder:text-gray-300 text-primary text-xl" placeholder="Buscar..."
        value={name}
        onChange={onChange}
        />
        {
          name == "" ? <FaSearch className="absolute right-10 text-primary"/> : <FaSearch className="hidden"/>
        }
        
      </div>
      <div className="bg-gray-100 py-4 px-8 rounded-lg flex flex-col  w-full gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-2xl font-medium text-primary">Specie: </p>
          <button onClick={() => setSpecie("")} className="text-white bg-slate-500 px-4 py-2 rounded-lg">All</button>
          {Object.keys(species).map((value, key) => (
          <button key={key} onClick={() => setSpecie(value)} className={`text-white ${species[value]} px-4 py-2 rounded-lg`}>
           { value }
          </button>
          ))}
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-2xl font-medium text-primary">Status:</p>
          <button onClick={() => setStatus("")} className="text-white bg-slate-500 px-4 py-2 rounded-lg">All</button>
          {Object.keys(states).map((value, key) => (
          <button key={key} onClick={() => setStatus(value)} className={`text-white ${states[value]} px-4 py-2 rounded-lg`}>
           { value }
          </button>
          ))}
        </div>
      </div>
      <Home characterName={name} characterSpecie={specie} characterStatus={status}/>
      </div>
    </div>
  )
}
