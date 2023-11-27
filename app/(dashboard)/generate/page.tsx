"use client";
import Image from 'next/image'
import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react'

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Navbar from '@/components/Navbar';
import GoogleButton from '@/components/GoogleButton'

export default function Generate() {

  const { status } = useSession();

  const [inputPrompt, setInputPrompt] = useState({
    prompt: ""
  });

  const [loading, setLoading] = useState(false);

  const [photo, setPhoto] = useState<string[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      setPhoto([]);
      const response = await axios.post("/api/users/generate", inputPrompt);

      const urls = response.data.map((image: { url: string }) => image.url);
      setPhoto(urls);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (status === "authenticated") {
    return (
      <>
        <Navbar />
        <div className='bg-white'>
          <main className='flex flex-col gap-8 justify-center items-center pt-10'>
            <h1 className='text-4xl text-black font-bold'>Generate Image</h1>

            <form onSubmit={handleSubmit} className='flex gap-4'>
              <input
                className='p-4 border-none rounded-lg mb-4 text-black shadow-lg'
                type="text"
                value={inputPrompt.prompt}
                placeholder='type something here'
                onChange={(e) => {
                  setInputPrompt({ ...inputPrompt, prompt: e.target.value })
                }}
              />

              <button type="submit" className='p-2 border bg-gray-300 border-gray-300 rounded-lg mb-4'>Generate</button>
            </form>

            <h1>{loading ? "Image is generating" : "Image is generated"}</h1>
            <div>
              {photo.map((src) => (
                <Card key={src}>
                  <CardHeader>
                    <CardTitle>{inputPrompt.prompt}</CardTitle>
                  </CardHeader>
                  <Image
                    alt="photo"
                    src={src}
                    width={512}
                    height={512}
                  />
                </Card>
              ))}
            </div>
          </main>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Navbar />
        <main className='flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-40 sm:mb-0 mb-8'>
          <h1 className='mx-auto max-w-[620px] font-display text-3xl font-bold sm:text-6xl mb-8'>Generate your favourite <span className='text-blue-700'>images</span> in seconds</h1>

          <p className='mx-auto max-w-[620px] font-display text-lg mb-8'>Sign in below using Google to create a free account to generate images. You will get <b>3 generations</b> free</p>

          <GoogleButton />
        </main>
      </>

    )
  }


}