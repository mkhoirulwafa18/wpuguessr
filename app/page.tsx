"use client";

import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation"
import Image from "next/image";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { addStorage, getStorage } from "@/lib/storage-service";
import { cn, getPlayDaily } from "@/lib/utils";
import Footer from "@/components/footer";
import { toast } from "sonner";

export default function Home() {

  const [hardmode, setHardmode] = React.useState(false);
  const [dailySeed, setDailySeed] = React.useState('');
  const router = useRouter();
  const lastPlayedDaily = getStorage('lastPlayedDaily') === dailySeed;
  const getSeed = async () => {
    const videos = await getPlayDaily()
    setDailySeed(videos.seed);
  }

  React.useEffect(() => {
    const isHard = getStorage('hard-mode');
    getSeed()
    setHardmode(isHard == '1' ? true : false)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={300}
      />
      <div className="max-sm:mx-4 z-10 bg-white cursor-default animate-title whitespace-nowrap bg-clip-text">
        <Image
          src='/tarikguessr2.png'
          alt=''
          sizes=""
          width={600}
          height={170}
          className="rounded-md object-cover mx-auto"
        />
      </div>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="animate-fade-in flex">
        <Button
          size="lg"
          variant="link"
          className="text-white hover:text-red-500 font-sans max-sm:text-lg text-2xl"
          onClick={() => {
            addStorage('isDaily', '0')
            addStorage('hasToken', '1')
            router.push('/play')
          }}
        >
          PLAY
        </Button>
        <Separator orientation="vertical" />
        <div className="flex flex-col text-center animate-fade-in items-center mx-8">
          <h2 className="max-sm:text-xs text-sm text-white ">
            Hard Mode
          </h2>
          <Switch
            id="hard-mode"
            checked={hardmode}
            onCheckedChange={() => {
              addStorage('hard-mode', !hardmode ? '1' : '0');
              setHardmode(!hardmode);
            }}

          />
        </div>
        <Separator orientation="vertical" />
        <Button
          size="lg"
          variant="link"
          // disabled={lastPlayedDaily}
          className={cn("font-sans max-sm:text-lg text-2xl", lastPlayedDaily ? 'text-emerald-500 line-through' : "text-red-500 hover:text-white")}
          onClick={() => {

            if (lastPlayedDaily) {
              toast("You have been played daily.")
            } else {
              addStorage('isDaily', '1')
              addStorage('hasToken', '1')
              router.push('/play')
            }
          }}
        >
          DAILY
        </Button>
      </div>
      <Footer />
    </div>
  );

}
