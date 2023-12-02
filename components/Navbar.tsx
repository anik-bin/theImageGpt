"use client";
import * as React from "react"
import { useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signIn } from 'next-auth/react'


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { status, data: session } = useSession();
  const { setTheme } = useTheme();

  return (
    <nav className="bg-white p-4 pt-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <div className="text-black text-lg font-bold">ImageGPT</div>
        </Link>
        <div className="lg:hidden">
          <button className="text-black" onClick={toggleMenu}>
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {status === 'authenticated' ?
          (

            <>
              <div className={`lg:flex lg:space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
                <DropdownMenu>
                  <DropdownMenuTrigger><Image src={session?.user?.image!} alt="Google account profile pic" width={40} height={40} className='rounded-full' /></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Name: <span>{session?.user?.name}</span></DropdownMenuLabel>
                    <DropdownMenuLabel>Email: <span>{session?.user?.email}</span></DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

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

              
            </>
            

            

          ) :

          (
            <div className={`lg:flex lg:space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
              
              <Button className="text-white text-lg" onClick={() => signIn("google")}>Login</Button>
            </div>
          )}

      </div>
    </nav>
  );
};

export default Navbar;
