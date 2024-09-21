import axios from "axios";
import { useEffect, useState } from "react";
import CharacterInterface from "../interfaces/Character";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface CharacterProps {
  characterName: string;  
  characterStatus: string;
  characterSpecie: string;
}

export const Character: React.FC<CharacterProps> = ({ characterName, characterStatus, characterSpecie }) => {
  const [paginate, setPaginate] = useState<number>(1);
  const [name, setName] = useState(characterName || "");
  const [status, setStatus] = useState(characterStatus || "");
  const [specie, setSpecie] = useState(characterSpecie || "");
  const [data, setData] = useState<CharacterInterface[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setName(characterName);
    setStatus(characterStatus);
    setSpecie(characterSpecie);
    setPaginate(1);
    setData([]);
    setHasMore(true);
  }, [characterName, characterStatus, characterSpecie]);

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      let API_CHARACTER = `https://rickandmortyapi.com/api/character?page=${paginate}`;
      if (name) API_CHARACTER += `&name=${name}`;
      if (specie) API_CHARACTER += `&species=${specie}`;
      if (status) API_CHARACTER += `&status=${status}`;
      
      try {
        const response = await axios.get(API_CHARACTER);
        const newCharacters: CharacterInterface[] = response.data.results;

        setData((prevData) => {
          const existingIds = new Set(prevData.map((char) => char.id));
          const uniqueCharacters = newCharacters.filter(
            (char) => !existingIds.has(char.id)
          );
          return [...prevData, ...uniqueCharacters];
        });

        if (!response.data.info.next) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [paginate, name, status, specie]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (!loading && hasMore) {
        setPaginate((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const speciesColors: { [key: string]: string } = {
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

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {data.map((character) => {
          const bgColor = speciesColors[character.species] || 'bg-gray-400';
          return (
            <div key={character.id} className="bg-gray-100 border w-full rounded-lg p-4 relative gap-y-4">
              <div className="flex items-center justify-center w-full">
              <img
                src={character.image}
                alt={character.name}
                className="w-60 h-auto mb-2 rounded-full"
              />
              </div>
              <h3 className="text-2xl text-primary text-center font-bold py-6 text-shadow-sm">{character.name}</h3>
              <div className="absolute top-52 md:top-52 lg:top-40 xl:top-48 left-0 p-2">
                <span className={`${bgColor} py-2 px-4 rounded-lg text-sm text-white`}>
                  {character.species}
                </span>
              </div>
              <div className="absolute top-0 right-0 p-2">
                <p className={`text-white py-2 px-4 rounded-lg font-bold ${character.status === 'Alive' ? 'bg-green-500' : character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'}`}>
                  {character.status}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      {loading && <p className="flex items-center justify-center"><AiOutlineLoading3Quarters className="animate-spin-fast text-7xl text-primary "/></p>}
    </div>
  );
};
