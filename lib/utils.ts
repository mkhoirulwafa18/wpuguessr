import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect, useState } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

export function getMaxSlider(): number {
  const now = new Date
  const tarikFirstYtDate = new Date(2014, 9)
  return (now.getFullYear() - tarikFirstYtDate.getFullYear()) * 12 + now.getMonth() - tarikFirstYtDate.getMonth();
}

export function formatDateToMonthYear(val: Date) {
  return val.toLocaleDateString("default", {
    month: "long",
    year: "numeric"
  })
}

//TODO(mkhoirulwafa18): change these to have another channel yt
export function convertGuessedNumberToDate(val: number) {
  const tarikFirstYtDate = new Date(2014, 9)
  return new Date(tarikFirstYtDate.getFullYear() + Math.floor(val / 12), tarikFirstYtDate.getMonth() + val % 12)
}

export function validateGuessedDate(date: string, guessedDate: string) {
  const correctDate = new Date(date).toLocaleString(
    "id-ID", {
    month: "long",
    year: "numeric"
  })

  return correctDate == guessedDate;
}

export function getDiffDate(date: Date, date2: Date) {
  let S;
  S = (date2.getFullYear() - date.getFullYear()) * 12
  S -= date.getMonth()
  S += date2.getMonth()
  return Math.abs(S);
}

export function getScoreRound(date: Date, date2: Date) {
  const actual = date.getFullYear() * 12 + date.getMonth()
  const guessed = date2.getFullYear() * 12 + date2.getMonth()
  const diff = Math.abs(actual - guessed);
  let score = 0;
  diff <= 25 && (score = (25 - diff) / 25 * 1e3);

  return score;
}

export const getPlay = async () => {
  const res = await fetch('/api/play');
  return res.json();
}

export const getPlayDaily = async () => {
  const res = await fetch('/api/play/daily');
  return res.json();
}

export const getLeaderBoard = async () => {
  const res = await fetch('/api/leaderboard');
  return res.json();
}

export const getYT = async () => {
  const API_KEY = process.env.YT_API_KEY;
  const youtubePlaylistId = process.env.YT_PLAYLIST_ID;
  const res = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${youtubePlaylistId}&key=${API_KEY}`);
  return res.json();
}

export const embedBase = (videoId: string) => {
  return `https://www.youtube.com/embed/${videoId}`;
}