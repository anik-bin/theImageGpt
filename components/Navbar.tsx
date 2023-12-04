"use client";
import * as React from "react"
import { useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserButton, useUser } from "@clerk/nextjs";
import { MAX_FREE_CREDITS } from "@/app/constants/constants";

interface NavbarProps {
  apiLimitCredits: number;
};

const Navbar = ({ apiLimitCredits = 0 }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { setTheme } = useTheme();
  const { user, isLoaded } = useUser();

  return (
    <nav className="bg-white dark:bg-[#07001f] p-4 pt-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <div className="text-black dark:text-white text-lg font-bold">ImageGPT</div>
        </Link>
        <div className="lg:hidden">
          <button className="text-black" onClick={toggleMenu}>
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        <div className={`lg:flex lg:space-x-4 sm:flex sm:gap-6 ${isMenuOpen ? 'block' : 'hidden'}`}>
          {isLoaded && user && (
            <>
              <p className="mt-2 text-lg">{apiLimitCredits} / {MAX_FREE_CREDITS} credits</p>
              <div className="mt-1">
                <UserButton afterSignOutUrl="/" />
              </div>
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>


      </div>
    </nav>
  );
};

export default Navbar;
