"use client";
import Image from 'next/image'
import { useState } from 'react';
import axios from 'axios';
import { getRandomPrompt } from '@/lib/prompt';
import { InfinitySpin } from 'react-loader-spinner';
import noImage from "@/app/assets/no-image.png"
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { amountOptions, resolutionOptions } from '@/app/constants/constants';

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { useProText } from '@/hooks/pro-text';
import { Footer } from '@/components/Footer';

export default function Generate() {

  const proText = useProText();

  const router = useRouter();

  const [inputPrompt, setInputPrompt] = useState({
    prompt: "",
    amount: amountOptions[0].value, // Default value for the number of images
    resolution: resolutionOptions[0].value,
  });

  const [loading, setLoading] = useState(false);

  const [photo, setPhoto] = useState<string[]>([]);

  const generateRandomPrompt = () => {
    const randomPrompt = getRandomPrompt(inputPrompt.prompt);
    setInputPrompt({ ...inputPrompt, prompt: randomPrompt });
  };

  const options = {
    headers: { "content-type": "application/json" }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (inputPrompt.prompt) {
      try {
        setLoading(true);
        setPhoto([]);
        const response = await axios.post("/api/users/generate", inputPrompt, options);

        const urls = response.data.map((image: { url: string }) => image.url);
        setPhoto(urls);
      } catch (error: any) {
          if (error?.response?.status === 403) {
            proText.onOpen();
          }
      } finally {
        setLoading(false);
        router.refresh();
      }
    } else {
      alert("Please enter a prompt");
    }
  }

    return (
      <>
        <main className='flex flex-col gap-8 justify-center items-center pt-10 mb-10  '>

            <label htmlFor="randomPrompt">Generate a <button className='bg-gray-200 dark:bg-white text-black p-2 text-sm rounded-lg cursor-pointer hover:bg-gray-300 disabled:cursor-not-allowed' onClick={generateRandomPrompt} disabled={loading}>Random Prompt</button></label>
            <form onSubmit={handleSubmit}>
              <div className='w-screen flex items-center justify-center gap-4'>
                <input
                className='p-4 border-none rounded-lg mb-4 text-black dark:bg-[#F4F4F4] shadow-lg box-border w-1/2 outline-none'
                  type="text"
                  value={inputPrompt.prompt}
                  placeholder='or type something here....'
                  onChange={(e) => {
                    setInputPrompt({ ...inputPrompt, prompt: e.target.value })
                  }}
                  disabled={loading}
                />

                <button type="submit" disabled={loading} className='p-2 border bg-gray-300 border-gray-300 rounded-lg mb-4 dark:bg-white dark:text-black'>Generate</button>
              </div>

              <div className='flex flex-row items-center justify-center gap-6'>

                <select
                  disabled={loading}
                  defaultValue={inputPrompt.amount}
                  value={inputPrompt.amount}
                  onChange={(e) => setInputPrompt({ ...inputPrompt, amount: e.target.value })}
                  className='p-2 px-2 rounded-md border border-slate-800 dark:bg-white dark:text-black'
                >
                  {amountOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <select
                  disabled={loading}
                  defaultValue={inputPrompt.resolution}
                  value={inputPrompt.resolution}
                  onChange={(e) => setInputPrompt({ ...inputPrompt, resolution: e.target.value })}
                className='p-2 px-2 rounded-md border border-slate-800 dark:bg-white dark:text-black'
                >
                  {resolutionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

            </form>

            {loading &&
              (
                <div className='flex items-center justify-center'>
                  <InfinitySpin
                    width='140'
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
            
            <div className='flex flex-row gap-6'>
              {photo.map((src) => (
                <Card key={src} className='rounded-lg overflow-hidden'>
                  <CardHeader>
                    <CardTitle className='text-xs text-black'>Here is your photo</CardTitle>
                  </CardHeader>
                  <div className="relative aspect-square w-64 h-64">
                    <Image
                      fill
                      alt="Photo"
                      src={src}
                    />
                  </div>
                  <CardFooter className="p-2">
                    <Button onClick={() => window.open(src)} variant="secondary" className="w-full dark:bg-white dark:text-black">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </main>
        <Footer />
      </>
    )
}