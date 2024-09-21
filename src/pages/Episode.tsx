import { useEffect, useState } from "react";
import EpisodeInterface from "../interfaces/Episode";
import axios from "axios";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Fragment } from "react";
import { CharacterDetailed } from "../components/CharacterDetailed";

export const Episode = () => {
  const [paginate, setPaginate] = useState<number>(1);
  const [data, setData] = useState<EpisodeInterface[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadEpisodes = async () => {
      setLoading(true);
      const API_CHARACTER = `https://rickandmortyapi.com/api/episode?page=${paginate}`;

      try {
        const response = await axios.get(API_CHARACTER);
        const newEpisode: EpisodeInterface[] = response.data.results;

        setData((prevData) => {
          const existingIds = new Set(prevData.map((char) => char.id));
          const uniqueEpisodes = newEpisode.filter(
            (char) => !existingIds.has(char.id)
          );
          return [...prevData, ...uniqueEpisodes];
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

    loadEpisodes();
  }, [paginate]);

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

  return (
    <div className="p-8">
      <div></div>
      <div className="flex flex-col justify-start gap-8">
        {data.map((episode) => (
          <Disclosure
            key={episode.id}
            as="div"
            className="bg-gray-100 px-4 py-2 rounded-lg"
          >
            {({ open }) => (
              <>
                <DisclosureButton className="py-2 group text-start text-primary text-xl text-shadow-sm w-full flex items-center justify-between">
                  <div className="flex gap-4 items-center w-3/4">
                    <span className="w-1/2">{episode.name}</span>
                    <div className="flex w-1/2 flex-nowrap flex-col gap-2">
                      <div>
                        <span className="text-xl border-b border-primary py-1">
                          {episode.episode}
                        </span>
                      </div>
                      <span className="text-sm text-gray-700">{episode.air_date}</span>
                    </div>
                  </div>
                  <div className="w-1/4 flex justify-end">
                    <MdKeyboardArrowRight className="w-5 group-data-[open]:rotate-90 transition-all" />
                  </div>
                </DisclosureButton>
                <div className="overflow-hidden group-data-[open]:rotate-90 transition-all">
                  <AnimatePresence>
                    {open && (
                      <DisclosurePanel static as={Fragment}>
                        <motion.div
                          initial={{ opacity: 0, y: -24 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -24 }}
                          transition={{ duration: 0.2, ease: easeOut }}
                          className="origin-top"
                        >
                          <CharacterDetailed
                            key={episode.id}
                            episode={episode.characters}
                          />
                        </motion.div>
                      </DisclosurePanel>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};
