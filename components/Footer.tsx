import { Github, Twitter } from "lucide-react"

export const Footer = ()=>{
    return (
        <>
            <footer className="p-2">
                <div className="container mx-auto max-w-screen-xl md:flex md:items-center md:justify-between sm:mb-0">
                    <span className="text-md text-gray-500 sm:text-center dark:text-gray-400">Created by <a href="https://x.com/aniketbindhani" className="hover:underline">Aniket Bindhani</a>
                    </span>
                    <div className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 gap-2">
                        <a href="https://github.com/anik-bin"><Github /></a>
                        <a href="https://x.com/aniketbindhani"><svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" className="dark:fill-white"/></svg></a>
                    </div>
                </div>
            </footer>
        </>
    )
}