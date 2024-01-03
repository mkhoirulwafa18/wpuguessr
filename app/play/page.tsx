"use client";

import { DateSlider } from "@/components/date-slider";
import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import Image from "next/image"
import { redirect, useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator";
import { getPlay, embedBase, validateGuessedDate, formatDateToMonthYear, getDiffDate, convertGuessedNumberToDate, getScoreRound, cn, getLeaderBoard, getPlayDaily } from "@/lib/utils";
import { LeaderBoardItem, Video } from "@/types";
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { addStorage, clearStorage, getStorage, removeStorage } from "@/lib/storage-service";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Play() {
    const [sliderVal, setSliderVal] = React.useState(10)
    const [randomVideos, setRandomVideos] = React.useState<Video[]>([])
    const [leaderBoard, setLeaderBoard] = React.useState<LeaderBoardItem[]>([])
    const [round, setRound] = React.useState(0)
    const [isGuessed, setIsGuessed] = React.useState(false)
    const [scores, setScores] = React.useState<number[]>([])
    const [infosAfterGame, setInfosAfterGame] = React.useState<string[][]>([])
    const isHardMode = getStorage('hard-mode') == '1';
    const isDaily = getStorage('isDaily') == '1'
    const hasToken = getStorage('hasToken') == '1'

    const getVideos = async (isDaily: boolean) => {
        const videos = isDaily ? await getPlayDaily() : await getPlay();
        setRandomVideos(isDaily ? videos.items : videos);
    }

    const getLeaderBoardData = async () => {
        const leaderBoardData = await getLeaderBoard();
        setLeaderBoard(leaderBoardData);
    }

    const setIconLeaderBoard = (number: number): string => {
        switch (number) {
            case 0:
                return "https://cdn.7tv.app/emote/61c4a14e4ba06f2d67d2760f/3x.webp"
            case 1:
                return "https://cdn.7tv.app/emote/60ae839dea50f43c9ea4893d/3x.webp"
            case 2:
                return "https://cdn.7tv.app/emote/60da25b89daf2660d850c4fc/3x.webp"
            default:
                return "https://cdn.7tv.app/emote/610ff51ed86cd785a4739e30/3x.webp"
        }
    }

    const resetState = () => {
        setSliderVal(10)
        setRandomVideos([])
        setRound(0)
        setIsGuessed(false)
        setScores([0])
        setInfosAfterGame([])
    }

    const onPlayAgain = () => {
        resetState()
        const mode = getStorage('hard-mode');
        const lastPlayedDaily = getStorage('lastPlayedDaily');
        clearStorage();
        addStorage('hard-mode', mode);
        addStorage('lastPlayedDaily', lastPlayedDaily);
        router.replace('/')
    }

    React.useEffect(() => {
        if (!hasToken) {
            redirect('/')
        }
        getVideos(isDaily)
        addStorage('round', '0')
    }, [isDaily, hasToken])

    React.useEffect(() => {
        if (round > 4) {
            // getLeaderBoardData();
            addStorage('hasPlayedDaily', isDaily ? '1' : '0')
            const now = Date.now()
            if (isDaily) {
                addStorage('lastPlayedDaily', new Date(now).toLocaleString(
                    "id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }))
            }
            removeStorage('hasToken');
        }
    }, [round, isDaily])

    const onGuess = async () => {
        setIsGuessed(true)
        setScores([...scores, getScoreRound(new Date(randomVideos[round].publishedAt), convertGuessedNumberToDate(sliderVal))])
        setInfosAfterGame([...infosAfterGame, [
            `You are ${getDiffDate(new Date(randomVideos[round].publishedAt), convertGuessedNumberToDate(sliderVal)) === 0
                ? "PERFECT"
                : getDiffDate(new Date(randomVideos[round].publishedAt), convertGuessedNumberToDate(sliderVal)) + " months off"}`,
            `Your guess = ${formatDateToMonthYear(convertGuessedNumberToDate(sliderVal))}`,
            `Actual date = ${formatDateToMonthYear(new Date(randomVideos[round].publishedAt))}`
        ]])
    }

    const router = useRouter();

    return (
        <div className="flex flex-col w-screen h-auto my-4 overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
            <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <Particles
                className="absolute inset-0 -z-0 animate-fade-in"
                quantity={300}
            />
            <div className="max-sm:mx-4 z-10 cursor-default animate-title whitespace-nowrap bg-clip-text">
                <div className={cn("absolute max-md:hidden -ml-4 w-60 h-24 bg-red-500 skew-x-12", round >= 5 && 'hidden')}>
                    <div className="flex justify-end h-full">
                        <div className="-skew-x-12 mr-8 my-auto">
                            <div className="text-slate-200 text-xl">Round</div>
                            <div className="text-white text-4xl">{round + 1}/5</div>
                        </div>
                        <div className="-skew-x-12 mr-4 my-auto">
                            <div className="text-slate-200 text-xl">Score</div>
                            <div className="text-white text-4xl">{scores.reduce((a, v) => a = a + v, 0)}</div>
                        </div>
                    </div>
                </div>
                <Image
                    src='/tarikguessr2.png'
                    alt=''
                    width={300}
                    height={85}
                    priority={true}
                    className="rounded-md w-auto h-auto object-cover mx-auto"
                />
            </div>

            <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            {
                randomVideos.length != 0 ? (
                    <div className="grid h-full justify-center place-items-center z-10 ml-10 mr-10 mt-10 animate-fade-in">
                        {round < 5 ? (
                            <>
                                <div className="max-lg:w-[80vw] max-lg:h-[46vw] lg:w-[60vw] lg:h-[35vw] xl:w-[45vw] xl:h-[27vw] 2xl:w-[45vw] 2xl:h-[25vw]">
                                    <AspectRatio ratio={16 / 9} className="bg-muted">
                                        {!isHardMode ? (
                                            // embed
                                            <iframe className="w-full h-full" src={embedBase(randomVideos[round].videoId)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                                        ) : (
                                            // thumbnail
                                            <Image
                                                src={randomVideos[round].thumbnail}
                                                alt={randomVideos[round].title}
                                                fill
                                                sizes="(max-width: 768px) 80vw"
                                                priority={true}
                                                className=" w-auto h-auto object-cover"
                                            />
                                        )}
                                    </AspectRatio>
                                </div>
                                {/* title video */}
                                <h2 className="mt-6 mb-8 max-md:mb-10 max-md:text-sm text-xl text-white text-center cursor-default text-edge-outline animate-title font-display">
                                    {randomVideos[round].title}
                                </h2>
                                {
                                    !isGuessed ? (
                                        <>
                                            <center className="flex text-white max-md:text-xs text-lg font-display max-sm:w-[30vw] max-sm:h-[12vw] sm:w-[24vw] sm:h-[8vw] lg:w-[14vw] lg:h-[6vw] xl:w-[12vw] xl:h-[4vw] 2xl:w-[12vw] 2xl:h-[4vw] bg-red-500 mb-5 rounded-lg place-self-center">
                                                <div className="text-center m-auto">
                                                    {formatDateToMonthYear(convertGuessedNumberToDate(sliderVal))}
                                                </div>
                                            </center>
                                            <DateSlider className="mb-10" value={[sliderVal]} onValueChange={(val: number[]) => setSliderVal(val[0])} />
                                            <Button
                                                size="lg"
                                                variant="secondary"
                                                className="w-full"
                                                onClick={onGuess}
                                            >
                                                GUESS
                                            </Button></>
                                    ) : <>
                                        <div className="flex max-sm:flex-col h-full justify-around">
                                            <center className="flex max-sm:mr-2 text-white text-lg font-display max-sm:w-[30vw] max-sm:h-[12vw] sm:w-[24vw] sm:h-[8vw] lg:w-[12vw] lg:h-[4vw] xl:w-[12vw] xl:h-[4vw] 2xl:w-[12vw] 2xl:h-[4vw] bg-red-500 mb-5 rounded-lg place-self-center">
                                                <div className="text-center m-auto">
                                                    {getScoreRound(new Date(randomVideos[round].publishedAt), convertGuessedNumberToDate(sliderVal))}/1000
                                                </div>
                                            </center>
                                            <Separator orientation="vertical" className="max-sm:hidden mx-8" />

                                            <center className="flex flex-col max-sm:ml-2 text-white text-lg font-display mb-5 rounded-lg place-self-center">
                                                {
                                                    infosAfterGame.length === 0 ? <></> : <>
                                                        <div className="max-md:text-sm text-center m-auto">
                                                            {infosAfterGame[round][0]}
                                                        </div>
                                                        <div className="max-md:text-sm text-center m-auto text-cyan-400">
                                                            {infosAfterGame[round][1]}
                                                        </div>
                                                        <div className="max-md:text-sm text-center m-auto mb-4 text-emerald-600">
                                                            {infosAfterGame[round][2]}
                                                        </div></>
                                                }
                                                <Button
                                                    size="lg"
                                                    variant="secondary"
                                                    onClick={async () => {
                                                        setIsGuessed(false)
                                                        setSliderVal(10)
                                                        setRound((round) => round < 5 ? round + 1 : 100)
                                                        addStorage('round', (round + 1).toString())
                                                    }}
                                                >
                                                    NEXT
                                                </Button>
                                            </center>
                                        </div>

                                    </>
                                }
                            </>
                        ) : (
                            <div className="flex flex-col max-xl:flex-col gap-8 items-stretch w-full justify-between">
                                <div className="flex flex-col max-xl:flex w-28 self-center gap-4">
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        onClick={() => onPlayAgain()}
                                    >
                                        PLAY AGAIN
                                    </Button>
                                </div>
                                <ScrollArea className="max-xl:w-[70vw] h-[75vh] w-[45vw] rounded-lg border p-4">
                                    <div className="flex rounded-lg bg-red-500 p-4 h-auto self-start">
                                        <div className="my-auto mx-auto text-center">
                                            <div className="text-slate-200 max-md:text-md text-xl mb-4">Total Score :</div>
                                            <div className="text-white max-md:text-xl text-4xl">{scores.reduce((a, v) => a = a + v, 0)}/5000</div>
                                        </div>
                                    </div>
                                    {
                                        infosAfterGame.map((item, index) => {
                                            return (
                                                <>
                                                    <div key={index} className="flex max-md:flex-col max-md:justify-center max-md:items-center justify-between rounded-lg mt-4 bg-black p-4 h-auto gap-4 w-full items-center">
                                                        <div className="max-md:h-[30vw] max-md:w-[51vw] h-[10vw] w-[17vw]">
                                                            <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
                                                                <Image
                                                                    src={randomVideos[index].thumbnail}
                                                                    alt={randomVideos[index].title}
                                                                    fill
                                                                    sizes="(max-width: 768px) 51vw, 17vw"
                                                                    priority={true}
                                                                    className="rounded-md w-auto h-auto object-cover"
                                                                />
                                                            </AspectRatio>
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <div className="text-white max-md:text-md text-lg">{item[0]}</div>
                                                            <div className="max-md:text-xs text-sm text-cyan-400">{item[1]}</div>
                                                            <div className="max-md:text-xs text-sm text-emerald-600">{item[2]}</div>
                                                        </div>
                                                        <div className="text-white text-2xl max-md:ml-0 ml-8">
                                                            {scores[index]}/1000
                                                        </div>
                                                    </div>
                                                    <Separator orientation="horizontal" />
                                                </>
                                            )
                                        })
                                    }

                                </ScrollArea>
                                {/* <ScrollArea className="max-xl:w-[70vw] h-[80vh] w-[30vw] rounded-lg border p-4">
                                    <div className="max-md:text-lg text-3xl text-white">TOP 10 LEADERBOARD{isDaily ? ' (Daily)' : ''}</div>
                                    {
                                        leaderBoard.length !== 0 ? (
                                            leaderBoard.map((item, index) => {
                                                return (
                                                    <div key={index + 123} className={cn("flex justify-around rounded-lg mt-4 p-4 h-full gap-4 items-center", index === 0 && "bg-gradient-to-r from-red-500 to-pink-500", index === 1 && "bg-gradient-to-r from-red-400 to-pink-200", index === 2 && "bg-gradient-to-r from-red-300 to-pink-100", index >= 3 && "bg-black border-2")}>
                                                        <div className={cn("text-white", index === 0 ? "max-md:text-md text-lg" : "max-md:text-sm text-md")}>
                                                            {index + 1}.
                                                        </div>
                                                        <div className="flex max-md:flex-col max-md:h-full max-md:w-full max-md:items-center">
                                                            <div className="flex flex-col gap-1">
                                                                <div className={cn("text-white", index === 0 ? "max-md:text-md text-lg" : "max-md:text-sm text-md")}>{item.name}</div>
                                                                <a href={item.socialMediaLink} target="_blank" className={cn("text-white underline", index === 0 ? "max-md:text-xs text-sm" : "text-xs")}>{item.labelSocialMedia}</a>
                                                            </div>
                                                            <div className={cn("text-white max-md:ml-0 ml-8", index === 0 ? "max-md:text-md text-xl" : "max-md:text-sm text-md")}>
                                                                {item.score}/5000
                                                            </div>
                                                        </div>
                                                        <Image
                                                            src={setIconLeaderBoard(index)}
                                                            alt="tarikOff"
                                                            sizes=""
                                                            width={index === 0 ? 72 : 56}
                                                            height={index === 0 ? 72 : 56}
                                                            className="rounded-md object-cover w-auto h-auto text-center"
                                                        />
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <></>
                                        )
                                    }
                                </ScrollArea> */}
                            </div>
                        )
                        }
                    </div>
                ) : <div>wait</div>
            }
        </div>
    );

}
