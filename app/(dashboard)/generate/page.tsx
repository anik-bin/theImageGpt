"use client";
import Image from 'next/image'
import { useState } from 'react';
import axios from 'axios';
import { getRandomPrompt } from '@/lib/prompt';
import { useSession } from 'next-auth/react'
import { InfinitySpin } from 'react-loader-spinner';
import noImage from "@/app/assets/no-image.png"
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

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

  const generateRandomPrompt = () => {
    const randomPrompt = getRandomPrompt(inputPrompt.prompt);
    setInputPrompt({ ...inputPrompt, prompt: randomPrompt });
  };

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

            <label htmlFor="randomPrompt">Generate a <span className='bg-gray-200 text-black p-2 text-sm rounded-lg cursor-pointer hover:bg-gray-300' onClick={generateRandomPrompt}>Random Prompt</span></label>
            <form onSubmit={handleSubmit} className='flex gap-4'>
              <div className='w-52 lg:w-96 md:w-64'>
                <input
                  className='p-4 border-none rounded-lg mb-4 text-black shadow-lg box-border w-full'
                  type="text"
                  value={inputPrompt.prompt}
                  placeholder='or type something here....'
                  onChange={(e) => {
                    setInputPrompt({ ...inputPrompt, prompt: e.target.value })
                  }}
                />
              </div>


              <button type="submit" className='p-2 border bg-gray-300 border-gray-300 rounded-lg mb-4'>Generate</button>
            </form>

            {loading &&
              (
                <div className='flex items-center justify-center'>
                  <InfinitySpin
                    width='300'
                    color="#0085FF"
                  />
                </div>
              )}

            {photo.length === 0 && !loading && (
              <Image
                src={noImage}
                alt="no image"
                width={256}
                height={256}
              />
            )}
            {/* <h1>{loading ? "Image is generating" : "Image is generated"}</h1> */}
            <div className='flex flex-row gap-6'>
              {photo.map((src) => (
                <Card key={src} className='rounded-lg overflow-hidden'>
                  <CardHeader>
                    <CardTitle className='text-xs text-black'>Here is your photo</CardTitle>
                  </CardHeader>
                  <div className="relative aspect-square">
                    <Image
                      fill
                      alt="Photo"
                      src={src}
                    />
                  </div>
                  <CardFooter className="p-2">
                    <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardFooter>
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