import React, { useEffect, useState } from "react";
import { Character } from "../pages/Character";
import axios from "axios";
import CharacterInterface from "../interfaces/Character";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Character {
  episode: string[];
}

export const CharacterDetailed: React.FC<Character> = ({ episode }) => {
  const [characters, setCharacters] = useState<CharacterInterface[]>([]);
  // const [additionalData, setAdditionalData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        // 1. Hacemos las solicitudes a las URLs de los personajes
        const characterPromises = episode.map((url) => axios.get(url));
        const characterResponses = await Promise.all(characterPromises);

        // 2. Obtenemos los datos de los personajes
        const charactersData = characterResponses.map(
          (response) => response.data
        );
        setCharacters(charactersData);

        // 3. Realizamos más solicitudes si los personajes tienen datos adicionales (ej. origin.url)
        /*const additionalPromises = charactersData.flatMap(character => {
          if (character.origin && character.origin.url) {
            return axios.get(character.origin.url); // Hacer la solicitud a esa URL
          }
          return []; // Si no hay más URLs, devolvemos un array vacío
        });

        // 4. Obtenemos los datos adicionales
        const additionalResponses = await Promise.all(additionalPromises);
        const additionalDataArray = additionalResponses.map(response => response.data);
        console.log(additionalDataArray)
        setAdditionalData(additionalDataArray);*/
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    
    fetchCharacters();
  }, [episode]);

  const speciesColors: { [key: string]: string } = {
    Human: "bg-blue-500",
    Alien: "bg-cyan-500",
    Humanoid: "bg-purple-500",
    Robot: "bg-gray-500",
    Animal: "bg-yellow-500",
    Mythological: "bg-red-500",
    Cronenberg: "bg-pink-500",
    Vampire: "bg-indigo-500",
    Parasite: "bg-orange-500",
    Poopybutthole: "bg-teal-500",
    Unknown: "bg-black",
  };

  return (
    <div>
      <div className="my-4 text-2xl text-secondary-900 text-shadow-sm">
        Characters per episode
      </div>
      {loading && (
        <p className="flex items-center justify-center">
          <AiOutlineLoading3Quarters className="animate-spin-fast text-7xl text-primary " />
        </p>
      )}
      <div className="flex flex-col gap-5  ">
        {characters.map((character) => {
          const bgColor = speciesColors[character.species] || "bg-gray-400";
          return (
            <div
              key={character.id}
              className="flex items-center justify-between border border-primary md:p-4 rounded-lg shadow-lg p-5"
            >
              <div className="w-3/4 flex flex-col md:flex-row gap-6 ">
                <img
                  src={character.image}
                  alt=""
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h1 className="xl md:text-3xl font-bold text-shadow-sm text-primary">
                    {character.name}
                  </h1>
                  <span className="text-sm text-primary text-shadow-sm">
                    Location: {character.origin.name}
                  </span>
                </div>
              </div>

              <div className="w-1/4 flex justify-center">
                <span
                  className={`${bgColor} py-2 px-4 rounded-lg text-sm text-white`}
                >
                  {character.species}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
