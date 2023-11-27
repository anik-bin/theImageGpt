import Image from 'next/image';
import Link from 'next/link';
import homepageImage from "@/app/assets/homepage-image.jpeg"
import { Button } from '@/components/ui/button';
export default function Home() {

  return (
    <>
    <div>
      <main className='flex flex-col items-center justify-center min-h-screen'>
          <h1 className="font-bold text-5xl text-black pb-14">Generate <span className="text-blue-500">images</span> from text</h1>
          <Image
            src={homepageImage}
            alt="Homepage Picture"
            width={800}
            height={200}
          />
          <Link href="/generate">
            <Button className="text-xl mt-14 p-6 hover:bg-blue-500">Get Started</Button>
          </Link>
      </main>      
    </div>
      
    </>
  )
}
