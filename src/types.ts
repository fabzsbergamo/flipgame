export type AllEmojis = {
  allEmojis: EmojiCategoryData[];
};

export interface Emoji {
  id: string;
  name: string;
  keywords: string[];
  skins: { src: string }[];
}

interface EmojiCategoryData {
  id: string;
  name: string;
  emojis: Emoji[];
}
