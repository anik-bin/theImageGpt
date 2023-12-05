import Image from 'next/image';
import Link from 'next/link';
import homepageImage from "@/app/assets/homepage-image.png"
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function Home() {

  const {userId} = auth();

  if (userId) {
    redirect("/generate")
  }
  return (
    <>
    <div>
      <main className='flex flex-col items-center justify-center h-full pt-10'>
          <h1 className="font-bold text-5xl text-black dark:text-white pb-14">Generate <span className="text-blue-500">images</span> from text</h1>
          <Image
            src={homepageImage}
            alt="Homepage Picture"
            width={800}
            height={200}
            className='mb-16 rounded-lg hover:shadow-md'
          />
          <p className='mx-auto max-w-[620px] font-display text-lg mb-2'>Sign in below using Google to create a free account to generate images. You will get <b>3 generations</b> free</p>
          <Link href="/generate">
            <Button className="text-xl mt-6 p-6 hover:bg-blue-500">Get Started</Button>
          </Link>
      </main>      
    </div>
      
    </>
  )
}
