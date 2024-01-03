import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { Analytics } from '@/components/ui/analytics'
import { Toaster } from '@/components/ui/sonner'

const inter = Poppins({ weight: ['200', '500', '800'], subsets: ['latin'], variable: "--font-inter" })

export const metadata: Metadata = {
  title: 'TarikGuessr',
  description: "Go guess the timeline of those Tarik's yt videos & thumbnails created by Wafastarz",
  openGraph: {
    title: "TarikGuessr",
    description:
      "Go guess the timeline of those Tarik's yt videos & thumbnails created by Wafastarz",
    url: "https://tarikguessr.vercel.app",
    siteName: "TarikGuessr",
    locale: "en-US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={[inter.variable].join(" ")}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <Analytics />
      </head>
      <body className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined}`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
