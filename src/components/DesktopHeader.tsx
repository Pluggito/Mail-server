import { Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "./ui/button";
import { getOrCreateUser } from "@/actions/user.actions";

export async function DesktopHeader() {
  const user = await currentUser();
  if(user) await getOrCreateUser();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Search Section */}
          <div className="flex w-1/2 items-center space-x-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search mail"
                className="pl-10 bg-muted/50 border-muted-foreground/20 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/80 transition-colors cursor-pointer">
              <Image
                src="/icons8-ai 2.svg"
                alt="AI Icon"
                width={24}
                height={24}
              />
            </div>
            {user ? (
              <>
                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10",
                        userButtonPopoverCard:
                          "bg-background border border-border",
                        userButtonPopoverActionButton:
                          "text-foreground hover:bg-muted",
                      },
                    }}
                  />
                </SignedIn>
              </>
            ) : (
              <SignedOut>
                <div className="flex items-center space-x-2">
                  <SignInButton mode="modal">
                    <Button variant={"ghost"} className="text-foreground hover:text-primary transition-colors font-medium text-sm sm:text-base px-3 py-2 rounded-md hover:bg-muted">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button variant={'default'} className="bg-primary hover:bg-primary/90">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
            )}

            <Settings className="cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
}
