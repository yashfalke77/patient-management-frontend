import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface AvatarDropdownProps {
  onLogout: () => void;
}

export function AvatarDropdown({ onLogout }: AvatarDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback className="text-white bg-dark-400 border border-dark-500">
              USR
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 bg-dark-400 border-none rounded-xl overflow-hidden">
        <DropdownMenuGroup>
          <Link href="/">
            <DropdownMenuItem className="hover:bg-dark-500 focus:bg-dark-500 cursor-pointer rounded-lg">
              Appointments
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="hover:bg-dark-500 focus:bg-dark-500 cursor-pointer rounded-lg">
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-dark-500 focus:bg-dark-500 cursor-pointer rounded-lg">
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-dark-500" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={onLogout}
            className="text-red-500 hover:bg-dark-500 focus:bg-dark-500 focus:text-red-500 cursor-pointer rounded-lg"
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
