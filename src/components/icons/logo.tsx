import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className, ...props }: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>) {
  return (
    <Image
      src="https://i.ibb.co/vxGTgFwY/chatgpt-image-latest-20251216-b-REMOVE-THIS-IMAGE-BA.png"
      alt="BetterPlugins Hub Logo"
      width={100}
      height={100}
      className={cn("h-10 w-10", className)}
      priority
      {...props}
    />
  );
}
