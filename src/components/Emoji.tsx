import bullsEye from "../assets/bulls-eye.webp";
import thumbsUp from "../assets/thumbs-up.webp";
import meh from "../assets/meh.webp";

interface Props {
  rating: number;
}

interface EmojiData {
  src: string;
  alt: string;
  size: string;
}

export default function Emoji({ rating }: Props) {
  if (rating < 3) return null;

  const emojiMap: { [key: number]: EmojiData } = {
    3: { src: meh, alt: "meh", size: "w-6 h-6" },
    4: { src: thumbsUp, alt: "recommended", size: "w-6 h-6" },
    5: { src: bullsEye, alt: "exceptional", size: "w-9 h-9" },
  };

  const emoji = emojiMap[rating];
  if (!emoji) return null;

  return (
    <img src={emoji.src} alt={emoji.alt} className={`${emoji.size} mt-1`} />
  );
}
