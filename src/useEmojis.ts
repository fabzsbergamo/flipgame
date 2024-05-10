import axios from "axios";
import { useQuery } from "react-query";

export type AllEmojis = {
  categories: CategoryData[];
  emojis: Record<string, Emoji>;
};

interface CategoryData {
  id: string;
  name: string;
  emojis: Emoji[];
}

interface Emoji {
  id: string;
  name: string;
  keywords: string[];
  skins: EmojiSkin[];
  version: number;
}

interface EmojiSkin {
  unified: string;
  native: string;
}

const useEmojis = () => {
  const fetchEmojis = () =>
    axios
      .get<AllEmojis>("https://cdn.jsdelivr.net/npm/@emoji-mart/data")
      .then((res) => res.data);

  return useQuery<AllEmojis, Error>({
    queryKey: ["emojis"],
    queryFn: fetchEmojis,
  });
};

export default useEmojis;
