import * as React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Info } from "./info-alert"
import { Switch } from "./ui/switch"
import { useRouter } from "next/navigation"

export function InstructionCard() {
  return (
    <Card className="w-[350px] my-1 md:w-[450px] lg:w-[500px]">
      <CardHeader className="grid place-content-center">
        <Image
          src="https://cdn.7tv.app/emote/62469cb44895c254c47d3845/3x.webp"
          alt="tarikOff"
          width={159}
          height={96}
          className="rounded-md object-cover text-center"
        />
      </CardHeader>
      <CardContent>
        <Info title="What is this?" description="Solve the puzzle by guessing the exact month and year of Tarik's video." />
        <Info title="Rounds?" description="Every game has 5 rounds" />
        <Info title="How to guess?" description="Use the slider bar to make your best guess down to the exact month." />
        <Info title="Hard Mode?" description="In Hard Mode, you will only see the thumbnail of the video instead of the full video." />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            // router.push('/play')
          }}
        >
          PLAY
        </Button>
        {/* <div className="flex flex-col text-center animate-fade-in">
          <h2 className="text-sm text-zinc-500 ">
            Hard Mode
          </h2>

          <Switch id="hard-mode" checked={hardmode} onCheckedChange={() => setHardmode(!hardmode)} />
        </div> */}
        <Button
          size="lg"
          onClick={() => console.log('Daily clicked and hard mode is set to ')}
        >
          DAILY
        </Button>
      </CardFooter>
    </Card>
  )
}
