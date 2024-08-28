import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";

export const GuruAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className="p-1" src="/logo.png" />
    </Avatar>
  );
};
