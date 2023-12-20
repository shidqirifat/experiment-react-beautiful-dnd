import {
  Avatar as AvatarEl,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const IMAGE_URL =
  "https://media.licdn.com/dms/image/D5603AQGrzAA2cc2fbQ/profile-displayphoto-shrink_800_800/0/1669472440941?e=2147483647&v=beta&t=s99HB8kcD2iEe_BSaxIulYwmtDfkA2VSUWJdGJe5q3U";

export function Avatar() {
  return (
    <button className="hover:brightness-105 transition">
      <AvatarEl>
        <AvatarImage src={IMAGE_URL} />
        <AvatarFallback>CN</AvatarFallback>
      </AvatarEl>
    </button>
  );
}
